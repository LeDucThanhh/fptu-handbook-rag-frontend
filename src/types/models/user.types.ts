export const UserRole = {
  STUDENT: "Student",
  MENTOR: "Mentor",
  ACADEMIC_STAFF: "AcademicStaff",
  STUDENT_AFFAIRS: "StudentAffairs",
  CLUB_COORDINATOR: "ClubCoordinator",
  ADMIN: "Admin",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  roles: UserRole[];
  studentId?: string; // For students
  department?: string; // For staff
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: User;
  expiresIn: number;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  studentId?: string;
  role?: UserRole;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
