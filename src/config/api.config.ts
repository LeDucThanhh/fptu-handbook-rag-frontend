// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  TIMEOUT: 30000,
  HEADERS: {
    "Content-Type": "application/json",
  },
};

// Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  LOGOUT: "/auth/logout",

  // Q&A System
  ASK_QUESTION: "/qa/ask",
  GET_HISTORY: "/qa/history",
  PROVIDE_FEEDBACK: "/qa/feedback",

  // Clubs
  GET_CLUBS: "/clubs",
  GET_CLUB_DETAIL: "/clubs/:id",
  SEARCH_CLUBS: "/clubs/search",

  // Handbook
  GET_HANDBOOK: "/handbook",
  SEARCH_HANDBOOK: "/handbook/search",

  // Notifications
  GET_NOTIFICATIONS: "/notifications",
  MARK_AS_READ: "/notifications/:id/read",

  // Analytics (Staff/Admin)
  GET_ANALYTICS: "/analytics",
  GET_TOP_QUERIES: "/analytics/top-queries",
  GET_USAGE_STATS: "/analytics/usage",
};










