import axios from "axios";
import type {
  HandbookVersion,
  HandbookSection,
  RebuildIndexRequest,
  RebuildIndexResponse,
  ApiResponse,
} from "@/types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const handbookService = {
  /**
   * Get all handbook versions
   */
  async getVersions(token: string): Promise<HandbookVersion[]> {
    const response = await axios.get<ApiResponse<HandbookVersion[]>>(
      `${API_BASE_URL}/handbook/versions`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Get active version
   */
  async getActiveVersion(token: string): Promise<HandbookVersion> {
    const response = await axios.get<ApiResponse<HandbookVersion>>(
      `${API_BASE_URL}/handbook/versions/active`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Get sections by version
   */
  async getSections(
    versionId: string,
    token: string,
    parentId?: string
  ): Promise<HandbookSection[]> {
    const response = await axios.get<ApiResponse<HandbookSection[]>>(
      `${API_BASE_URL}/handbook/sections`,
      {
        params: { versionId, parentId },
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Get section by ID
   */
  async getSectionById(
    sectionId: string,
    token: string
  ): Promise<HandbookSection> {
    const response = await axios.get<ApiResponse<HandbookSection>>(
      `${API_BASE_URL}/handbook/sections/${sectionId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Search sections
   */
  async searchSections(
    query: string,
    versionId: string,
    token: string
  ): Promise<HandbookSection[]> {
    const response = await axios.get<ApiResponse<HandbookSection[]>>(
      `${API_BASE_URL}/handbook/sections/search`,
      {
        params: { query, versionId },
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Create new section (Academic Staff only)
   */
  async createSection(
    data: Partial<HandbookSection>,
    token: string
  ): Promise<HandbookSection> {
    const response = await axios.post<ApiResponse<HandbookSection>>(
      `${API_BASE_URL}/handbook/sections`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Update section (Academic Staff only)
   */
  async updateSection(
    sectionId: string,
    data: Partial<HandbookSection>,
    token: string
  ): Promise<HandbookSection> {
    const response = await axios.put<ApiResponse<HandbookSection>>(
      `${API_BASE_URL}/handbook/sections/${sectionId}`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Delete section (Academic Staff only)
   */
  async deleteSection(sectionId: string, token: string): Promise<void> {
    await axios.delete(`${API_BASE_URL}/handbook/sections/${sectionId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  /**
   * Rebuild index (Academic Staff only)
   */
  async rebuildIndex(
    request: RebuildIndexRequest,
    token: string
  ): Promise<RebuildIndexResponse> {
    const response = await axios.post<ApiResponse<RebuildIndexResponse>>(
      `${API_BASE_URL}/handbook/rebuild-index`,
      request,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Get rebuild status
   */
  async getRebuildStatus(
    jobId: string,
    token: string
  ): Promise<RebuildIndexResponse> {
    const response = await axios.get<ApiResponse<RebuildIndexResponse>>(
      `${API_BASE_URL}/handbook/rebuild-index/${jobId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },
};
