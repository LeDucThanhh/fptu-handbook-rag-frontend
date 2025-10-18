import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuthStore } from "@/contexts/AuthContext";
import { mockUsers } from "@/services/mock/mockAuth";
import { getDashboardRoute } from "@/utils/roleUtils";
import type { User } from "@/types";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleMockLogin = async (
    role: "student" | "mentor" | "academic" | "affairs" | "club" | "admin"
  ) => {
    try {
      setIsLoading(true);

      // Giả lập API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Lấy mock user theo role
      const mockUserData = mockUsers[role];
      const user: User = {
        ...mockUserData,
        avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          mockUserData.fullName
        )}&background=f97316&color=fff`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Lưu vào store
      useAuthStore.setState({
        user,
        token: `mock-jwt-${role}-token`,
        refreshToken: `mock-refresh-${role}-token`,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      toast.success(`Chào mừng ${user.fullName}! 🎉`);
      onClose();

      // Redirect to appropriate dashboard based on role
      const dashboardRoute = getDashboardRoute(user);
      navigate(dashboardRoute);
    } catch (error: any) {
      toast.error("Đăng nhập thất bại. Vui lòng thử lại!");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isLoading) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      {/* Modal Container */}
      <div className="bg-gradient-to-br from-white to-orange-50 rounded-3xl shadow-2xl p-8 max-w-3xl w-full animate-slideInUp relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-orange-200/40 via-orange-100/30 to-transparent rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-orange-200/40 via-orange-100/30 to-transparent rounded-full -ml-16 -mb-16 blur-3xl"></div>

        {/* Close Button */}
        {!isLoading && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 z-50 transition-all"
            aria-label="Close"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        {/* Content */}
        <div className="text-center relative z-10">
          {/* Logo */}
          <div className="mb-4 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-200/60 to-orange-300/60 rounded-2xl blur-2xl scale-110"></div>
            <div className="relative p-3">
              <img
                src="/images/Logo_FPT_Education.png"
                alt="FPT Education"
                className="h-16 w-auto mx-auto"
              />
            </div>
          </div>

          {/* Title */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Đăng nhập vào
              </span>
              <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                {" "}
                FPTU Handbook
              </span>
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Chọn role để test giao diện
            </p>
          </div>

          {/* Role Selection Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {/* Student */}
            <button
              onClick={() => handleMockLogin("student")}
              disabled={isLoading}
              className="group relative bg-white border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg rounded-xl p-6 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform">
                  🎓
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 group-hover:text-blue-600">
                    Student
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">Sinh viên</p>
                </div>
              </div>
            </button>

            {/* Mentor */}
            <button
              onClick={() => handleMockLogin("mentor")}
              disabled={isLoading}
              className="group relative bg-white border-2 border-gray-200 hover:border-green-500 hover:shadow-lg rounded-xl p-6 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform">
                  👨‍🏫
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 group-hover:text-green-600">
                    Mentor
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">Cố vấn học tập</p>
                </div>
              </div>
            </button>

            {/* Academic Staff */}
            <button
              onClick={() => handleMockLogin("academic")}
              disabled={isLoading}
              className="group relative bg-white border-2 border-gray-200 hover:border-purple-500 hover:shadow-lg rounded-xl p-6 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform">
                  📚
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 group-hover:text-purple-600">
                    Academic
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">Phòng học vụ</p>
                </div>
              </div>
            </button>

            {/* Student Affairs */}
            <button
              onClick={() => handleMockLogin("affairs")}
              disabled={isLoading}
              className="group relative bg-white border-2 border-gray-200 hover:border-teal-500 hover:shadow-lg rounded-xl p-6 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform">
                  🏢
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 group-hover:text-teal-600">
                    Affairs
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">Công tác SV</p>
                </div>
              </div>
            </button>

            {/* Club Coordinator */}
            <button
              onClick={() => handleMockLogin("club")}
              disabled={isLoading}
              className="group relative bg-white border-2 border-gray-200 hover:border-pink-500 hover:shadow-lg rounded-xl p-6 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform">
                  🎭
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 group-hover:text-pink-600">
                    Club
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">Điều phối CLB</p>
                </div>
              </div>
            </button>

            {/* Admin */}
            <button
              onClick={() => handleMockLogin("admin")}
              disabled={isLoading}
              className="group relative bg-white border-2 border-gray-200 hover:border-orange-500 hover:shadow-lg rounded-xl p-6 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform">
                  👑
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 group-hover:text-orange-600">
                    Admin
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">Quản trị viên</p>
                </div>
              </div>
            </button>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center gap-2 py-4">
              <div className="w-6 h-6 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
              <span className="text-gray-600 font-medium">
                Đang đăng nhập...
              </span>
            </div>
          )}

          {/* Demo Mode Badge */}
          <div className="mt-4 inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-xs font-semibold">
            🧪 Demo Mode - Mock Login (No Backend Required)
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
