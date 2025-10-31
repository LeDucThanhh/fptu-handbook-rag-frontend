import type { User } from "@/types";
import { UserRole } from "@/types";

/**
 * Mock Google Login - Giả lập đăng nhập Google
 * Trả về user giả lập để test UI
 */
export const mockGoogleLogin = async (): Promise<{
  user: User;
  token: string;
  refreshToken: string;
}> => {
  // Giả lập API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock user data
  const mockUser: User = {
    id: "mock-user-123",
    email: "student@fpt.edu.vn",
    fullName: "Nguyễn Văn A",
    avatarUrl:
      "https://ui-avatars.com/api/?name=Nguyen+Van+A&background=f97316&color=fff",
    roles: [UserRole.STUDENT],
    studentId: "SE123456",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return {
    user: mockUser,
    token: "mock-jwt-token-12345",
    refreshToken: "mock-refresh-token-67890",
  };
};

/**
 * Mock users cho testing với các roles khác nhau
 */
export const mockUsers = {
  student: {
    id: "student-001",
    email: "student@fpt.edu.vn",
    fullName: "Nguyễn Văn Sinh Viên",
    roles: [UserRole.STUDENT],
    studentId: "SE170001",
  },
  mentor: {
    id: "mentor-001",
    email: "mentor@fpt.edu.vn",
    fullName: "Trần Thị Mentor",
    roles: [UserRole.MENTOR],
    department: "Computer Science",
  },
  academic: {
    id: "academic-001",
    email: "academic@fpt.edu.vn",
    fullName: "Lê Văn Học Vụ",
    roles: [UserRole.ACADEMIC_STAFF],
    department: "Academic Affairs",
  },
  affairs: {
    id: "affairs-001",
    email: "affairs@fpt.edu.vn",
    fullName: "Phạm Thị Công Tác SV",
    roles: [UserRole.STUDENT_AFFAIRS],
    department: "Student Affairs",
  },
  club: {
    id: "club-001",
    email: "club@fpt.edu.vn",
    fullName: "Hoàng Văn Điều Phối CLB",
    roles: [UserRole.CLUB_COORDINATOR],
    department: "FCode Club",
  },
  admin: {
    id: "admin-001",
    email: "admin@fpt.edu.vn",
    fullName: "Admin FPT",
    roles: [UserRole.ADMIN, UserRole.STUDENT],
  },
};
