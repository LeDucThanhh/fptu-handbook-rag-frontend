import axios from "axios";
import type {
  Club,
  ClubType,
  ClubActivity,
  ApiResponse,
  PaginatedResponse,
} from "@/types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const clubService = {
  /**
   * Get all clubs
   */
  async getClubs(
    page: number = 1,
    pageSize: number = 20,
    typeId?: string,
    isRecruiting?: boolean,
    token?: string
  ): Promise<PaginatedResponse<Club>> {
    const response = await axios.get<ApiResponse<PaginatedResponse<Club>>>(
      `${API_BASE_URL}/clubs`,
      {
        params: { page, pageSize, typeId, isRecruiting },
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );
    return response.data.data;
  },

  /**
   * Get club by ID
   */
  async getClubById(clubId: string, token?: string): Promise<Club> {
    const response = await axios.get<ApiResponse<Club>>(
      `${API_BASE_URL}/clubs/${clubId}`,
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );
    return response.data.data;
  },

  /**
   * Get club types
   */
  async getClubTypes(token?: string): Promise<ClubType[]> {
    const response = await axios.get<ApiResponse<ClubType[]>>(
      `${API_BASE_URL}/clubs/types`,
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );
    return response.data.data;
  },

  /**
   * Get activities by club
   */
  async getActivitiesByClub(
    clubId: string,
    page: number = 1,
    pageSize: number = 20,
    token?: string
  ): Promise<PaginatedResponse<ClubActivity>> {
    const response = await axios.get<
      ApiResponse<PaginatedResponse<ClubActivity>>
    >(`${API_BASE_URL}/clubs/${clubId}/activities`, {
      params: { page, pageSize },
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data.data;
  },

  /**
   * Get all activities (public only for non-authenticated)
   */
  async getActivities(
    page: number = 1,
    pageSize: number = 20,
    clubId?: string,
    status?: string,
    token?: string
  ): Promise<PaginatedResponse<ClubActivity>> {
    const response = await axios.get<
      ApiResponse<PaginatedResponse<ClubActivity>>
    >(`${API_BASE_URL}/activities`, {
      params: { page, pageSize, clubId, status },
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data.data;
  },

  /**
   * Create club (Club Coordinator only)
   */
  async createClub(data: Partial<Club>, token: string): Promise<Club> {
    const response = await axios.post<ApiResponse<Club>>(
      `${API_BASE_URL}/clubs`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Update club (Club Coordinator only)
   */
  async updateClub(
    clubId: string,
    data: Partial<Club>,
    token: string
  ): Promise<Club> {
    const response = await axios.put<ApiResponse<Club>>(
      `${API_BASE_URL}/clubs/${clubId}`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Create activity (Club Coordinator only)
   */
  async createActivity(
    data: Partial<ClubActivity>,
    token: string
  ): Promise<ClubActivity> {
    const response = await axios.post<ApiResponse<ClubActivity>>(
      `${API_BASE_URL}/activities`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Update activity (Club Coordinator only)
   */
  async updateActivity(
    activityId: string,
    data: Partial<ClubActivity>,
    token: string
  ): Promise<ClubActivity> {
    const response = await axios.put<ApiResponse<ClubActivity>>(
      `${API_BASE_URL}/activities/${activityId}`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Delete activity (Club Coordinator only)
   */
  async deleteActivity(activityId: string, token: string): Promise<void> {
    await axios.delete(`${API_BASE_URL}/activities/${activityId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};


