import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, LoginRequest, RegisterRequest, UserRole } from "@/types";
import { authService } from "@/services/api/auth.service";
import { auth, googleProvider } from "@/config/firebase.config";
import { signInWithPopup, signOut } from "firebase/auth";

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  login: (credentials: LoginRequest) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
  setUser: (user: User) => void;
  hasRole: (role: UserRole) => boolean;
  hasAnyRole: (roles: UserRole[]) => boolean;
  clearError: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (credentials: LoginRequest) => {
        try {
          set({ isLoading: true, error: null });
          const response = await authService.login(credentials);

          set({
            user: response.user,
            token: response.token,
            refreshToken: response.refreshToken,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          set({
            error: error.response?.data?.message || "Đăng nhập thất bại",
            isLoading: false,
          });
          throw error;
        }
      },

      loginWithGoogle: async () => {
        try {
          set({ isLoading: true, error: null });

          // Step 1: Sign in with Google via Firebase
          const result = await signInWithPopup(auth, googleProvider);
          const firebaseUser = result.user;

          console.log("🔥 Firebase User:", firebaseUser);

          // Step 2: Get Firebase ID token
          const idToken = await firebaseUser.getIdToken();
          console.log("🔑 Firebase ID Token obtained");

          // Step 3: Try to send ID token to backend to get JWT
          console.log("📡 Sending ID token to backend...");

          try {
            const response = await authService.loginWithGoogle(idToken, "vi");
            console.log("✅ Backend response:", response);

            // Step 4: Check if user has custom avatar in localStorage
            const customAvatarKey = `avatar_${response.user.id}`;
            const customAvatar = localStorage.getItem(customAvatarKey);

            // Step 5: Update user with custom avatar if exists
            const userWithAvatar = {
              ...response.user,
              avatarUrl:
                customAvatar ||
                response.user.avatarUrl ||
                firebaseUser.photoURL ||
                undefined,
            };

            console.log("👤 User authenticated:", userWithAvatar);

            // Step 6: Store backend JWT tokens and user data
            set({
              user: userWithAvatar,
              token: response.token,
              refreshToken: response.refreshToken,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } catch (backendError: any) {
            // FALLBACK STRATEGY: If backend fails (401, 500, etc.), create local user
            console.warn(
              "⚠️ Backend authentication failed, using fallback mode"
            );
            console.warn("Backend error:", backendError.response?.data);

            // Create local user from Firebase data
            const localUser: User = {
              id: firebaseUser.uid,
              email: firebaseUser.email || "",
              fullName: firebaseUser.displayName || "User",
              avatarUrl: firebaseUser.photoURL || undefined,
              roles: ["Student"], // Default role for fallback
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };

            console.log("👤 Using local user (Demo Mode):", localUser);

            // Store user without backend JWT tokens
            set({
              user: localUser,
              token: null, // No backend token
              refreshToken: null,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });

            // Show warning notification
            if (typeof window !== "undefined") {
              // Use setTimeout to ensure notification shows after navigation
              setTimeout(() => {
                const event = new CustomEvent("show-demo-warning");
                window.dispatchEvent(event);
              }, 500);
            }
          }
        } catch (error: any) {
          console.error("❌ Firebase login error:", error);

          const errorMessage = error.message || "Đăng nhập Google thất bại";

          set({
            error: errorMessage,
            isLoading: false,
          });
          throw error;
        }
      },

      register: async (_data: RegisterRequest) => {
        try {
          set({ isLoading: true, error: null });
          // TODO: Backend doesn't have register endpoint yet
          // For now, just show error
          throw new Error("Chức năng đăng ký chưa được hỗ trợ");
        } catch (error: any) {
          set({
            error: error.message || "Đăng ký thất bại",
            isLoading: false,
          });
          throw error;
        }
      },

      logout: async () => {
        try {
          // Sign out from Firebase
          await signOut(auth);
        } catch (error) {
          console.error("Logout error:", error);
        } finally {
          set({
            user: null,
            token: null,
            refreshToken: null,
            isAuthenticated: false,
            error: null,
          });
        }
      },

      refreshAuth: async () => {
        try {
          const { refreshToken } = get();
          if (!refreshToken) {
            throw new Error("No refresh token available");
          }

          const response = await authService.refreshToken(refreshToken);
          set({
            token: response.accessToken,
            refreshToken: response.refreshToken,
          });
        } catch (error) {
          // If refresh fails, logout
          get().logout();
          throw error;
        }
      },

      setUser: (user: User) => {
        set({ user });
      },

      hasRole: (role: UserRole) => {
        const { user } = get();
        return user?.roles.includes(role) || false;
      },

      hasAnyRole: (roles: UserRole[]) => {
        const { user } = get();
        if (!user) return false;
        return roles.some((role) => user.roles.includes(role));
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
