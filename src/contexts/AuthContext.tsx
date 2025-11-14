import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, LoginRequest, RegisterRequest, UserRole } from "@/types";
import { authService } from "@/services/api/auth.service";

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
  loginWithGoogle: (
    idToken: string,
    preferredLanguage?: string
  ) => Promise<void>;
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

      loginWithGoogle: async (
        idToken: string,
        preferredLanguage: string = "vi"
      ) => {
        try {
          set({ isLoading: true, error: null });

          console.log("� Sending ID token to backend...");

          // Send ID token to backend to get JWT
          const response = await authService.loginWithGoogle(
            idToken,
            preferredLanguage
          );
          console.log("✅ Backend response:", response);

          // Check if email needs confirmation
          if (response.isEmailConfirmed === false) {
            console.log("📧 Email not confirmed, need to check email");
            set({ isLoading: false, error: null });

            // Return special response to indicate email confirmation needed
            throw {
              needsEmailConfirmation: true,
              email: response.user?.email || "",
              message: "Vui lòng kiểm tra email để xác nhận tài khoản",
            };
          }

          // Check if user has custom avatar in localStorage
          const customAvatarKey = `avatar_${response.user.id}`;
          const customAvatar = localStorage.getItem(customAvatarKey);

          // Update user with custom avatar if exists
          const userWithAvatar = {
            ...response.user,
            avatarUrl: customAvatar || response.user.avatarUrl || undefined,
          };

          console.log("👤 User authenticated:", userWithAvatar);

          // Store backend JWT tokens and user data
          set({
            user: userWithAvatar,
            token: response.token,
            refreshToken: response.refreshToken,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          // Check if this is email confirmation needed error
          if (error.needsEmailConfirmation) {
            throw error; // Re-throw to be handled by Login component
          }

          console.error("❌ Backend login error:", error);
          console.error("❌ Response data:", error.response?.data);
          console.error("❌ Response status:", error.response?.status);

          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Đăng nhập Google thất bại";

          set({
            error: errorMessage,
            isLoading: false,
          });
          throw new Error(errorMessage);
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
          const { token, refreshToken } = get();

          // Revoke refresh token on backend if available
          if (token && refreshToken) {
            try {
              await authService.revokeToken(refreshToken, token);
            } catch (error) {
              console.error("Failed to revoke token:", error);
            }
          }
        } catch (error) {
          console.error("Logout error:", error);
        } finally {
          // Clear local state
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
