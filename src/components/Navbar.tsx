import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import { ChevronDown } from "lucide-react";

const Navbar: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [language, setLanguage] = useState<"VN" | "EN">("VN");
  const [isHandbookDropdownOpen, setIsHandbookDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsHandbookDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="bg-background border-b border-border sticky top-0 z-50 shadow-soft">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left side: Logo only */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-xl blur opacity-0 group-hover:opacity-30 transition-all duration-300"></div>
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
                  className="text-foreground hover:text-primary transition-colors duration-200"
                >
                  Câu lạc bộ
                </Link>

                {/* Handbook Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsHandbookDropdownOpen(!isHandbookDropdownOpen)}
                    className="flex items-center gap-1 text-foreground hover:text-primary transition-colors duration-200"
                  >
                    Sổ tay A-Z
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {isHandbookDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-card rounded-lg shadow-medium border border-border py-2 z-50">
                      <Link
                        to="/handbook"
                        className="block px-4 py-2 text-card-foreground hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                        onClick={() => setIsHandbookDropdownOpen(false)}
                      >
                        Tổng quan
                      </Link>
                      <Link
                        to="/handbook/introduction"
                        className="block px-4 py-2 text-card-foreground hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                        onClick={() => setIsHandbookDropdownOpen(false)}
                      >
                        Giới thiệu chung
                      </Link>
                      <Link
                        to="/handbook/admission"
                        className="block px-4 py-2 text-card-foreground hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                        onClick={() => setIsHandbookDropdownOpen(false)}
                      >
                        Quy chế tuyển sinh
                      </Link>
                      <Link
                        to="/handbook/tuition"
                        className="block px-4 py-2 text-card-foreground hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                        onClick={() => setIsHandbookDropdownOpen(false)}
                      >
                        Học phí & Học bổng
                      </Link>
                    </div>
                  )}
                </div>

                <Link
                  to="/faq"
                  className="text-foreground hover:text-primary transition-colors duration-200"
                >
                  FAQ
                </Link>
                <Link
                  to="/qa"
                  className="text-foreground hover:text-primary transition-colors duration-200"
                >
                  Hỏi đáp AI
                </Link>
              </div>

              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors duration-200 font-semibold shadow-soft"
              >
                Đăng nhập
              </button>

              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <button
                  onClick={() => setLanguage("VN")}
                  className={`${language === "VN"
                    ? "text-primary font-semibold"
                    : "hover:text-primary"
                    } transition-colors duration-200`}
                >
                  VN
                </button>
                <span>/</span>
                <button
                  onClick={() => setLanguage("EN")}
                  className={`${language === "EN"
                    ? "text-primary font-semibold"
                    : "hover:text-primary"
                    } transition-colors duration-200`}
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
