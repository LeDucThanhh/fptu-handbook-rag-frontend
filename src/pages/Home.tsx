import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AutoSlider from "../components/AutoSlider";
import { useGlareEffect } from "../hooks/useGlareEffect";

// Notice Board Component
const NoticeBoard: React.FC = () => {
  const noticeBoardGlare = useGlareEffect();

  const notices = [
    {
      date: "15/10",
      title: "Tuần lễ định hướng tân sinh viên",
      icon: "🎓",
      category: "Học vụ",
    },
    {
      date: "20/10",
      title: "Ngày hội Câu lạc bộ 2024",
      icon: "🎉",
      category: "Sự kiện",
    },
    {
      date: "25/10",
      title: "Giải đấu E-Sports FPT Arena",
      icon: "🎮",
      category: "Thể thao",
    },
    {
      date: "28/10",
      title: "Workshop AI & Machine Learning",
      icon: "🤖",
      category: "Công nghệ",
    },
    {
      date: "30/10",
      title: "Ngày hội việc làm FPTU",
      icon: "💼",
      category: "Sự kiện",
    },
  ];

  return (
    <div
      ref={noticeBoardGlare}
      className="glare-effect bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border border-orange-100/50 h-full"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-3 rounded-xl shadow-md">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Bảng thông báo</h3>
          <p className="text-sm text-gray-500">Cập nhật mới nhất</p>
        </div>
      </div>

      <div className="space-y-3">
        {notices.map((notice, index) => (
          <div
            key={index}
            className="group bg-gradient-to-r from-orange-50 to-white p-4 rounded-xl border border-orange-100 hover:border-orange-300 hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="bg-gradient-to-br from-orange-400 to-orange-600 text-white w-14 h-14 rounded-xl flex flex-col items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xs font-semibold">
                    {notice.date.split("/")[0]}
                  </span>
                  <span className="text-lg font-bold">
                    {notice.date.split("/")[1]}
                  </span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{notice.icon}</span>
                  <span className="px-2 py-1 bg-orange-100 text-orange-600 text-xs font-semibold rounded-full">
                    {notice.category}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                  {notice.title}
                </h4>
              </div>
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transform group-hover:translate-x-1 transition-all duration-300"
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Club Activities Component
const ClubActivities: React.FC = () => {
  const clubs = [
    {
      name: "CLB Bóng đá FPTU",
      img: "/api/placeholder/400/300",
      members: "150+ thành viên",
      category: "Thể thao",
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "CLB Coder Club",
      img: "/api/placeholder/400/300",
      members: "200+ thành viên",
      category: "Công nghệ",
      color: "from-purple-500 to-purple-600",
    },
    {
      name: "CLB Novy",
      img: "/api/placeholder/400/300",
      members: "180+ thành viên",
      category: "Tình nguyện",
      color: "from-green-500 to-green-600",
    },
  ];

  return (
    <div className="space-y-4">
      {clubs.map((club, index) => {
        const ClubCard = () => {
          const clubGlare = useGlareEffect();

          return (
            <div
              ref={clubGlare}
              className="glare-card bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-orange-100/50"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={club.img}
                  alt={club.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 bg-gradient-to-r ${club.color} text-white text-xs font-semibold rounded-full shadow-lg`}
                  >
                    {club.category}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-end justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-xl text-white mb-1 group-hover:text-orange-200 transition-colors duration-300">
                        {club.name}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-200 text-sm">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                        </svg>
                        <span>{club.members}</span>
                      </div>
                    </div>
                    <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-300">
                      Tìm hiểu
                    </button>
                  </div>
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              </div>
            </div>
          );
        };

        return <ClubCard key={index} />;
      })}
    </div>
  );
};

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const heroCardGlare = useGlareEffect();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/qa?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 via-orange-25 to-white py-16 md:py-24 relative overflow-hidden">
        {/* Beautiful Static Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-orange-200/40 via-orange-100/30 to-transparent rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-orange-200/40 via-orange-100/30 to-transparent rounded-full -ml-40 -mb-40 blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-gradient-to-r from-orange-100/20 to-yellow-100/20 rounded-full blur-3xl"></div>
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
                <div
                  ref={heroCardGlare}
                  className="glare-effect-orange relative bg-white rounded-3xl shadow-2xl overflow-hidden transform rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-500"
                >
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

      {/* Điểm nổi bật của FPTU - Horizontal Scrollable Gallery */}
      <section className="py-16 bg-white relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 animate-fadeInUp">
            Điểm nổi bật của FPTU
          </h2>

          {/* Auto Slider */}
          <AutoSlider
            items={[
              {
                image: "/images/Modern_facilities.jpeg",
                title: "Cơ sở vật chất hiện đại",
                desc: "Campus với trang thiết bị tiên tiến, phòng lab xịn xò",
              },
              {
                image: "/images/Quality_lecturers.png",
                title: "Giảng viên chất lượng",
                desc: "Đội ngũ giảng dạy giàu kinh nghiệm, nhiều thạc sĩ, tiến sĩ",
              },
              {
                image: "/images/International_environment.jpg",
                title: "Môi trường quốc tế",
                desc: "Cơ hội học tập và làm việc toàn cầu, exchange program",
              },
              {
                image: "/images/Diverse_programs.jpg",
                title: "Chương trình đa dạng",
                desc: "Nhiều ngành hot: IT, AI, Business, Digital Marketing",
              },
              {
                image: "/images/Business_Connection.jpg",
                title: "Kết nối doanh nghiệp",
                desc: "Thực tập tại Google, Microsoft, FPT, Viettel...",
              },
              {
                image: "/images/Modern_library.jpg",
                title: "Thư viện hiện đại",
                desc: "Không gian học tập yên tĩnh, sách báo phong phú",
              },
              {
                image: "/images/Attractive_scholarships.jpg",
                title: "Học bổng hấp dẫn",
                desc: "Nhiều suất học bổng toàn phần, bán phần cho SV giỏi",
              },
              {
                image: "/images/Comfortable_dormitory.jpg",
                title: "Ký túc xá tiện nghi",
                desc: "Phòng đôi, phòng đơn, đầy đủ tiện ích, an ninh 24/7",
              },
              {
                image: "/images/Startup_Incubator.jpg",
                title: "Hỗ trợ khởi nghiệp",
                desc: "FPT Ventures đầu tư dự án SV, ecosystem startup mạnh",
              },
              {
                image: "/images/Alumni_Network.jpg",
                title: "Mạng lưới Alumni",
                desc: "20.000+ cựu sinh viên làm việc tại big tech companies",
              },
            ]}
          />
        </div>
      </section>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Học vụ & Sự kiện nổi bật */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-white relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-100/30 to-transparent rounded-full -mr-48 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-orange-100/30 to-transparent rounded-full -ml-48 blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Học vụ & Sự kiện nổi bật
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Bảng thông báo - Enhanced */}
            <NoticeBoard />

            {/* Hoạt động CLB - Enhanced */}
            <ClubActivities />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
