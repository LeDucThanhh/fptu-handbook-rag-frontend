export interface HandbookVersion {
  id: string;
  versionName: string;
  isActive: boolean;
  effectiveDate: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface HandbookSection {
  id: string;
  versionId: string;
  title: string;
  slug: string;
  content: string;
  parentId?: string;
  orderIndex: number;
  topics: string[];
  language: "vi" | "en";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  children?: HandbookSection[];
}

export interface HandbookChunk {
  id: string;
  sectionId: string;
  chunkText: string;
  embedding?: number[];
  orderIndex: number;
  tokenCount: number;
  createdAt: string;
}

export interface RebuildIndexRequest {
  versionId: string;
  force?: boolean;
}

export interface RebuildIndexResponse {
  jobId: string;
  status: "queued" | "processing" | "completed" | "failed";
  progress: number;
  message: string;
}


