import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "@/contexts/AuthContext";
import { UserRole } from "@/types";
import {
  Home,
  MessageCircle,
  BookOpen,
  Users,
  Bell,
  User,
  AlertCircle,
  FileText,
  BarChart,
  Settings,
  Shield,
  Activity,
  Database,
  Calendar,
  TrendingUp,
  RefreshCw,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: any;
}

export default function RoleNavigation() {
  const { user } = useAuthStore();
  const location = useLocation();

  if (!user) return null;

  // Define navigation items for each role
  const getNavigationItems = (): NavItem[] => {
    // ADMIN - Full access
    if (user.roles.includes(UserRole.ADMIN)) {
      return [
        { label: "Admin Dashboard", href: "/admin/dashboard", icon: Home },
        { label: "Quản lý người dùng", href: "/admin/users", icon: Users },
        { label: "Cấu hình hệ thống", href: "/admin/config", icon: Settings },
        { label: "Audit Logs", href: "/admin/logs", icon: FileText },
        { label: "System Health", href: "/admin/health", icon: Activity },
        { label: "--- Mentor Access ---", href: "#", icon: null },
        {
          label: "Unresolved Queue",
          href: "/mentor/unresolved",
          icon: AlertCircle,
        },
        { label: "Mentor Posts", href: "/mentor/posts", icon: FileText },
        { label: "--- Academic Access ---", href: "#", icon: null },
        {
          label: "Handbook Management",
          href: "/academic/handbook",
          icon: BookOpen,
        },
        { label: "Rebuild Index", href: "/academic/rebuild", icon: RefreshCw },
      ];
    }

    // MENTOR
    if (user.roles.includes(UserRole.MENTOR)) {
      return [
        {
          label: "Câu hỏi chưa giải quyết",
          href: "/mentor/unresolved",
          icon: AlertCircle,
        },
        { label: "Analytics", href: "/mentor/analytics", icon: BarChart },
        { label: "Resource Recommendations", href: "/mentor/recommendations", icon: BookOpen },
      ];
    }

    // ACADEMIC STAFF
    if (user.roles.includes(UserRole.ACADEMIC_STAFF)) {
      return [
        {
          label: "Academic Dashboard",
          href: "/academic/dashboard",
          icon: Home,
        },
        {
          label: "Quản lý Handbook",
          href: "/academic/handbook",
          icon: BookOpen,
        },
        { label: "Rebuild Index", href: "/academic/rebuild", icon: RefreshCw },
      ];
    }

    // STUDENT AFFAIRS
    if (user.roles.includes(UserRole.STUDENT_AFFAIRS)) {
      return [
        { label: "Affairs Dashboard", href: "/affairs/dashboard", icon: Home },
        {
          label: "Quản lý Thông báo",
          href: "/affairs/notifications",
          icon: Bell,
        },
        { label: "Quản lý CLB", href: "/affairs/clubs", icon: Users },
        {
          label: "Engagement Dashboard",
          href: "/affairs/engagement",
          icon: TrendingUp,
        },
      ];
    }

    // CLUB COORDINATOR
    if (user.roles.includes(UserRole.CLUB_COORDINATOR)) {
      return [
        { label: "Quản lý Câu lạc bộ", href: "/club/dashboard", icon: Home },
      ];
    }

    // No sidebar for students - they use public routes
    return [];
  };

  const navItems = getNavigationItems();

  const isActive = (href: string) => {
    if (href === "#") return false;
    return (
      location.pathname === href || location.pathname.startsWith(href + "/")
    );
  };

  return (
    <nav className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-1">
          {user.fullName}
        </h2>
        <div className="flex flex-wrap gap-1">
          {user.roles.map((role) => (
            <span
              key={role}
              className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full font-semibold"
            >
              {role}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-1">
        {navItems.map((item, index) => {
          // Render divider
          if (item.href === "#") {
            return (
              <div key={index} className="py-2">
                <p className="text-xs font-semibold text-gray-400 uppercase px-3">
                  {item.label}
                </p>
              </div>
            );
          }

          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={index}
              to={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                active
                  ? "bg-orange-500 text-white font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {Icon && <Icon className="w-5 h-5" />}
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
