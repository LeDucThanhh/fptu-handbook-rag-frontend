import axios from "axios";
import type {
  Notification,
  UserNotification,
  NotificationStats,
  ApiResponse,
  PaginatedResponse,
} from "@/types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const notificationService = {
  /**
   * Get user notifications
   */
  async getUserNotifications(
    userId: string,
    page: number = 1,
    pageSize: number = 20,
    unreadOnly: boolean = false,
    token: string
  ): Promise<PaginatedResponse<UserNotification>> {
    const response = await axios.get<
      ApiResponse<PaginatedResponse<UserNotification>>
    >(`${API_BASE_URL}/notifications/user/${userId}`, {
      params: { page, pageSize, unreadOnly },
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  },

  /**
   * Get unread count
   */
  async getUnreadCount(userId: string, token: string): Promise<number> {
    const response = await axios.get<ApiResponse<{ count: number }>>(
      `${API_BASE_URL}/notifications/user/${userId}/unread-count`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data.count;
  },

  /**
   * Mark notification as read
   */
  async markAsRead(userNotificationId: string, token: string): Promise<void> {
    await axios.put(
      `${API_BASE_URL}/notifications/${userNotificationId}/read`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },

  /**
   * Mark all as read
   */
  async markAllAsRead(userId: string, token: string): Promise<void> {
    await axios.put(
      `${API_BASE_URL}/notifications/user/${userId}/read-all`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },

  /**
   * Get all notifications (Student Affairs only)
   */
  async getAllNotifications(
    page: number = 1,
    pageSize: number = 20,
    token: string
  ): Promise<PaginatedResponse<Notification>> {
    const response = await axios.get<
      ApiResponse<PaginatedResponse<Notification>>
    >(`${API_BASE_URL}/notifications`, {
      params: { page, pageSize },
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  },

  /**
   * Create notification (Student Affairs only)
   */
  async createNotification(
    data: Partial<Notification>,
    token: string
  ): Promise<Notification> {
    const response = await axios.post<ApiResponse<Notification>>(
      `${API_BASE_URL}/notifications`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Update notification (Student Affairs only)
   */
  async updateNotification(
    notificationId: string,
    data: Partial<Notification>,
    token: string
  ): Promise<Notification> {
    const response = await axios.put<ApiResponse<Notification>>(
      `${API_BASE_URL}/notifications/${notificationId}`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Delete notification (Student Affairs only)
   */
  async deleteNotification(
    notificationId: string,
    token: string
  ): Promise<void> {
    await axios.delete(`${API_BASE_URL}/notifications/${notificationId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  /**
   * Get notification stats (Student Affairs only)
   */
  async getNotificationStats(
    notificationId: string,
    token: string
  ): Promise<NotificationStats> {
    const response = await axios.get<ApiResponse<NotificationStats>>(
      `${API_BASE_URL}/notifications/${notificationId}/stats`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },
};


