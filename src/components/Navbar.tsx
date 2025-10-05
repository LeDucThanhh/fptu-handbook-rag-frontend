import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-500 rounded flex items-center justify-center text-white font-bold">
              F
            </div>
            <span className="font-bold text-lg">FPTU Handbook</span>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-orange-500">
              Trang chủ
            </Link>
            <Link to="/qa" className="text-gray-700 hover:text-orange-500">
              Hỏi đáp
            </Link>
            <Link to="/clubs" className="text-gray-700 hover:text-orange-500">
              Câu lạc bộ
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
