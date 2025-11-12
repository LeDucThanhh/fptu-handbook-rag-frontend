import axios from "axios";
import type { ApiResponse } from "@/types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://fptu-handbook-esgma9b2hzckcnce.southeastasia-01.azurewebsites.net";

export interface RegisterStaffRequest {
  email: string;
  fullName: string;
  departmentId: string;
  role: string;
  preferredLanguage?: string;
}

export interface RegisterMentorRequest {
  email: string;
  fullName: string;
  departmentId: string;
  preferredLanguage?: string;
}

export interface RegisterClubCoordinatorRequest {
  email: string;
  fullName: string;
  clubId: string;
  preferredLanguage?: string;
}

export const adminService = {
  /**
   * Register staff (Admin only)
   */
  async registerStaff(
    data: RegisterStaffRequest,
    token: string
  ): Promise<boolean> {
    const response = await axios.post<ApiResponse<boolean>>(
      `${API_BASE_URL}/api/Auth/register-staff`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Register mentor (Academic Office)
   */
  async registerMentor(
    data: RegisterMentorRequest,
    token: string
  ): Promise<boolean> {
    const response = await axios.post<ApiResponse<boolean>>(
      `${API_BASE_URL}/api/Auth/register-mentor`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Register club coordinator (Admin/Student Affairs)
   */
  async registerClubCoordinator(
    data: RegisterClubCoordinatorRequest,
    token: string
  ): Promise<boolean> {
    const response = await axios.post<ApiResponse<boolean>>(
      `${API_BASE_URL}/api/Auth/register-club-coordinator`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Activate user (Admin only)
   */
  async activateUser(userId: string, token: string): Promise<boolean> {
    const response = await axios.put<ApiResponse<boolean>>(
      `${API_BASE_URL}/api/Auth/activate-user/${userId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Deactivate user (Admin only)
   */
  async deactivateUser(userId: string, token: string): Promise<boolean> {
    const response = await axios.put<ApiResponse<boolean>>(
      `${API_BASE_URL}/api/Auth/deactivate-user/${userId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },
};

