export interface Notification {
  id: string;
  title: string;
  content: string;
  notificationType: "announcement" | "event" | "academic" | "club" | "system";
  priority: "low" | "medium" | "high" | "urgent";
  targetAudience: "all" | "students" | "staff" | "role_based" | "specific";
  targetRoles?: string[];
  targetUserIds?: string[];
  imageUrl?: string;
  linkUrl?: string;
  startAt?: string;
  expireAt?: string;
  isPublished: boolean;
  publishedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserNotification {
  id: string;
  notificationId: string;
  notification?: Notification;
  userId: string;
  isRead: boolean;
  readAt?: string;
  createdAt: string;
}

export interface NotificationStats {
  totalSent: number;
  totalRead: number;
  openRate: number;
  avgTimeToRead: number;
}
