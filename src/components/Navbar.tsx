import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import {
  ChevronDown,
  LogOut,
  User,
  LayoutDashboard,
  Clock,
  Bell,
} from "lucide-react";
import { useAuthStore } from "@/contexts/AuthContext";
import { getDashboardRoute } from "@/utils/roleUtils";
import { UserRole } from "@/types";

const Navbar: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [language, setLanguage] = useState<"VN" | "EN">("VN");
  const [isHandbookDropdownOpen, setIsHandbookDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Auth state
  const { user, isAuthenticated, logout } = useAuthStore();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsHandbookDropdownOpen(false);
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsUserMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left side: Logo only */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-orange-200 rounded-xl blur opacity-0 group-hover:opacity-30 transition-all duration-300"></div>
                <img
                  src="/images/Logo_FPT_Education.png"
                  alt="FPT Education"
                  className="h-12 w-auto relative z-10 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>

            {/* Right side: Nav Links + Login + Language */}
            <div className="flex items-center gap-6">
              {/* Nav Links */}
              <div className="hidden md:flex items-center gap-6">
                <Link
                  to="/clubs"
                  className="text-gray-700 hover:text-orange-500 transition"
                >
                  Câu lạc bộ
                </Link>

                {/* Handbook Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() =>
                      setIsHandbookDropdownOpen(!isHandbookDropdownOpen)
                    }
                    className="flex items-center gap-1 text-gray-700 hover:text-orange-500 transition"
                  >
                    Sổ tay A-Z
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {isHandbookDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <Link
                        to="/handbook"
                        className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition"
                        onClick={() => setIsHandbookDropdownOpen(false)}
                      >
                        Tổng quan
                      </Link>
                      <Link
                        to="/handbook/introduction"
                        className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition"
                        onClick={() => setIsHandbookDropdownOpen(false)}
                      >
                        Giới thiệu chung
                      </Link>
                      <Link
                        to="/handbook/admission"
                        className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition"
                        onClick={() => setIsHandbookDropdownOpen(false)}
                      >
                        Quy chế tuyển sinh
                      </Link>
                      <Link
                        to="/handbook/tuition"
                        className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition"
                        onClick={() => setIsHandbookDropdownOpen(false)}
                      >
                        Học phí & Học bổng
                      </Link>
                    </div>
                  )}
                </div>

                <Link
                  to="/faq"
                  className="text-gray-700 hover:text-orange-500 transition"
                >
                  FAQ
                </Link>
                <Link
                  to="/qa"
                  className="text-gray-700 hover:text-orange-500 transition"
                >
                  Hỏi đáp AI
                </Link>
              </div>

              {/* Login Button or User Menu */}
              {isAuthenticated && user ? (
                <div className="flex items-center gap-4">
                  {/* Notification Bell */}
                  <Link
                    to="/notifications"
                    className="relative p-2 hover:bg-gray-100 rounded-full transition"
                  >
                    <Bell className="w-5 h-5 text-gray-700" />
                    {/* Badge for unread count */}
                    <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      2
                    </span>
                  </Link>

                  {/* User Menu */}
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center gap-2 hover:bg-gray-50 rounded-lg px-3 py-2 transition"
                    >
                      <img
                        src={
                          user.avatarUrl ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            user.fullName
                          )}&background=f97316&color=fff`
                        }
                        alt={user.fullName}
                        className="w-8 h-8 rounded-full border-2 border-orange-500"
                      />
                      <span className="hidden md:block text-sm font-medium text-gray-700">
                        {user.fullName}
                      </span>
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    </button>

                    {/* User Dropdown */}
                    {isUserMenuOpen && (
                      <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-semibold text-gray-900">
                            {user.fullName}
                          </p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                          {user.studentId && (
                            <p className="text-xs text-gray-500 mt-1">
                              MSSV: {user.studentId}
                            </p>
                          )}
                        </div>
                        {/* Show different menu for Student vs Staff */}
                        {user.roles.includes(UserRole.STUDENT) &&
                        !user.roles.includes(UserRole.ADMIN) &&
                        !user.roles.includes(UserRole.MENTOR) &&
                        !user.roles.includes(UserRole.ACADEMIC_STAFF) &&
                        !user.roles.includes(UserRole.STUDENT_AFFAIRS) &&
                        !user.roles.includes(UserRole.CLUB_COORDINATOR) ? (
                          // Student menu
                          <>
                            <Link
                              to="/profile"
                              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <User className="w-4 h-4" />
                              Thông tin cá nhân
                            </Link>
                            <Link
                              to="/history"
                              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <Clock className="w-4 h-4" />
                              Lịch sử hỏi đáp
                            </Link>
                          </>
                        ) : (
                          // Staff/Admin menu
                          <Link
                            to={getDashboardRoute(user)}
                            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <LayoutDashboard className="w-4 h-4" />
                            Dashboard
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition"
                        >
                          <LogOut className="w-4 h-4" />
                          Đăng xuất
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition font-semibold"
                >
                  Đăng nhập
                </button>
              )}

              <div className="flex items-center gap-1 text-sm text-gray-600">
                <button
                  onClick={() => setLanguage("VN")}
                  className={`${
                    language === "VN"
                      ? "text-orange-500 font-semibold"
                      : "hover:text-orange-500"
                  }`}
                >
                  VN
                </button>
                <span>/</span>
                <button
                  onClick={() => setLanguage("EN")}
                  className={`${
                    language === "EN"
                      ? "text-orange-500 font-semibold"
                      : "hover:text-orange-500"
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
