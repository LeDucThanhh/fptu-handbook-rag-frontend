import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Calendar, Bell, ArrowRight, Sparkles } from "lucide-react";
import { DESIGN_TOKENS, BUTTON_VARIANTS } from "@/design-system/tokens";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/qa?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Popular questions
  const popularQuestions = [
    "Học phí kỳ này bao nhiêu?",
    "Làm sao để đăng ký ký túc xá?",
    "Điều kiện xét học bổng?",
    "Lịch thi cuối kỳ ra chưa?",
  ];

  // Recent notifications
  const recentNotifications = [
    {
      title: "Lịch đăng ký môn học kỳ Fall 2024",
      date: "12 Thg 10",
      type: "Học vụ",
      priority: "high",
    },
    {
      title: "Mở đăng ký học bổng tân sinh viên",
      date: "15 Thg 10",
      type: "Tài chính",
      priority: "medium",
    },
    {
      title: "Hướng dẫn sử dụng FPTU Handbook RAG",
      date: "09 Thg 10",
      type: "Hướng dẫn",
      priority: "medium",
    },
  ];

  // Upcoming events timeline
  const upcomingEvents = [
    {
      title: "Orientation Day 2024",
      date: "12",
      month: "Oct",
      time: "08:00 - 12:00",
      location: "Hội trường A",
      color: "blue",
    },
    {
      title: "Tech Talk: AI in Education",
      date: "15",
      month: "Oct",
      time: "14:00 - 16:00",
      location: "Phòng B201",
      color: "orange",
    },
    {
      title: "Ngày hội Câu lạc bộ",
      date: "18",
      month: "Oct",
      time: "09:00 - 17:00",
      location: "Toàn campus",
      color: "green",
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section - Full Viewport */}
      <section className="min-h-screen relative overflow-hidden flex items-center justify-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/bg_fpt.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundAttachment: "fixed",
          }}
        ></div>

        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/70"></div>

        {/* Animated Orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-orange-400/20 via-orange-300/10 to-transparent rounded-full -mr-64 -mt-64 blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-orange-400/20 via-orange-300/10 to-transparent rounded-full -ml-48 -mb-48 blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>

        {/* Hero Content - Enhanced Layout */}
        <div className="relative z-10 w-full h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content - Đẩy về phải */}
              <div className="text-center lg:text-left lg:ml-8 xl:ml-16">
                {/* Main Heading */}
                <h1
                  className={`${DESIGN_TOKENS.typography.heading1} text-white mb-6 animate-fadeInUp`}
                  style={{
                    animationDelay: "0.1s",
                    textShadow:
                      "0 4px 20px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.2)",
                  }}
                >
                  Chào mừng bạn
                  <br />
                  <span className="whitespace-nowrap">
                    đến với{" "}
                    <span className="bg-gradient-to-r from-orange-300 to-orange-400 bg-clip-text text-transparent drop-shadow-md">
                      Đại học FPT
                    </span>
                  </span>
                </h1>

                <p
                  className={`${DESIGN_TOKENS.typography.bodyLarge} text-white/95 mb-8 animate-fadeInUp`}
                  style={{
                    animationDelay: "0.2s",
                    textShadow: "0 2px 12px rgba(0,0,0,0.3)",
                  }}
                >
                  Trợ lý AI sẵn sàng giải đáp mọi thắc mắc cho khởi đầu mới của
                  bạn.
                </p>

                {/* Liquid Glass Search Bar */}
                <form
                  onSubmit={handleSearch}
                  className="mb-8 animate-fadeInUp"
                  style={{ animationDelay: "0.3s" }}
                >
                  <div className="group relative">
                    {/* Glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-all duration-500 animate-pulse"></div>

                    {/* Glass container */}
                    <div className="relative backdrop-blur-xl bg-white/10 border-2 border-white/20 rounded-2xl p-2 shadow-2xl overflow-hidden">
                      {/* Liquid shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                      <div className="relative flex items-center">
                        <div className="flex items-center px-4">
                          <Search className="w-6 h-6 text-orange-300" />
                        </div>
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Hỏi về học bổng, ký túc xá, lịch học, quy chế..."
                          className="flex-1 outline-none text-white placeholder-white/60 text-lg py-4 px-2 bg-transparent font-medium"
                          style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                        />
                        <button
                          type="submit"
                          className={`${BUTTON_VARIANTS.primary} px-8 py-4 flex items-center gap-2 relative overflow-hidden group/btn`}
                          style={{
                            backgroundSize: "200% 100%",
                          }}
                        >
                          <span className="relative z-10">Hỏi ngay!</span>
                          <ArrowRight className="w-5 h-5 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                          {/* Shimmer effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                        </button>
                      </div>
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

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full p-1">
            <div className="w-1 h-3 bg-white/60 rounded-full mx-auto animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Popular Questions Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100/20 rounded-full -mr-48 blur-3xl"></div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Câu hỏi phổ biến</span>
            </div>
            <h2
              className={`${DESIGN_TOKENS.typography.heading2} ${DESIGN_TOKENS.colors.text.primary} mb-4`}
            >
              Sinh viên thường hỏi gì?
            </h2>
            <p
              className={`${DESIGN_TOKENS.typography.body} ${DESIGN_TOKENS.colors.text.secondary} max-w-2xl mx-auto`}
            >
              Khám phá những câu hỏi phổ biến hoặc đặt câu hỏi riêng của bạn
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {popularQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => {
                  setSearchQuery(question);
                  navigate(`/qa?q=${encodeURIComponent(question)}`);
                }}
                className="group relative bg-white border-2 border-gray-200 hover:border-orange-400 rounded-2xl p-6 text-left transition-all hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                <div className="relative flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Search className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                      {question}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Updates Timeline Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-100/20 rounded-full -ml-48 blur-3xl"></div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Notifications */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Bell className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2
                    className={`${DESIGN_TOKENS.typography.heading3} ${DESIGN_TOKENS.colors.text.primary}`}
                  >
                    Thông báo
                  </h2>
                  <p
                    className={`${DESIGN_TOKENS.typography.caption} ${DESIGN_TOKENS.colors.text.secondary}`}
                  >
                    Cập nhật mới nhất từ nhà trường
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {recentNotifications.map((notif, index) => (
                  <div
                    key={index}
                    className="group relative bg-gradient-to-r from-white to-gray-50 border-l-4 border-l-orange-500 rounded-xl p-5 hover:shadow-xl transition-all cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`px-3 py-2 rounded-lg text-sm font-bold flex-shrink-0 ${
                          notif.priority === "high"
                            ? "bg-red-100 text-red-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        <div>{notif.date}</div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                          {notif.title}
                        </h4>
                        <span className="text-xs px-3 py-1 bg-orange-100 text-orange-700 rounded-full font-semibold">
                          {notif.type}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate("/notifications")}
                className="mt-6 w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                Xem tất cả thông báo
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Right: Events Timeline */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2
                    className={`${DESIGN_TOKENS.typography.heading3} ${DESIGN_TOKENS.colors.text.primary}`}
                  >
                    Sự kiện sắp tới
                  </h2>
                  <p
                    className={`${DESIGN_TOKENS.typography.caption} ${DESIGN_TOKENS.colors.text.secondary}`}
                  >
                    Đừng bỏ lỡ những sự kiện quan trọng
                  </p>
                </div>
              </div>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-orange-500 to-green-500"></div>

                <div className="space-y-6">
                  {upcomingEvents.map((event, index) => (
                    <div
                      key={index}
                      className="relative flex items-start gap-6"
                    >
                      {/* Date badge */}
                      <div
                        className={`w-16 h-16 bg-gradient-to-br from-${event.color}-500 to-${event.color}-600 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg flex-shrink-0 z-10`}
                      >
                        <span className="text-xl font-bold">{event.date}</span>
                        <span className="text-xs">{event.month}</span>
                      </div>

                      {/* Event card */}
                      <div className="flex-1 bg-white border-2 border-gray-200 rounded-xl p-5 hover:border-orange-400 hover:shadow-xl transition-all cursor-pointer group">
                        <h4 className="font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                          {event.title}
                        </h4>
                        <div className="flex flex-col gap-1 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>📍</span>
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clubs CTA Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-white to-orange-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-200/30 to-transparent rounded-full -mr-48 -mt-48 blur-3xl"></div>

        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full -ml-24 -mb-24"></div>
            </div>

            <div className="relative text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <span>🎯</span>
                <span>Tìm cộng đồng của bạn</span>
              </div>

              <h2 className={`${DESIGN_TOKENS.typography.heading2} mb-4`}>
                Hơn 50+ Câu lạc bộ đang chờ đón bạn
              </h2>
              <p
                className={`${DESIGN_TOKENS.typography.bodyLarge} text-orange-100 mb-8 max-w-2xl mx-auto`}
              >
                Khám phá sở thích, phát triển kỹ năng và kết nối với những người
                bạn mới
              </p>

              {/* Club icons preview */}
              <div className="flex justify-center gap-3 mb-8 flex-wrap">
                {["💻", "⚽", "🎵", "💃", "💼", "📸", "🎨", "🎭"].map(
                  (icon, i) => (
                    <div
                      key={i}
                      className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-2xl hover:bg-white/30 hover:scale-110 transition-all cursor-pointer"
                    >
                      {icon}
                    </div>
                  )
                )}
              </div>

              <button
                onClick={() => navigate("/clubs")}
                className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold hover:bg-orange-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 inline-flex items-center gap-2"
              >
                Khám phá tất cả CLB
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-orange-100/30 to-transparent rounded-full -ml-48 -mb-48 blur-3xl"></div>

        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <span>🎓</span>
              <span>Hành trình của bạn bắt đầu từ đây</span>
            </div>

            <h2
              className={`${DESIGN_TOKENS.typography.heading1} ${DESIGN_TOKENS.colors.text.primary} mb-4`}
            >
              Sẵn sàng khám phá{" "}
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                FPTU
              </span>
              ?
            </h2>
            <p
              className={`${DESIGN_TOKENS.typography.bodyLarge} ${DESIGN_TOKENS.colors.text.secondary} mb-8 max-w-2xl mx-auto`}
            >
              Để trợ lý AI đồng hành cùng bạn trong hành trình học tập tại FPT
              University
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => navigate("/qa")}
                className={`${BUTTON_VARIANTS.primary} group px-8 py-4 flex items-center justify-center gap-2`}
              >
                <Search className="w-5 h-5" />
                <span>Bắt đầu hỏi AI ngay</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigate("/handbook")}
                className={`${BUTTON_VARIANTS.secondary} px-8 py-4 flex items-center justify-center gap-2`}
              >
                <span>📖</span>
                <span>Xem cẩm nang</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="text-orange-500">✓</span>
                <span>24/7 Hỗ trợ</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-orange-500">✓</span>
                <span>10,000+ Câu hỏi đã giải đáp</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-orange-500">✓</span>
                <span>99% Độ chính xác</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
