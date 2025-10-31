export interface MentorPost {
  id: string;
  title: string;
  content: string;
  contentHtml: string;
  topic: string;
  language: "vi" | "en";
  status: "draft" | "public" | "internal";
  relatedQueryIds: string[];
  authorId: string;
  authorName: string;
  viewCount: number;
  helpfulCount: number;
  tags: string[];
  isIndexed: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MentorPostRequest {
  title: string;
  content: string;
  topic: string;
  language: "vi" | "en";
  status: "draft" | "public" | "internal";
  relatedQueryIds?: string[];
  tags?: string[];
}

export interface PopularQuery {
  id: string;
  query: string;
  frequency: number;
  topic: string;
  language: "vi" | "en";
  avgConfidence: number;
  positiveRate: number;
  lastAskedAt: string;
  createdAt: string;
  updatedAt: string;
}


