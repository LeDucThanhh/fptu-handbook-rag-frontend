import axios from "axios";
import type { ApiResponse } from "@/types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://fptu-handbook-esgma9b2hzckcnce.southeastasia-01.azurewebsites.net";

export interface SystemConfiguration {
  id: string;
  key: string;
  value: string;
  description?: string;
  category?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SystemConfigurationCreateDTO {
  key: string;
  value: string;
  description?: string;
  category?: string;
  isActive?: boolean;
}

export interface SystemConfigurationUpdateDTO {
  key?: string;
  value?: string;
  description?: string;
  category?: string;
  isActive?: boolean;
}

export const systemConfigService = {
  /**
   * Get all configurations (Admin only)
   */
  async getAll(token: string): Promise<SystemConfiguration[]> {
    const response = await axios.get<ApiResponse<SystemConfiguration[]>>(
      `${API_BASE_URL}/api/SystemConfiguration`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Get configuration by ID (Admin only)
   */
  async getById(id: string, token: string): Promise<SystemConfiguration> {
    const response = await axios.get<ApiResponse<SystemConfiguration>>(
      `${API_BASE_URL}/api/SystemConfiguration/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Create configuration (Admin only)
   */
  async create(
    data: SystemConfigurationCreateDTO,
    token: string
  ): Promise<SystemConfiguration> {
    const response = await axios.post<ApiResponse<SystemConfiguration>>(
      `${API_BASE_URL}/api/SystemConfiguration`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Update configuration (Admin only)
   */
  async update(
    id: string,
    data: SystemConfigurationUpdateDTO,
    token: string
  ): Promise<SystemConfiguration> {
    const response = await axios.put<ApiResponse<SystemConfiguration>>(
      `${API_BASE_URL}/api/SystemConfiguration/${id}`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Delete configuration (Admin only)
   */
  async delete(id: string, token: string): Promise<void> {
    await axios.delete(`${API_BASE_URL}/api/SystemConfiguration/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

