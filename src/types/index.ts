// User types
export * from "./models/user.types";

// Handbook types
export * from "./models/handbook.types";

// AI & Query types
export * from "./models/ai.types";

// Club types
export * from "./models/club.types";

// Notification types
export * from "./models/notification.types";

// Mentor types
export * from "./models/mentor.types";

// Common API types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, string[]>;
}
