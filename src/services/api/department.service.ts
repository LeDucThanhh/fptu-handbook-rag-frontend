import axios from "axios";
import type { ApiResponse } from "@/types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://fptu-handbook-esgma9b2hzckcnce.southeastasia-01.azurewebsites.net";

export interface Department {
  id: string;
  name: string;
  code: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DepartmentCreateDTO {
  name: string;
  code: string;
  description?: string;
  isActive?: boolean;
}

export interface DepartmentUpdateDTO {
  name?: string;
  code?: string;
  description?: string;
  isActive?: boolean;
}

export const departmentService = {
  /**
   * Get all departments
   */
  async getAll(token: string): Promise<Department[]> {
    const response = await axios.get<ApiResponse<Department[]>>(
      `${API_BASE_URL}/api/Department`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Get department by ID
   */
  async getById(id: string, token: string): Promise<Department> {
    const response = await axios.get<ApiResponse<Department>>(
      `${API_BASE_URL}/api/Department/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Create department (Admin/Staff)
   */
  async create(
    data: DepartmentCreateDTO,
    token: string
  ): Promise<Department> {
    const response = await axios.post<ApiResponse<Department>>(
      `${API_BASE_URL}/api/Department`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Update department (Admin/Staff)
   */
  async update(
    id: string,
    data: DepartmentUpdateDTO,
    token: string
  ): Promise<Department> {
    const response = await axios.put<ApiResponse<Department>>(
      `${API_BASE_URL}/api/Department/${id}`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  },

  /**
   * Delete department (Admin/Staff)
   */
  async delete(id: string, token: string): Promise<void> {
    await axios.delete(`${API_BASE_URL}/api/Department/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

