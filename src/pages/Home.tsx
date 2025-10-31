import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/qa?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Sample questions for demo
  const sampleQuestions = [
    "Học bổng FPTU có những loại nào?",
    "Làm thế nào để đăng ký môn học?",
    "Lịch thi cuối kỳ khi nào?",
    "Cách tham gia câu lạc bộ?",
  ];

  const handleQuestionClick = (question: string) => {
    setSelectedQuestion(question);
    // Simulate AI response after 3 seconds
    setTimeout(() => {
      setSelectedQuestion(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/30 via-white to-orange-50/20 overflow-x-hidden">
      {/* 1. Hero Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fadeInLeft">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                CHÀO MỪNG TÂN SINH VIÊN
                <br />
                ĐẠI HỌC FPT!
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Khám phá FPTU và trải nghiệm FPTU Handbook RAG - Sổ tay hỏi đáp
                AI đồng hành cùng bạn.
              </p>

              {/* Search Box */}
              <form onSubmit={handleSearch} className="relative">
                <div className="flex items-center bg-white border-2 border-gray-300 rounded-full px-4 py-3 focus-within:border-orange-500 transition">
                  <svg
                    className="w-5 h-5 text-gray-400 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Hỏi ngay điều bạn cần biết về trường..."
                    className="flex-1 outline-none text-gray-700"
                  />
                  <button
                    type="submit"
                    className="bg-orange-500 text-white px-8 py-2 rounded-full hover:bg-orange-600 transition font-semibold ml-2"
                  >
                    Tìm kiếm
                  </button>
                </div>
              </form>
            </div>

            {/* Illustration */}
            <div className="flex justify-center animate-fadeInRight">
              <div className="relative">
                {/* Main Image Card */}
                <div className="glare-effect-orange relative bg-white rounded-3xl shadow-2xl overflow-hidden transform rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-500">
                  <div className="relative h-80 w-full">
                    <img
                      src="/images/Modern_facilities.jpeg"
                      alt="FPTU Campus"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                    {/* Overlay Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-orange-500 p-2 rounded-lg">
                          <svg
                            className="w-6 h-6"
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
                        <h3 className="text-2xl font-bold">AI Assistant</h3>
                      </div>
                      <p className="text-orange-200 mb-4">
                        Hỏi bất cứ điều gì về FPTU
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating Chat Bubbles */}
                <div
                  className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-lg p-4 max-w-xs animate-bounce"
                  style={{ animationDelay: "0.5s" }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">👨‍🎓</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">
                        "Làm thế nào để đăng ký môn học?"
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-gray-400">
                          Đang trả lời...
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-lg p-4 max-w-xs animate-bounce"
                  style={{ animationDelay: "1s" }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">⚽</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">
                        "Tôi muốn tham gia CLB bóng đá"
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-gray-400">
                          Đã trả lời
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Icons */}
                <div className="absolute top-4 right-4 bg-gradient-to-br from-orange-400 to-orange-500 p-3 rounded-xl shadow-lg transform rotate-12 hover:rotate-0 transition-transform duration-300">
                  <span className="text-white text-2xl">💡</span>
                </div>
                <div className="absolute bottom-4 left-4 bg-gradient-to-br from-blue-400 to-blue-500 p-3 rounded-xl shadow-lg transform -rotate-12 hover:rotate-0 transition-transform duration-300">
                  <span className="text-white text-2xl">🎓</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Quick Access / Feature Highlights */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Hỏi đáp AI */}
            <div
              onClick={() => navigate("/qa")}
              className="glare-card bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 cursor-pointer group border border-orange-200 hover:border-orange-300"
            >
              <div className="text-center">
                <div className="bg-orange-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 text-white"
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
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Hỏi đáp AI
                </h3>
                <p className="text-gray-600 text-sm">
                  Câu trả lời tức thì từ AI
                </p>
              </div>
            </div>

            {/* Cẩm nang số */}
            <div
              onClick={() => navigate("/handbook")}
              className="glare-card bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 cursor-pointer group border border-blue-200 hover:border-blue-300"
            >
              <div className="text-center">
                <div className="bg-blue-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 text-white"
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
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Cẩm nang số
                </h3>
                <p className="text-gray-600 text-sm">
                  Tra cứu quy định, thủ tục
                </p>
              </div>
            </div>

            {/* Câu lạc bộ */}
            <div
              onClick={() => navigate("/clubs")}
              className="glare-card bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 cursor-pointer group border border-green-200 hover:border-green-300"
            >
              <div className="text-center">
                <div className="bg-green-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Câu lạc bộ
                </h3>
                <p className="text-gray-600 text-sm">Khám phá 50+ CLB</p>
              </div>
            </div>

            {/* Sự kiện */}
            <div
              onClick={() => navigate("/faq")}
              className="glare-card bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 cursor-pointer group border border-purple-200 hover:border-purple-300"
            >
              <div className="text-center">
                <div className="bg-purple-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">FAQ</h3>
                <p className="text-gray-600 text-sm">Câu hỏi thường gặp</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Demo AI Q&A Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50/30 to-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trải nghiệm AI Assistant ngay
            </h2>
            <p className="text-gray-600 text-lg">
              Thử hỏi những câu hỏi phổ biến dưới đây
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Left: Sample Questions */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Câu hỏi thường gặp:
              </h3>
              {sampleQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuestionClick(question)}
                  className="w-full text-left p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-orange-300 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                      <span className="text-orange-600 text-sm">💬</span>
                    </div>
                    <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                      {question}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Right: Mini Chat Preview */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-white">🤖</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">FPTU AI Assistant</h4>
                  <p className="text-sm text-green-600">● Sẵn sàng hỗ trợ</p>
                </div>
              </div>

              <div className="space-y-4 h-64 overflow-y-auto">
                {selectedQuestion ? (
                  <>
                    {/* User Question */}
                    <div className="flex justify-end">
                      <div className="bg-orange-500 text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-xs">
                        {selectedQuestion}
                      </div>
                    </div>
                    {/* AI Response */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm">🤖</span>
                      </div>
                      <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 max-w-xs">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                          <span className="text-gray-600 text-sm">
                            Đang suy nghĩ...
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <span className="text-4xl mb-4 block">💭</span>
                    <p>Chọn một câu hỏi để xem demo</p>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t text-center">
                <button
                  onClick={() => navigate("/qa")}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Trải nghiệm đầy đủ →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. News & Events Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-bl from-blue-200/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-gradient-to-tr from-blue-200/20 to-transparent rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-5 gap-8 max-w-7xl mx-auto">
            {/* Left: Events (40%) */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Sự kiện sắp tới
              </h2>
              <div className="space-y-4">
                {/* Event Item */}
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="bg-orange-500 text-white px-3 py-2 rounded-lg text-sm font-bold">
                      <div>15</div>
                      <div className="text-xs">THG 10</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Tech Talk: AI trong Giáo dục
                      </h3>
                      <p className="text-sm text-gray-600">
                        Hội trường A - 14:00
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm font-bold">
                      <div>18</div>
                      <div className="text-xs">THG 10</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Ngày hội Tuyển dụng
                      </h3>
                      <p className="text-sm text-gray-600">
                        Sân vận động - 9:00
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-bold">
                      <div>22</div>
                      <div className="text-xs">THG 10</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Workshop Khởi nghiệp
                      </h3>
                      <p className="text-sm text-gray-600">Phòng 401 - 16:00</p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate("/faq")}
                className="mt-6 text-orange-600 hover:text-orange-700 font-semibold text-sm flex items-center gap-2 group"
              >
                <span>Xem lịch đầy đủ</span>
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
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>

            {/* Right: Featured News (60%) */}
            <div className="md:col-span-3">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Tin tức & Thông báo nổi bật
              </h2>

              {/* Featured News Card */}
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 mb-6">
                <div className="relative h-48">
                  <img
                    src="/images/Modern_facilities.jpeg"
                    alt="Featured News"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium mb-3 inline-block">
                      Thông báo quan trọng
                    </span>
                    <h3 className="text-xl font-bold mb-2">
                      Hướng dẫn sử dụng FPTU Handbook RAG
                    </h3>
                    <p className="text-orange-100 text-sm">
                      Khám phá cách sử dụng hệ thống AI để tìm kiếm thông tin
                      học vụ nhanh chóng và chính xác.
                    </p>
                  </div>
                </div>
              </div>

              {/* News List */}
              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex-shrink-0"></div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Cập nhật lịch thi giữa kỳ học kỳ Fall 2024
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Thông báo về việc điều chỉnh lịch thi và phòng thi cho
                        các môn học...
                      </p>
                      <span className="text-xs text-gray-500">
                        2 ngày trước
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-green-100 rounded-lg flex-shrink-0"></div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Mở đăng ký học bổng xuất sắc kỳ Spring 2025
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Sinh viên có GPA từ 3.2 trở lên có thể đăng ký học
                        bổng...
                      </p>
                      <span className="text-xs text-gray-500">
                        5 ngày trước
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate("/faq")}
                className="mt-6 text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-2 group"
              >
                <span>Xem tất cả tin tức</span>
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
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Clubs Introduction */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-100/30 to-transparent rounded-full -mr-48 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-orange-100/30 to-transparent rounded-full -ml-48 blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tìm Cộng Đồng Của Bạn - 50+ Câu Lạc Bộ
            </h2>
            <p className="text-gray-600 text-lg">
              Khám phá và tham gia các câu lạc bộ sinh viên sôi động tại FPTU
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

      {/* 6. How It Works Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Cách hoạt động của hệ thống
            </h2>
            <p className="text-gray-600 text-lg">
              3 bước đơn giản để nhận được câu trả lời chính xác
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Step 1 */}
            <div className="text-center group">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                1. Đặt câu hỏi
              </h3>
              <p className="text-gray-600">
                Nhập câu hỏi của bạn bằng ngôn ngữ tự nhiên
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center group">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                2. AI tìm kiếm & phân tích
              </h3>
              <p className="text-gray-600">
                Hệ thống AI tìm kiếm thông tin trong cơ sở dữ liệu
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center group">
              <div className="bg-gradient-to-r from-green-500 to-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-10 h-10 text-white"
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
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                3. Nhận câu trả lời
              </h3>
              <p className="text-gray-600">
                Có được câu trả lời chính xác và đầy đủ trong tích tắc
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Statistics Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50/50 to-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">
                10,000+
              </div>
              <p className="text-gray-600">Câu hỏi đã trả lời</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <p className="text-gray-600">Câu lạc bộ</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">99%</div>
              <p className="text-gray-600">Độ chính xác</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                24/7
              </div>
              <p className="text-gray-600">Sẵn sàng hỗ trợ</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/90 to-orange-600/90"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Sẵn sàng khám phá FPTU?
            </h2>
            <p className="text-xl text-orange-100 mb-10">
              Bắt đầu hành trình học tập thú vị tại FPT University cùng với trợ
              lý AI thông minh
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/qa")}
                className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Bắt đầu hỏi AI ngay
              </button>
              <button
                onClick={() => navigate("/handbook")}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-orange-600 transition-all duration-300"
              >
                Xem cẩm nang
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
