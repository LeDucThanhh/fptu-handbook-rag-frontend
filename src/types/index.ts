// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: "student" | "mentor" | "staff" | "admin";
  avatar?: string;
}

// Q&A Types
export interface Question {
  id: string;
  content: string;
  language: "vi" | "en";
  timestamp: Date;
}

export interface Answer {
  id: string;
  questionId: string;
  content: string;
  sources: Source[];
  confidence: number;
  timestamp: Date;
}

export interface Source {
  title: string;
  content: string;
  page?: number;
  relevanceScore: number;
}

export interface Feedback {
  answerId: string;
  rating: number;
  comment?: string;
}

// Club Types
export interface Club {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  category: "sports" | "arts" | "technology" | "volunteering" | "other";
  logo?: string;
  coverImage?: string;
  contactEmail: string;
  contactPhone?: string;
  memberCount: number;
  isActive: boolean;
  activities: Activity[];
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  imageUrl?: string;
}

// Notification Types
export interface Notification {
  id: string;
  title: string;
  content: string;
  type: "info" | "warning" | "success" | "error";
  isRead: boolean;
  timestamp: Date;
}

// Analytics Types
export interface AnalyticsData {
  totalQueries: number;
  activeUsers: number;
  averageResponseTime: number;
  satisfactionRate: number;
  topQueries: TopQuery[];
  usageByTime: UsageData[];
}

export interface TopQuery {
  query: string;
  count: number;
  category: string;
}

export interface UsageData {
  date: string;
  queries: number;
  users: number;
}
