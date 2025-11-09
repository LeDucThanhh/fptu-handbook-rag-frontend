import axios from "axios";
import type {
  HandbookVersion,
  HandbookSection,
  RebuildIndexRequest,
  RebuildIndexResponse,
  ApiResponse,
} from "@/types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://fptu-handbook-esgma9b2hzckcnce.southeastasia-01.azurewebsites.net";

export const handbookService = {
  /**
   * Get all handbook versions
   */
  async getVersions(token: string): Promise<HandbookVersion[]> {
    const response = await axios.get<ApiResponse<HandbookVersion[]>>(
      `${API_BASE_URL}/api/HandbooksVersion`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Get handbook version by ID
   */
  async getVersionById(
    versionId: string,
    token: string
  ): Promise<HandbookVersion> {
    const response = await axios.get<ApiResponse<HandbookVersion>>(
      `${API_BASE_URL}/api/HandbooksVersion/${versionId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Get active version for a specific year
   */
  async getActiveVersionForYear(
    year: number,
    token: string
  ): Promise<HandbookVersion> {
    const response = await axios.get<ApiResponse<HandbookVersion>>(
      `${API_BASE_URL}/api/HandbooksVersion/active/${year}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Get all sections
   */
  async getAllSections(token: string): Promise<HandbookSection[]> {
    const response = await axios.get<ApiResponse<HandbookSection[]>>(
      `${API_BASE_URL}/api/HandbookSection`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Get sections by handbook ID
   */
  async getSectionsByHandbook(
    handbookId: string,
    token: string
  ): Promise<HandbookSection[]> {
    const response = await axios.get<ApiResponse<HandbookSection[]>>(
      `${API_BASE_URL}/api/HandbookSection/handbook/${handbookId}`,
      {
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
      `${API_BASE_URL}/api/HandbookSection/${sectionId}`,
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
    topK: number = 10,
    token: string
  ): Promise<HandbookSection[]> {
    const response = await axios.post<ApiResponse<HandbookSection[]>>(
      `${API_BASE_URL}/api/HandbookSection/search`,
      { query, topK },
      {
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
      `${API_BASE_URL}/api/HandbookSection`,
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
      `${API_BASE_URL}/api/HandbookSection/${sectionId}`,
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
    await axios.delete(`${API_BASE_URL}/api/HandbookSection/${sectionId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  /**
   * Create new handbook version (Academic Staff only)
   */
  async createVersion(
    data: Partial<HandbookVersion>,
    token: string
  ): Promise<HandbookVersion> {
    const response = await axios.post<ApiResponse<HandbookVersion>>(
      `${API_BASE_URL}/api/HandbooksVersion`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Update handbook version (Academic Staff only)
   */
  async updateVersion(
    versionId: string,
    data: Partial<HandbookVersion>,
    token: string
  ): Promise<HandbookVersion> {
    const response = await axios.put<ApiResponse<HandbookVersion>>(
      `${API_BASE_URL}/api/HandbooksVersion/update/${versionId}`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Update handbook version status (Academic Staff only)
   */
  async updateVersionStatus(
    versionId: string,
    isActive: boolean,
    updatedBy: string,
    token: string
  ): Promise<HandbookVersion> {
    const response = await axios.patch<ApiResponse<HandbookVersion>>(
      `${API_BASE_URL}/api/HandbooksVersion/${versionId}/status`,
      updatedBy,
      {
        params: { isActive },
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Delete handbook version (Academic Staff only)
   */
  async deleteVersion(versionId: string, token: string): Promise<void> {
    await axios.delete(
      `${API_BASE_URL}/api/HandbooksVersion/delete/${versionId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },
};
