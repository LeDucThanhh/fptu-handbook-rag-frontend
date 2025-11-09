import axios from "axios";
import type {
  Club,
  ClubType,
  ClubActivity,
  ApiResponse,
  PaginatedResponse,
} from "@/types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://fptu-handbook-esgma9b2hzckcnce.southeastasia-01.azurewebsites.net";

export const clubService = {
  /**
   * Get all clubs with pagination
   */
  async getClubs(
    page: number = 1,
    pageSize: number = 20,
    searchTerm?: string,
    typeId?: string,
    isActive?: boolean,
    sortBy: string = "name",
    sortDescending: boolean = false,
    token?: string
  ): Promise<PaginatedResponse<Club>> {
    const response = await axios.get<ApiResponse<PaginatedResponse<Club>>>(
      `${API_BASE_URL}/api/Club/paginated`,
      {
        params: {
          page,
          pageSize,
          searchTerm,
          typeId,
          isActive,
          sortBy,
          sortDescending,
        },
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );
    return response.data.data;
  },

  /**
   * Get all clubs (no pagination)
   */
  async getAllClubs(token?: string): Promise<Club[]> {
    const response = await axios.get<ApiResponse<Club[]>>(
      `${API_BASE_URL}/api/Club`,
      {
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
      `${API_BASE_URL}/api/Club/${clubId}`,
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );
    return response.data.data;
  },

  /**
   * Get clubs by type
   */
  async getClubsByType(typeId: string, token?: string): Promise<Club[]> {
    const response = await axios.get<ApiResponse<Club[]>>(
      `${API_BASE_URL}/api/Club/type/${typeId}`,
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
      `${API_BASE_URL}/api/ClubType`,
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );
    return response.data.data;
  },

  /**
   * Get club types with pagination
   */
  async getClubTypesPaginated(
    page: number = 1,
    pageSize: number = 20,
    searchTerm?: string,
    isActive?: boolean,
    sortBy: string = "name",
    sortDescending: boolean = false,
    token?: string
  ): Promise<PaginatedResponse<ClubType>> {
    const response = await axios.get<ApiResponse<PaginatedResponse<ClubType>>>(
      `${API_BASE_URL}/api/ClubType/paginated`,
      {
        params: {
          page,
          pageSize,
          searchTerm,
          isActive,
          sortBy,
          sortDescending,
        },
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );
    return response.data.data;
  },

  /**
   * Get active club types
   */
  async getActiveClubTypes(token?: string): Promise<ClubType[]> {
    const response = await axios.get<ApiResponse<ClubType[]>>(
      `${API_BASE_URL}/api/ClubType/active`,
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
    token?: string
  ): Promise<ClubActivity[]> {
    const response = await axios.get<ApiResponse<ClubActivity[]>>(
      `${API_BASE_URL}/api/ClubActivity/club/${clubId}`,
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );
    return response.data.data;
  },

  /**
   * Get all activities with pagination
   */
  async getActivities(
    page: number = 1,
    pageSize: number = 20,
    searchTerm?: string,
    clubId?: string,
    isPublic?: boolean,
    status?: string,
    startDate?: Date,
    endDate?: Date,
    sortBy: string = "startdate",
    sortDescending: boolean = true,
    token?: string
  ): Promise<PaginatedResponse<ClubActivity>> {
    const response = await axios.get<
      ApiResponse<PaginatedResponse<ClubActivity>>
    >(`${API_BASE_URL}/api/ClubActivity/paginated`, {
      params: {
        page,
        pageSize,
        searchTerm,
        clubId,
        isPublic,
        status,
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
        sortBy,
        sortDescending,
      },
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data.data;
  },

  /**
   * Get all activities (no pagination)
   */
  async getAllActivities(token?: string): Promise<ClubActivity[]> {
    const response = await axios.get<ApiResponse<ClubActivity[]>>(
      `${API_BASE_URL}/api/ClubActivity`,
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );
    return response.data.data;
  },

  /**
   * Get activity by ID
   */
  async getActivityById(
    activityId: string,
    token?: string
  ): Promise<ClubActivity> {
    const response = await axios.get<ApiResponse<ClubActivity>>(
      `${API_BASE_URL}/api/ClubActivity/${activityId}`,
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );
    return response.data.data;
  },

  /**
   * Get public activities
   */
  async getPublicActivities(token?: string): Promise<ClubActivity[]> {
    const response = await axios.get<ApiResponse<ClubActivity[]>>(
      `${API_BASE_URL}/api/ClubActivity/public`,
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );
    return response.data.data;
  },

  /**
   * Get upcoming activities
   */
  async getUpcomingActivities(token?: string): Promise<ClubActivity[]> {
    const response = await axios.get<ApiResponse<ClubActivity[]>>(
      `${API_BASE_URL}/api/ClubActivity/upcoming`,
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );
    return response.data.data;
  },

  /**
   * Create club (Admin only)
   */
  async createClub(data: Partial<Club>, token: string): Promise<Club> {
    const response = await axios.post<ApiResponse<Club>>(
      `${API_BASE_URL}/api/Club`,
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
      `${API_BASE_URL}/api/Club/${clubId}`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Delete club (Club Coordinator only)
   */
  async deleteClub(clubId: string, token: string): Promise<void> {
    await axios.delete(`${API_BASE_URL}/api/Club/${clubId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  /**
   * Create club type (Admin only)
   */
  async createClubType(
    data: Partial<ClubType>,
    token: string
  ): Promise<ClubType> {
    const response = await axios.post<ApiResponse<ClubType>>(
      `${API_BASE_URL}/api/ClubType`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Update club type (Club Coordinator only)
   */
  async updateClubType(
    typeId: string,
    data: Partial<ClubType>,
    token: string
  ): Promise<ClubType> {
    const response = await axios.put<ApiResponse<ClubType>>(
      `${API_BASE_URL}/api/ClubType/${typeId}`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Delete club type (Club Coordinator only)
   */
  async deleteClubType(typeId: string, token: string): Promise<void> {
    await axios.delete(`${API_BASE_URL}/api/ClubType/${typeId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  /**
   * Create activity (Club Coordinator only)
   */
  async createActivity(
    data: Partial<ClubActivity>,
    token: string
  ): Promise<ClubActivity> {
    const response = await axios.post<ApiResponse<ClubActivity>>(
      `${API_BASE_URL}/api/ClubActivity`,
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
      `${API_BASE_URL}/api/ClubActivity/${activityId}`,
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
    await axios.delete(`${API_BASE_URL}/api/ClubActivity/${activityId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  /**
   * Update activity status (Club Coordinator, Admin, Student Affairs)
   */
  async updateActivityStatus(
    activityId: string,
    status: number,
    cancellationReason?: string,
    token?: string
  ): Promise<ClubActivity> {
    const response = await axios.patch<ApiResponse<ClubActivity>>(
      `${API_BASE_URL}/api/ClubActivity/${activityId}/status`,
      { status, cancellationReason },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },
};
