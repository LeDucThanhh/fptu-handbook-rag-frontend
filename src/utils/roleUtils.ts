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

  // Student không có dashboard riêng, về home
  return "/";
};
