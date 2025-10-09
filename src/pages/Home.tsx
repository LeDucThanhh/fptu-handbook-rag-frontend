import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/qa?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section - Full Viewport với Background FPT */}
      <section className="h-screen relative overflow-hidden flex items-center justify-center">
        {/* Background Image - Cắt vừa khung hình */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/bg_fpt.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundAttachment: "fixed",
          }}
        ></div>

        {/* Enhanced Gradient Overlay - Mờ hơn */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/60"></div>

        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-orange-300/15 via-orange-200/10 to-transparent rounded-full -mr-64 -mt-64 blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-300/15 via-blue-200/10 to-transparent rounded-full -ml-48 -mb-48 blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-orange-200/10 to-yellow-200/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Floating Particles Effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-1/4 left-1/4 w-2 h-2 bg-orange-400/60 rounded-full animate-bounce"
            style={{ animationDelay: "0s", animationDuration: "3s" }}
          ></div>
          <div
            className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/80 rounded-full animate-bounce"
            style={{ animationDelay: "1s", animationDuration: "4s" }}
          ></div>
          <div
            className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-orange-300/70 rounded-full animate-bounce"
            style={{ animationDelay: "2s", animationDuration: "3.5s" }}
          ></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-white/60 rounded-full animate-bounce"
            style={{ animationDelay: "0.5s", animationDuration: "4.5s" }}
          ></div>
        </div>

        {/* Hero Content - Enhanced Layout */}
        <div className="relative z-10 w-full h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content - Đẩy về phải */}
              <div className="text-center lg:text-left lg:ml-8 xl:ml-16">
                {/* Main Heading */}
                <h1
                  className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fadeInUp"
                  style={{
                    animationDelay: "0.1s",
                    fontFamily: "Inter, system-ui, sans-serif",
                    textShadow:
                      "0 4px 20px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.2)",
                  }}
                >
                  Chào mừng bạn đến với{" "}
                  <span className="bg-gradient-to-r from-orange-300 to-orange-400 bg-clip-text text-transparent drop-shadow-md">
                    Đại học FPT
                  </span>
                </h1>

                <p
                  className="text-lg md:text-xl text-white/95 mb-8 leading-relaxed animate-fadeInUp"
                  style={{
                    animationDelay: "0.2s",
                    textShadow: "0 2px 12px rgba(0,0,0,0.3)",
                  }}
                >
                  Trợ lý AI sẵn sàng giải đáp mọi thắc mắc cho khởi đầu mới của
                  bạn.
                </p>

                {/* Search Bar - Đồng bộ với text */}
                <form
                  onSubmit={handleSearch}
                  className="mb-8 animate-fadeInUp"
                  style={{ animationDelay: "0.3s" }}
                >
                  <div className="group relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-400/30 via-orange-300/20 to-orange-500/30 rounded-2xl blur-md opacity-60 group-hover:opacity-80 transition-all duration-300"></div>
                    <div className="relative flex items-center bg-white/90 backdrop-blur-md rounded-xl p-2 shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-300">
                      <div className="flex items-center px-3">
                        <svg
                          className="w-5 h-5 text-orange-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Hỏi về học bổng, ký túc xá, lịch học, quy chế..."
                        className="flex-1 outline-none text-gray-700 text-base py-3 px-2 bg-transparent"
                        style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                      />
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:scale-105 flex items-center gap-2 relative overflow-hidden group"
                        style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <span>Hỏi ngay!</span>
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
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Right Content - Empty for now */}
              <div className="hidden lg:block">
                {/* Có thể thêm visual elements sau này */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tin tức & Sự kiện - Enhanced */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-orange-100/20 to-transparent rounded-full -mr-36 -mt-36 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-blue-100/20 to-transparent rounded-full -ml-36 -mb-36 blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <span>✨</span>
              <span>Cập nhật mới nhất</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tin tức & Sự kiện
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Theo dõi thông tin mới nhất về học vụ, sự kiện và hoạt động tại
              FPT University
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Thông báo */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-orange-500">📢</span>
                Thông báo
              </h3>
              <div className="space-y-4">
                <div className="glare-card bg-gradient-to-r from-orange-50 to-orange-100 p-5 rounded-xl border border-orange-200 hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-500 text-white px-3 py-2 rounded-lg text-sm font-bold flex-shrink-0">
                      <div>09</div>
                      <div className="text-xs">THG 10</div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-2">
                        Hướng dẫn sử dụng FPTU Handbook RAG
                      </h4>
                      <p className="text-sm text-gray-600">
                        Tân sinh viên nên tìm hiểu cách sử dụng hệ thống hỏi đáp
                        AI...
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glare-card bg-white p-5 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm font-bold flex-shrink-0">
                      <div>12</div>
                      <div className="text-xs">THG 10</div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-2">
                        Lịch đăng ký môn học kỳ Fall 2024
                      </h4>
                      <p className="text-sm text-gray-600">
                        Sinh viên năm nhất đăng ký môn học từ 12/10 đến 15/10...
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glare-card bg-white p-5 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-bold flex-shrink-0">
                      <div>15</div>
                      <div className="text-xs">THG 10</div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-2">
                        Mở đăng ký học bổng tân sinh viên
                      </h4>
                      <p className="text-sm text-gray-600">
                        Học bổng dành cho tân sinh viên có thành tích học tập
                        xuất sắc...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sự kiện */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-blue-500">📅</span>
                Sự kiện
              </h3>
              <div className="space-y-4">
                <div className="glare-card bg-gradient-to-r from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      🎓
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900">
                        Orientation Day 2024
                      </h4>
                      <p className="text-sm text-blue-600">
                        Thứ 7, 12/10/2024 - 8:00 AM
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Chào mừng tân sinh viên K19. Giới thiệu về trường, ngành
                    học...
                  </p>
                </div>

                <div className="glare-card bg-white p-5 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="bg-orange-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      💼
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900">
                        Tech Talk: AI in Education
                      </h4>
                      <p className="text-sm text-orange-600">
                        Thứ 3, 15/10/2024 - 2:00 PM
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Hội thảo về ứng dụng AI trong giáo dục và nghề nghiệp tương
                    lai.
                  </p>
                </div>

                <div className="glare-card bg-white p-5 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      ⚽
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900">
                        Ngày hội Câu lạc bộ
                      </h4>
                      <p className="text-sm text-green-600">
                        Thứ 6, 18/10/2024 - 9:00 AM
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Giới thiệu và tuyển thành viên mới cho 50+ câu lạc bộ sinh
                    viên.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clubs Introduction - Enhanced */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-100/20 to-transparent rounded-full -mr-48 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-orange-100/20 to-transparent rounded-full -ml-48 blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <span>🎯</span>
              <span>Tham gia ngay</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tìm Cộng Đồng Của Bạn
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Hơn 50+ câu lạc bộ đang chờ đón bạn. Khám phá sở thích, phát triển
              kỹ năng và kết nối với những người bạn mới
            </p>
          </div>

          {/* Club Preview Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {[
              {
                name: "FPTU Code",
                icon: "💻",
                color: "from-blue-500 to-blue-600",
              },
              {
                name: "FPTU Football",
                icon: "⚽",
                color: "from-green-500 to-green-600",
              },
              {
                name: "FPTU Music",
                icon: "🎵",
                color: "from-purple-500 to-purple-600",
              },
              {
                name: "FPTU Dance",
                icon: "💃",
                color: "from-pink-500 to-pink-600",
              },
              {
                name: "FPTU Business",
                icon: "💼",
                color: "from-orange-500 to-orange-600",
              },
              {
                name: "FPTU Photo",
                icon: "📸",
                color: "from-yellow-500 to-yellow-600",
              },
            ].map((club, index) => (
              <div
                key={index}
                className="glare-card bg-white rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-200 hover:border-orange-300"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${club.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <span className="text-2xl">{club.icon}</span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm">{club.name}</h3>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate("/clubs")}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Khám phá tất cả CLB →
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA Section - Professional White Design */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Subtle Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-100/30 to-transparent rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-orange-100/30 to-transparent rounded-full -ml-48 -mb-48 blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Content Card */}
            <div className="bg-gradient-to-br from-orange-50 to-white rounded-3xl p-12 border-2 border-orange-100 shadow-xl">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <span>🎓</span>
                  <span>Hành trình của bạn bắt đầu từ đây</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Sẵn sàng khám phá FPTU?
                </h2>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  Để trợ lý AI đồng hành cùng bạn trong hành trình học tập tại
                  FPT University
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <button
                    onClick={() => navigate("/qa")}
                    className="group bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <span>Bắt đầu hỏi AI ngay</span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={() => navigate("/handbook")}
                    className="bg-white text-orange-600 border-2 border-orange-500 px-8 py-4 rounded-xl font-semibold hover:bg-orange-50 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                    <span>Xem cẩm nang</span>
                  </button>
                </div>

                {/* Trust Indicators - Compact */}
                <div className="flex flex-wrap justify-center gap-8 pt-8 border-t border-orange-200">
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-orange-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-bold text-gray-900">
                        10,000+
                      </div>
                      <div className="text-xs text-gray-500">
                        Sinh viên tin dùng
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-orange-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-bold text-gray-900">
                        24/7
                      </div>
                      <div className="text-xs text-gray-500">
                        Hỗ trợ nhanh chóng
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-orange-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-bold text-gray-900">99%</div>
                      <div className="text-xs text-gray-500">Độ chính xác</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
