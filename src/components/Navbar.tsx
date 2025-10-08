import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";

const Navbar: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [language, setLanguage] = useState<"VN" | "EN">("VN");

  return (
    <>
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <span className="font-bold text-xl text-orange-500">
                FPTU Handbook RAG
              </span>
            </Link>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                to="/"
                className="text-gray-700 hover:text-orange-500 transition"
              >
                Trang chủ
              </Link>
              <Link
                to="/clubs"
                className="text-gray-700 hover:text-orange-500 transition"
              >
                Câu lạc bộ
              </Link>
              <Link
                to="/handbook"
                className="text-gray-700 hover:text-orange-500 transition"
              >
                Sổ tay A-Z
              </Link>
              <Link
                to="/qa"
                className="text-gray-700 hover:text-orange-500 transition"
              >
                FAQ
              </Link>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition font-semibold"
              >
                Đăng nhập
              </button>
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
