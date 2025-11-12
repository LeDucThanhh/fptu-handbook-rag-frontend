import axios from "axios";
import type {
  Notification,
  UserNotification,
  NotificationStats,
  ApiResponse,
  PaginatedResponse,
} from "@/types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://fptu-handbook-esgma9b2hzckcnce.southeastasia-01.azurewebsites.net";

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
  async getAllNotifications(token: string): Promise<Notification[]> {
    const response = await axios.get<ApiResponse<Notification[]>>(
      `${API_BASE_URL}/api/Notification`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Get notification by ID
   */
  async getNotificationById(
    notificationId: string,
    token: string
  ): Promise<Notification> {
    const response = await axios.get<ApiResponse<Notification>>(
      `${API_BASE_URL}/api/Notification/${notificationId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
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
      `${API_BASE_URL}/api/Notification`,
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
      `${API_BASE_URL}/api/Notification`,
      data,
      {
        params: { id: notificationId },
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
    await axios.delete(`${API_BASE_URL}/api/Notification`, {
      params: { id: notificationId },
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
