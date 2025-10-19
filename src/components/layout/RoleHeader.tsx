import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/contexts/AuthContext";
import { UserRole } from "@/types";
import { DESIGN_TOKENS } from "@/design-system/tokens";
import { LogOut } from "lucide-react";

interface RoleHeaderProps {
  title: string;
  description?: string;
  icon: React.ReactNode;
  className?: string;
}

export const RoleHeader: React.FC<RoleHeaderProps> = ({
  title,
  description,
  icon,
  className = "",
}) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return "from-red-500 to-red-600";
      case UserRole.MENTOR:
        return "from-blue-500 to-blue-600";
      case UserRole.ACADEMIC_STAFF:
        return "from-green-500 to-green-600";
      case UserRole.STUDENT_AFFAIRS:
        return "from-orange-500 to-orange-600"; // Changed from purple to orange
      case UserRole.CLUB_COORDINATOR:
        return "from-orange-500 to-orange-600"; // Changed from pink to orange
      case UserRole.STUDENT:
        return "from-orange-500 to-orange-600";
      default:
        return "from-orange-500 to-orange-600";
    }
  };

  const getRoleName = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return "Quản trị viên";
      case UserRole.MENTOR:
        return "Mentor";
      case UserRole.ACADEMIC_STAFF:
        return "Nhân viên học vụ";
      case UserRole.STUDENT_AFFAIRS:
        return "Nhân viên công tác sinh viên";
      case UserRole.CLUB_COORDINATOR:
        return "Điều phối viên CLB";
      case UserRole.STUDENT:
        return "Sinh viên";
      default:
        return "Người dùng";
    }
  };

  const primaryRole = user?.roles?.[0] || UserRole.STUDENT;
  const gradientClass = getRoleColor(primaryRole);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div
      className={`bg-gradient-to-r ${gradientClass} rounded-3xl p-8 mb-8 text-white shadow-2xl ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            {icon}
          </div>
          <div>
            <h1
              className={`${DESIGN_TOKENS.typography.heading2} text-white mb-1`}
            >
              {title}
            </h1>
            {description && (
              <p
                className={`${DESIGN_TOKENS.typography.caption} text-white/80`}
              >
                {description}
              </p>
            )}
            <div className="mt-2">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold">
                {getRoleName(primaryRole)}
              </span>
            </div>
          </div>
        </div>

        {/* Logout Button - Only show for Student role (no sidebar) */}
        {primaryRole === UserRole.STUDENT && (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Đăng xuất</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default RoleHeader;
