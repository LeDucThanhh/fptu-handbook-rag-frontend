import axios from "axios";
import type {
  QueryRequest,
  QueryResponse,
  QueryLog,
  UserFeedback,
  ApiResponse,
  PaginatedResponse,
} from "@/types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const aiService = {
  /**
   * Ask a question to AI RAG
   */
  async askQuestion(
    query: QueryRequest,
    token: string
  ): Promise<QueryResponse> {
    const response = await axios.post<ApiResponse<QueryResponse>>(
      `${API_BASE_URL}/ai/query`,
      query,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Get query history for user
   */
  async getQueryHistory(
    userId: string,
    page: number = 1,
    pageSize: number = 20,
    token: string
  ): Promise<PaginatedResponse<QueryLog>> {
    const response = await axios.get<ApiResponse<PaginatedResponse<QueryLog>>>(
      `${API_BASE_URL}/ai/history`,
      {
        params: { userId, page, pageSize },
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Submit feedback for a query
   */
  async submitFeedback(
    queryLogId: string,
    rating: number,
    comment: string | undefined,
    token: string
  ): Promise<UserFeedback> {
    const response = await axios.post<ApiResponse<UserFeedback>>(
      `${API_BASE_URL}/ai/feedback`,
      { queryLogId, rating, comment },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Get suggested questions
   */
  async getSuggestedQuestions(
    language: "vi" | "en",
    token: string
  ): Promise<string[]> {
    const response = await axios.get<ApiResponse<string[]>>(
      `${API_BASE_URL}/ai/suggested-questions`,
      {
        params: { language },
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Get popular queries
   */
  async getPopularQueries(
    limit: number = 10,
    token: string
  ): Promise<QueryLog[]> {
    const response = await axios.get<ApiResponse<QueryLog[]>>(
      `${API_BASE_URL}/ai/popular`,
      {
        params: { limit },
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },
};
