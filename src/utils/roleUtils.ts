import { UserRole } from "@/types";
import type { User } from "@/types";

/**
 * Get dashboard route based on user's primary role
 */
export const getDashboardRoute = (user: User | null): string => {
  if (!user || !user.roles || user.roles.length === 0) {
    return "/";
  }

  // Priority: Admin > Mentor > Academic > Affairs > Club > Student
  if (user.roles.includes(UserRole.ADMIN)) {
    return "/admin/dashboard";
  }

  if (user.roles.includes(UserRole.MENTOR)) {
    return "/mentor/dashboard";
  }

  if (user.roles.includes(UserRole.ACADEMIC_STAFF)) {
    return "/academic/dashboard";
  }

  if (user.roles.includes(UserRole.STUDENT_AFFAIRS)) {
    return "/affairs/dashboard";
  }

  if (user.roles.includes(UserRole.CLUB_COORDINATOR)) {
    return "/club/dashboard";
  }

  // Student không có dashboard riêng, về home page
  return "/";
};

/**
 * Get role display name in Vietnamese
 */
export const getRoleDisplayName = (role: UserRole): string => {
  const roleNames: Record<UserRole, string> = {
    [UserRole.STUDENT]: "Sinh viên",
    [UserRole.MENTOR]: "Mentor / Cố vấn",
    [UserRole.ACADEMIC_STAFF]: "Phòng Đào tạo",
    [UserRole.STUDENT_AFFAIRS]: "Phòng Công tác SV",
    [UserRole.CLUB_COORDINATOR]: "Điều phối viên CLB",
    [UserRole.ADMIN]: "Quản trị viên",
  };
  return roleNames[role] || role;
};
