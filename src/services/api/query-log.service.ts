import axios from "axios";
import type { ApiResponse } from "@/types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://fptu-handbook-esgma9b2hzckcnce.southeastasia-01.azurewebsites.net";

export interface QueryLog {
  id: string;
  userId: string;
  query: string;
  response: string;
  sources?: string[];
  isResolved: boolean;
  feedbackScore?: number;
  feedbackComment?: string;
  createdAt: Date;
}

export interface QueryResponse {
  id: string;
  query: string;
  response: string;
  sources: string[];
  confidence: number;
  isResolved: boolean;
}

export interface QueryFeedback {
  queryLogId: string;
  score: number;
  comment?: string;
}

export const queryLogService = {
  /**
   * Get query history for current user
   */
  async getHistory(token: string): Promise<QueryLog[]> {
    const response = await axios.get<ApiResponse<QueryLog[]>>(
      `${API_BASE_URL}/api/QueryLog/history`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Generate AI response for query
   */
  async generate(query: string, token: string): Promise<QueryResponse> {
    const response = await axios.post<ApiResponse<QueryResponse>>(
      `${API_BASE_URL}/api/QueryLog/generate`,
      JSON.stringify(query),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.data;
  },

  /**
   * Submit feedback for query
   */
  async submitFeedback(
    feedback: QueryFeedback,
    token: string
  ): Promise<void> {
    await axios.post(
      `${API_BASE_URL}/api/QueryLog/feedback`,
      feedback,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },

  /**
   * Get unresolved queries (Mentor only)
   */
  async getUnresolvedQueries(token: string): Promise<QueryLog[]> {
    const response = await axios.get<ApiResponse<QueryLog[]>>(
      `${API_BASE_URL}/api/QueryLog/unresolved`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Mark query as resolved (Mentor only)
   */
  async markAsResolved(
    queryLogId: string,
    token: string
  ): Promise<void> {
    await axios.put(
      `${API_BASE_URL}/api/QueryLog/${queryLogId}/resolve`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },
};

