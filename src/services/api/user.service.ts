import axios from "axios";
import type { UserProfile, ApiResponse, PaginatedResponse } from "@/types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://fptu-handbook-esgma9b2hzckcnce.southeastasia-01.azurewebsites.net";

export const userService = {
  /**
   * Get current user profile
   */
  async getMyProfile(token: string): Promise<UserProfile> {
    const response = await axios.get<ApiResponse<UserProfile>>(
      `${API_BASE_URL}/api/UserProfile/me`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Update current user profile
   */
  async updateMyProfile(
    data: Partial<UserProfile>,
    token: string
  ): Promise<UserProfile> {
    const response = await axios.put<ApiResponse<UserProfile>>(
      `${API_BASE_URL}/api/UserProfile/me`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Get all users with pagination (Admin/Staff)
   */
  async getAllUsers(
    page: number = 1,
    pageSize: number = 20,
    searchTerm?: string,
    role?: string,
    departmentId?: string,
    isActive?: boolean,
    sortBy: string = "fullname",
    sortDescending: boolean = false,
    token?: string
  ): Promise<PaginatedResponse<UserProfile>> {
    const response = await axios.get<
      ApiResponse<PaginatedResponse<UserProfile>>
    >(`${API_BASE_URL}/api/UserProfile/paginated`, {
      params: {
        page,
        pageSize,
        searchTerm,
        role,
        departmentId,
        isActive,
        sortBy,
        sortDescending,
      },
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data.data;
  },

  /**
   * Get user by email (Admin/Staff)
   */
  async getUserByEmail(email: string, token: string): Promise<UserProfile> {
    const response = await axios.get<ApiResponse<UserProfile>>(
      `${API_BASE_URL}/api/UserProfile/by-email`,
      {
        params: { email },
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Update user profile (Admin)
   */
  async updateUserProfile(
    id: string,
    data: Partial<UserProfile>,
    token: string
  ): Promise<UserProfile> {
    const response = await axios.put<ApiResponse<UserProfile>>(
      `${API_BASE_URL}/api/UserProfile/${id}`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },
};

