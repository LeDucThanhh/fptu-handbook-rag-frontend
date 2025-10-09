import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StickyHeader: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const shouldShow = scrollTop > 100; // Show after 100px scroll
      const shouldAddBackground = scrollTop > 50; // Add background after 50px

      setIsVisible(shouldShow);
      setIsScrolled(shouldAddBackground);
    };

    // Throttle scroll events for performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, []);

  const navigationItems = [
    { label: "Hỏi đáp AI", path: "/qa", icon: "💬" },
    { label: "Cẩm nang", path: "/handbook", icon: "📚" },
    { label: "Câu lạc bộ", path: "/clubs", icon: "🎭" },
    { label: "FAQ", path: "/faq", icon: "❓" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      } ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-gray-900 text-lg">
                FPTU Handbook RAG
              </h1>
              <p className="text-xs text-gray-500 -mt-1">
                Trợ lý AI thông minh
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 font-medium text-sm"
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => navigate("/qa")}
              className="flex items-center gap-2 px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
            >
              <span>💬</span>
              <span className="text-sm font-medium">Hỏi AI</span>
            </button>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => navigate("/qa")}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <span>🚀</span>
              <span className="font-medium">Hỏi ngay</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default StickyHeader;
