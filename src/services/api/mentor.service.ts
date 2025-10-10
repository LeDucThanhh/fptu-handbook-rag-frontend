import axios from "axios";
import type {
  UnresolvedQuery,
  MentorPost,
  MentorPostRequest,
  PopularQuery,
  ApiResponse,
  PaginatedResponse,
} from "@/types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const mentorService = {
  /**
   * Get unresolved queries (Mentor only)
   */
  async getUnresolvedQueries(
    page: number = 1,
    pageSize: number = 20,
    topic?: string,
    priority?: string,
    status?: string,
    token?: string
  ): Promise<PaginatedResponse<UnresolvedQuery>> {
    const response = await axios.get<
      ApiResponse<PaginatedResponse<UnresolvedQuery>>
    >(`${API_BASE_URL}/mentor/unresolved`, {
      params: { page, pageSize, topic, priority, status },
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  },

  /**
   * Get unresolved query by ID (Mentor only)
   */
  async getUnresolvedQueryById(
    queryId: string,
    token: string
  ): Promise<UnresolvedQuery> {
    const response = await axios.get<ApiResponse<UnresolvedQuery>>(
      `${API_BASE_URL}/mentor/unresolved/${queryId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Assign unresolved query to mentor (Mentor only)
   */
  async assignQuery(
    queryId: string,
    mentorId: string,
    token: string
  ): Promise<UnresolvedQuery> {
    const response = await axios.put<ApiResponse<UnresolvedQuery>>(
      `${API_BASE_URL}/mentor/unresolved/${queryId}/assign`,
      { mentorId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Resolve query (Mentor only)
   */
  async resolveQuery(
    queryId: string,
    postId: string,
    token: string
  ): Promise<UnresolvedQuery> {
    const response = await axios.put<ApiResponse<UnresolvedQuery>>(
      `${API_BASE_URL}/mentor/unresolved/${queryId}/resolve`,
      { postId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Get mentor posts (Mentor only for all, public for students)
   */
  async getMentorPosts(
    page: number = 1,
    pageSize: number = 20,
    status?: string,
    topic?: string,
    token?: string
  ): Promise<PaginatedResponse<MentorPost>> {
    const response = await axios.get<
      ApiResponse<PaginatedResponse<MentorPost>>
    >(`${API_BASE_URL}/mentor/posts`, {
      params: { page, pageSize, status, topic },
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data.data;
  },

  /**
   * Get mentor post by ID
   */
  async getMentorPostById(postId: string, token?: string): Promise<MentorPost> {
    const response = await axios.get<ApiResponse<MentorPost>>(
      `${API_BASE_URL}/mentor/posts/${postId}`,
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );
    return response.data.data;
  },

  /**
   * Create mentor post (Mentor only)
   */
  async createMentorPost(
    data: MentorPostRequest,
    token: string
  ): Promise<MentorPost> {
    const response = await axios.post<ApiResponse<MentorPost>>(
      `${API_BASE_URL}/mentor/posts`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Update mentor post (Mentor only)
   */
  async updateMentorPost(
    postId: string,
    data: Partial<MentorPostRequest>,
    token: string
  ): Promise<MentorPost> {
    const response = await axios.put<ApiResponse<MentorPost>>(
      `${API_BASE_URL}/mentor/posts/${postId}`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Delete mentor post (Mentor only)
   */
  async deleteMentorPost(postId: string, token: string): Promise<void> {
    await axios.delete(`${API_BASE_URL}/mentor/posts/${postId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  /**
   * Publish mentor post (Mentor only)
   */
  async publishMentorPost(postId: string, token: string): Promise<MentorPost> {
    const response = await axios.put<ApiResponse<MentorPost>>(
      `${API_BASE_URL}/mentor/posts/${postId}/publish`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Get popular queries (Mentor only)
   */
  async getPopularQueries(
    page: number = 1,
    pageSize: number = 20,
    topic?: string,
    token?: string
  ): Promise<PaginatedResponse<PopularQuery>> {
    const response = await axios.get<
      ApiResponse<PaginatedResponse<PopularQuery>>
    >(`${API_BASE_URL}/mentor/popular-queries`, {
      params: { page, pageSize, topic },
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data.data;
  },

  /**
   * Mark post as helpful
   */
  async markPostAsHelpful(postId: string, token: string): Promise<void> {
    await axios.post(
      `${API_BASE_URL}/mentor/posts/${postId}/helpful`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },
};
