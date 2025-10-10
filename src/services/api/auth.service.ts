import axios from "axios";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
  ApiResponse,
} from "@/types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const authService = {
  /**
   * Login with Google OAuth
   */
  async loginWithGoogle(idToken: string): Promise<LoginResponse> {
    const response = await axios.post<ApiResponse<LoginResponse>>(
      `${API_BASE_URL}/auth/google`,
      { idToken }
    );
    return response.data.data;
  },

  /**
   * Login user (email/password - optional, nếu cần)
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await axios.post<ApiResponse<LoginResponse>>(
      `${API_BASE_URL}/auth/login`,
      credentials
    );
    return response.data.data;
  },

  /**
   * Register new user
   */
  async register(data: RegisterRequest): Promise<LoginResponse> {
    const response = await axios.post<ApiResponse<LoginResponse>>(
      `${API_BASE_URL}/auth/register`,
      data
    );
    return response.data.data;
  },

  /**
   * Get current user profile
   */
  async getCurrentUser(token: string): Promise<User> {
    const response = await axios.get<ApiResponse<User>>(
      `${API_BASE_URL}/auth/me`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Refresh access token
   */
  async refreshToken(
    refreshToken: string
  ): Promise<{ token: string; refreshToken: string }> {
    const response = await axios.post<
      ApiResponse<{ token: string; refreshToken: string }>
    >(`${API_BASE_URL}/auth/refresh`, { refreshToken });
    return response.data.data;
  },

  /**
   * Logout user
   */
  async logout(token: string): Promise<void> {
    await axios.post(
      `${API_BASE_URL}/auth/logout`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },

  /**
   * Request password reset
   */
  async requestPasswordReset(email: string): Promise<void> {
    await axios.post(`${API_BASE_URL}/auth/forgot-password`, { email });
  },

  /**
   * Reset password with token
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    await axios.post(`${API_BASE_URL}/auth/reset-password`, {
      token,
      newPassword,
    });
  },
};
