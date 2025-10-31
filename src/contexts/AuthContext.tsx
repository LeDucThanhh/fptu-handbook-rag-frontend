import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, LoginRequest, RegisterRequest } from "@/types";
import type { UserRole as UserRoleType } from "@/types";
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
  loginWithGoogle: (idToken: string) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
  setUser: (user: User) => void;
  hasRole: (role: UserRoleType) => boolean;
  hasAnyRole: (roles: UserRoleType[]) => boolean;
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

      loginWithGoogle: async (idToken: string) => {
        try {
          set({ isLoading: true, error: null });
          const response = await authService.loginWithGoogle(idToken);

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
            error: error.response?.data?.message || "Đăng nhập Google thất bại",
            isLoading: false,
          });
          throw error;
        }
      },

      register: async (data: RegisterRequest) => {
        try {
          set({ isLoading: true, error: null });
          const response = await authService.register(data);

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
            error: error.response?.data?.message || "Đăng ký thất bại",
            isLoading: false,
          });
          throw error;
        }
      },

      logout: async () => {
        try {
          const { token } = get();
          if (token) {
            await authService.logout(token);
          }
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
            token: response.token,
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

      hasRole: (role: UserRoleType) => {
        const { user } = get();
        return user?.roles.includes(role) || false;
      },

      hasAnyRole: (roles: UserRoleType[]) => {
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
