import axios from "axios";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
  ApiResponse,
} from "@/types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://fptu-handbook-esgma9b2hzckcnce.southeastasia-01.azurewebsites.net";

export const authService = {
  /**
   * Login with email and password
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await axios.post<ApiResponse<LoginResponse>>(
      `${API_BASE_URL}/Auth/login`,
      credentials
    );
    return response.data.data;
  },

  /**
   * Login with Google OAuth
   */
  async loginWithGoogle(
    idToken: string,
    preferredLanguage: string = "vi"
  ): Promise<LoginResponse> {
    const response = await axios.post<ApiResponse<LoginResponse>>(
      `${API_BASE_URL}/Auth/google-login`,
      { idToken, preferredLanguage }
    );
    return response.data.data;
  },

  /**
   * Get current user info
   */
  async getCurrentUser(token: string): Promise<User> {
    const response = await axios.get<ApiResponse<User>>(
      `${API_BASE_URL}/Auth/me`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Validate token
   */
  async validateToken(token: string): Promise<boolean> {
    try {
      const response = await axios.get<ApiResponse<boolean>>(
        `${API_BASE_URL}/Auth/validate`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.data;
    } catch {
      return false;
    }
  },

  /**
   * Refresh access token
   */
  async refreshToken(
    refreshToken: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const response = await axios.post<
      ApiResponse<{ accessToken: string; refreshToken: string }>
    >(`${API_BASE_URL}/Auth/refresh-token`, { refreshToken });
    return response.data.data;
  },

  /**
   * Revoke refresh token (logout)
   */
  async revokeToken(refreshToken: string, token: string): Promise<void> {
    await axios.post(
      `${API_BASE_URL}/Auth/revoke-token`,
      { refreshToken },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },

  /**
   * Confirm email
   */
  async confirmEmail(userId: string, token: string): Promise<boolean> {
    const response = await axios.get<ApiResponse<boolean>>(
      `${API_BASE_URL}/Auth/confirm-email`,
      {
        params: { userId, token },
      }
    );
    return response.data.data;
  },

  /**
   * Start Google OAuth flow (for web redirect flow)
   */
  getGoogleLoginUrl(language: string = "vi"): string {
    return `${API_BASE_URL}/Auth/google-login-start?language=${language}`;
  },
};
