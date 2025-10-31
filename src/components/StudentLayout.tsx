import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/contexts/AuthContext";
import { Menu, Dropdown, Avatar, Button } from "antd";
import type { MenuProps } from "antd";
import {
  MessageOutlined,
  BookOutlined,
  TeamOutlined,
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const StudentLayout: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return null;
  }

  // Get current path for active menu item
  const currentPath = location.pathname;

  // User dropdown menu
  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Hồ sơ cá nhân",
      onClick: () => navigate("/student/profile"),
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden flex flex-col">
      {/* Header - Tabs bên phải */}
      <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50 shadow-sm">
        <div className="max-w-screen-2xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo - BÊN TRÁI */}
            <button
              onClick={() => navigate("/student")}
              className="flex items-center hover:opacity-80 transition"
            >
              <img
                src="/images/Logo_FPT_Education.png"
                alt="FPT Education"
                className="h-10 w-auto"
              />
            </button>

            {/* Desktop Navigation + User - BÊN PHẢI */}
            <div className="hidden md:flex items-center gap-1">
              <button
                onClick={() => navigate("/qa")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                  currentPath === "/qa"
                    ? "bg-orange-50 text-orange-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <MessageOutlined />
                <span>Hỏi đáp AI</span>
              </button>
              <button
                onClick={() => navigate("/handbook")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                  currentPath === "/handbook"
                    ? "bg-orange-50 text-orange-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <BookOutlined />
                <span>Sổ tay</span>
              </button>
              <button
                onClick={() => navigate("/clubs")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                  currentPath === "/clubs"
                    ? "bg-orange-50 text-orange-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <TeamOutlined />
                <span>Câu lạc bộ</span>
              </button>
              <button
                onClick={() => navigate("/student/notifications")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                  currentPath === "/student/notifications"
                    ? "bg-orange-50 text-orange-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <BellOutlined />
                <span>Thông báo</span>
              </button>

              {/* Divider */}
              <div className="w-px h-8 bg-gray-200 mx-2"></div>

              {/* User Dropdown */}
              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                <button className="flex items-center gap-3 hover:bg-gray-50 rounded-lg p-2 transition">
                  <Avatar
                    src={
                      user.avatarUrl ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user.fullName
                      )}&background=f97316&color=fff`
                    }
                    alt={user.fullName}
                    size={36}
                  />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900">
                      {user.fullName}
                    </p>
                    <p className="text-xs text-gray-500">{user.studentId}</p>
                  </div>
                </button>
              </Dropdown>
            </div>

            {/* Mobile Menu Button */}
            <Button
              type="text"
              icon={mobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
              size="large"
            />
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <Menu
                mode="vertical"
                selectedKeys={[currentPath]}
                items={[
                  {
                    key: "/qa",
                    icon: <MessageOutlined />,
                    label: "Hỏi đáp AI",
                    onClick: () => {
                      navigate("/qa");
                      setMobileMenuOpen(false);
                    },
                  },
                  {
                    key: "/handbook",
                    icon: <BookOutlined />,
                    label: "Sổ tay",
                    onClick: () => {
                      navigate("/handbook");
                      setMobileMenuOpen(false);
                    },
                  },
                  {
                    key: "/clubs",
                    icon: <TeamOutlined />,
                    label: "Câu lạc bộ",
                    onClick: () => {
                      navigate("/clubs");
                      setMobileMenuOpen(false);
                    },
                  },
                  {
                    key: "/student/notifications",
                    icon: <BellOutlined />,
                    label: "Thông báo",
                    onClick: () => {
                      navigate("/student/notifications");
                      setMobileMenuOpen(false);
                    },
                  },
                  {
                    type: "divider",
                  },
                  {
                    key: "/student/profile",
                    icon: <UserOutlined />,
                    label: "Thông tin cá nhân",
                    onClick: () => {
                      navigate("/student/profile");
                      setMobileMenuOpen(false);
                    },
                  },
                  {
                    key: "logout-mobile",
                    icon: <LogoutOutlined />,
                    label: "Đăng xuất",
                    danger: true,
                    onClick: handleLogout,
                  },
                ]}
              />
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      {/* Footer - Student Style */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About */}
            <div>
              <div className="mb-4">
                <img
                  src="/images/Logo_FPT_Education.png"
                  alt="FPT Education"
                  className="h-10 w-auto mb-2"
                />
              </div>
              <p className="text-gray-400 text-sm">
                Hệ thống hỏi đáp AI thông minh dành cho sinh viên FPT
                University. Giải đáp mọi thắc mắc về học vụ, sinh hoạt và hoạt
                động tại trường.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-4">Liên kết nhanh</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => navigate("/qa")}
                    className="text-gray-400 hover:text-orange-500 transition"
                  >
                    Hỏi đáp AI
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/handbook")}
                    className="text-gray-400 hover:text-orange-500 transition"
                  >
                    Sổ tay sinh viên
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/clubs")}
                    className="text-gray-400 hover:text-orange-500 transition"
                  >
                    Câu lạc bộ
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/student/history")}
                    className="text-gray-400 hover:text-orange-500 transition"
                  >
                    Lịch sử hỏi đáp
                  </button>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-bold mb-4">Hỗ trợ</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition"
                  >
                    Hướng dẫn sử dụng
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition"
                  >
                    Câu hỏi thường gặp
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition"
                  >
                    Liên hệ hỗ trợ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition"
                  >
                    Báo cáo lỗi
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold mb-4">Liên hệ</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>📧 support@fpt.edu.vn</li>
                <li>📞 (024) 7300 1866</li>
                <li>📍 Khu Công nghệ cao Hòa Lạc</li>
                <li>🕐 8:00 - 17:00 (Thứ 2 - Thứ 6)</li>
              </ul>
              <div className="flex gap-3 mt-4">
                <a
                  href="#"
                  className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition"
                >
                  <span className="text-sm">f</span>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition"
                >
                  <span className="text-sm">in</span>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition"
                >
                  <span className="text-sm">yt</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2024 FPT University. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-orange-500 transition">
                Chính sách bảo mật
              </a>
              <a href="#" className="hover:text-orange-500 transition">
                Điều khoản sử dụng
              </a>
              <a href="#" className="hover:text-orange-500 transition">
                Quy chế
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StudentLayout;
