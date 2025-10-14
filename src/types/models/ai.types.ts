export interface QueryRequest {
  query: string;
  language: "vi" | "en";
  userId?: string;
  contextId?: string;
}

export interface Citation {
  sourceId: string;
  sourceType: "handbook" | "club" | "notification" | "mentor_post";
  title: string;
  excerpt: string;
  url?: string;
  relevanceScore: number;
}

export interface QueryResponse {
  queryId: string;
  query: string;
  answer: string;
  citations: Citation[];
  confidence: number;
  language: "vi" | "en";
  responseTime: number;
  createdAt: string;
}

export interface QueryLog {
  id: string;
  userId: string;
  query: string;
  answer: string;
  citations: Citation[];
  confidence: number;
  language: "vi" | "en";
  responseTime: number;
  isResolved: boolean;
  createdAt: string;
}

export interface UserFeedback {
  id: string;
  queryLogId: string;
  userId: string;
  rating: number; // -1 (negative), 0 (neutral), 1 (positive)
  comment?: string;
  createdAt: string;
}

export interface UnresolvedQuery {
  id: string;
  queryLogId: string;
  userId: string;
  query: string;
  answer: string;
  confidence: number;
  topic: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "in_progress" | "resolved";
  assignedTo?: string;
  resolvedBy?: string;
  resolvedAt?: string;
  createdAt: string;
  updatedAt: string;
}


