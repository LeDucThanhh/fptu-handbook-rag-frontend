import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel, Timeline, Card, Badge, Button, Row, Col } from "antd";
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const StudentHome: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/qa?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="bg-white overflow-x-hidden">
      {/* Hero Section - Full Viewport với Background FPT */}
      <section className="h-screen relative overflow-hidden flex items-center justify-center">
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

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/60"></div>

        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-orange-300/15 via-orange-200/10 to-transparent rounded-full -mr-64 -mt-64 blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-300/15 via-blue-200/10 to-transparent rounded-full -ml-48 -mb-48 blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        {/* Hero Content */}
        <div className="relative z-10 w-full h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left lg:ml-8 xl:ml-16">
                <h1
                  className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fadeInUp"
                  style={{
                    animationDelay: "0.1s",
                    fontFamily: "Inter, system-ui, sans-serif",
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
                  className="text-lg md:text-xl lg:text-2xl text-white/90 mb-10 leading-relaxed animate-fadeInUp"
                  style={{
                    animationDelay: "0.2s",
                    textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                  }}
                >
                  Trợ lý AI sẵn sàng giải đáp mọi thắc mắc cho khởi đầu mới của
                  bạn.
                </p>

                {/* Search Bar */}
                <form
                  onSubmit={handleSearch}
                  className="animate-fadeInUp"
                  style={{ animationDelay: "0.3s" }}
                >
                  <div className="relative max-w-2xl mx-auto lg:mx-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400/30 to-orange-500/30 rounded-2xl blur-xl"></div>
                    <div className="relative bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/20">
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Hỏi AI bất cứ điều gì về FPTU..."
                          className="flex-1 px-6 py-5 text-gray-900 placeholder-gray-500 bg-transparent focus:outline-none text-base md:text-lg"
                        />
                        <button
                          type="submit"
                          className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-5 font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center gap-2 shadow-lg"
                        >
                          <span className="hidden sm:inline">Hỏi ngay</span>
                          <span className="text-xl">→</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <div className="hidden lg:block"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Tin tức & Sự kiện Section - Ant Design */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Tin tức & Sự kiện
            </h2>
            <p className="text-gray-600 text-lg">
              Cập nhật thông tin mới nhất từ FPTU
            </p>
          </div>

          <div className="max-w-7xl mx-auto space-y-16">
            {/* Tin tức - Carousel */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-bold text-gray-900">📰 Tin tức</h3>
                <Button
                  type="link"
                  onClick={() => navigate("/student/notifications")}
                  className="text-orange-600 hover:text-orange-700 font-semibold"
                >
                  Xem tất cả →
                </Button>
              </div>

              <Carousel
                autoplay
                autoplaySpeed={5000}
                dots={{ className: "custom-dots" }}
                slidesToShow={3}
                slidesToScroll={1}
                responsive={[
                  {
                    breakpoint: 1024,
                    settings: {
                      slidesToShow: 2,
                    },
                  },
                  {
                    breakpoint: 640,
                    settings: {
                      slidesToShow: 1,
                    },
                  },
                ]}
              >
                {[
                  {
                    category: "HỌC VỤ",
                    color: "orange",
                    time: "2 giờ trước",
                    title: "Lịch thi giữa kỳ Fall 2024",
                    desc: "Lịch thi giữa kỳ đã được cập nhật. Sinh viên vui lòng kiểm tra lịch thi của mình trên hệ thống FAP.",
                  },
                  {
                    category: "ĐĂNG KÝ",
                    color: "blue",
                    time: "1 ngày trước",
                    title: "Đăng ký môn học kỳ Spring 2025",
                    desc: "Thời gian đăng ký môn học kỳ Spring 2025 từ 15/11 đến 20/11. Sinh viên lưu ý đăng ký đúng hạn.",
                  },
                  {
                    category: "HỌC BỔNG",
                    color: "green",
                    time: "3 ngày trước",
                    title: "Học bổng xuất sắc kỳ Fall 2024",
                    desc: "Danh sách sinh viên đạt học bổng xuất sắc kỳ Fall 2024 đã được công bố. Xem chi tiết tại phòng Công tác sinh viên.",
                  },
                  {
                    category: "THÔNG BÁO",
                    color: "red",
                    time: "5 ngày trước",
                    title: "Nghỉ lễ Quốc khánh 2/9",
                    desc: "Thông báo lịch nghỉ lễ Quốc khánh 2/9. Sinh viên lưu ý sắp xếp thời gian học tập hợp lý.",
                  },
                ].map((item, index) => (
                  <div key={index} className="px-3">
                    <Card
                      hoverable
                      className="h-full"
                      style={{ borderRadius: "12px" }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <Badge color={item.color} text={item.category} />
                        <span className="text-xs text-gray-400">
                          <ClockCircleOutlined /> {item.time}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {item.desc}
                      </p>
                    </Card>
                  </div>
                ))}
              </Carousel>
            </div>

            {/* Sự kiện - Timeline */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-bold text-gray-900">
                  📅 Sự kiện sắp diễn ra
                </h3>
                <Button
                  type="link"
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Xem lịch đầy đủ →
                </Button>
              </div>

              <Timeline
                mode="left"
                items={[
                  {
                    color: "blue",
                    dot: <CalendarOutlined style={{ fontSize: "16px" }} />,
                    children: (
                      <Card
                        hoverable
                        style={{ borderRadius: "12px" }}
                        className="ml-4"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 text-center">
                            <div className="text-3xl font-bold text-blue-600">
                              15
                            </div>
                            <div className="text-sm text-gray-500">Th11</div>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-xl font-bold text-gray-900 mb-2">
                              Orientation Day 2024
                            </h4>
                            <p className="text-gray-600 mb-3">
                              Chào mừng tân sinh viên K19. Giới thiệu về trường,
                              các hoạt động và cơ hội phát triển.
                            </p>
                            <div className="flex gap-4 text-sm text-gray-500">
                              <span>
                                <ClockCircleOutlined /> 08:00 AM
                              </span>
                              <span>
                                <EnvironmentOutlined /> Hội trường A
                              </span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ),
                  },
                  {
                    color: "purple",
                    dot: <CalendarOutlined style={{ fontSize: "16px" }} />,
                    children: (
                      <Card
                        hoverable
                        style={{ borderRadius: "12px" }}
                        className="ml-4"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 text-center">
                            <div className="text-3xl font-bold text-purple-600">
                              20
                            </div>
                            <div className="text-sm text-gray-500">Th11</div>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-xl font-bold text-gray-900 mb-2">
                              Tech Talk: AI & Machine Learning
                            </h4>
                            <p className="text-gray-600 mb-3">
                              Chia sẻ về xu hướng AI và Machine Learning trong
                              ngành công nghệ hiện nay.
                            </p>
                            <div className="flex gap-4 text-sm text-gray-500">
                              <span>
                                <ClockCircleOutlined /> 14:00 PM
                              </span>
                              <span>
                                <EnvironmentOutlined /> Phòng 501
                              </span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ),
                  },
                  {
                    color: "pink",
                    dot: <CalendarOutlined style={{ fontSize: "16px" }} />,
                    children: (
                      <Card
                        hoverable
                        style={{ borderRadius: "12px" }}
                        className="ml-4"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 text-center">
                            <div className="text-3xl font-bold text-pink-600">
                              25
                            </div>
                            <div className="text-sm text-gray-500">Th11</div>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-xl font-bold text-gray-900 mb-2">
                              FPTU Got Talent 2024
                            </h4>
                            <p className="text-gray-600 mb-3">
                              Cuộc thi tài năng thường niên dành cho sinh viên
                              FPTU. Đăng ký ngay!
                            </p>
                            <div className="flex gap-4 text-sm text-gray-500">
                              <span>
                                <ClockCircleOutlined /> 18:00 PM
                              </span>
                              <span>
                                <EnvironmentOutlined /> Sân khấu ngoài trời
                              </span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .custom-dots li button {
          background: #d1d5db !important;
        }
        .custom-dots li.slick-active button {
          background: #f97316 !important;
        }
      `}</style>

      {/* Clubs Section - Orange & White Theme */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Animated Background Elements - Orange Theme */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100/40 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 left-0 w-96 h-96 bg-orange-50/60 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Câu lạc bộ sinh viên
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Hơn 50+ câu lạc bộ đang chờ đón bạn. Khám phá sở thích, phát triển
              kỹ năng và kết nối với những người bạn mới
            </p>
          </div>

          {/* Club Cards with Hover Animations */}
          <Row gutter={[24, 24]} className="mb-12">
            {[
              {
                name: "FPTU Code",
                icon: "💻",
                color: "#3b82f6",
                members: "500+",
                description: "Lập trình & Công nghệ",
              },
              {
                name: "FPTU Football",
                icon: "⚽",
                color: "#22c55e",
                members: "300+",
                description: "Bóng đá & Thể thao",
              },
              {
                name: "FPTU Music",
                icon: "🎵",
                color: "#a855f7",
                members: "200+",
                description: "Âm nhạc & Nghệ thuật",
              },
              {
                name: "FPTU Dance",
                icon: "💃",
                color: "#ec4899",
                members: "150+",
                description: "Nhảy múa & Biểu diễn",
              },
              {
                name: "FPTU Business",
                icon: "💼",
                color: "#f97316",
                members: "400+",
                description: "Kinh doanh & Khởi nghiệp",
              },
              {
                name: "FPTU Photo",
                icon: "📸",
                color: "#eab308",
                members: "250+",
                description: "Nhiếp ảnh & Sáng tạo",
              },
            ].map((club, index) => (
              <Col xs={12} sm={8} md={8} lg={4} key={index}>
                <div
                  className="group relative"
                  style={{
                    animation: "fadeInUp 0.6s ease-out",
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: "both",
                  }}
                >
                  <Card
                    hoverable
                    className="text-center h-full overflow-hidden"
                    style={{
                      borderRadius: "16px",
                      border: "2px solid transparent",
                      transition: "all 0.3s ease",
                    }}
                    bodyStyle={{ padding: "24px 16px" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = club.color;
                      e.currentTarget.style.transform = "translateY(-8px)";
                      e.currentTarget.style.boxShadow = `0 12px 24px ${club.color}40`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "transparent";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 2px 8px rgba(0,0,0,0.08)";
                    }}
                  >
                    {/* Icon with Pulse Animation */}
                    <div className="relative mb-4">
                      <div
                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: `${club.color}20`,
                          animation: "pulse 2s infinite",
                          transform: "scale(1.2)",
                        }}
                      ></div>
                      <div
                        className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
                        style={{
                          background: `linear-gradient(135deg, ${club.color}, ${club.color}dd)`,
                          boxShadow: `0 4px 12px ${club.color}40`,
                        }}
                      >
                        {club.icon}
                      </div>
                    </div>

                    {/* Club Info */}
                    <h4 className="font-bold text-gray-900 text-base mb-1">
                      {club.name}
                    </h4>
                    <p className="text-xs text-gray-500 mb-2">
                      {club.description}
                    </p>
                    <div
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        background: `${club.color}15`,
                        color: club.color,
                      }}
                    >
                      <TeamOutlined />
                      <span>{club.members} thành viên</span>
                    </div>
                  </Card>
                </div>
              </Col>
            ))}
          </Row>

          {/* CTA Button with Animation - Orange Theme */}
          <div className="text-center">
            <Button
              type="primary"
              size="large"
              onClick={() => navigate("/clubs")}
              className="group"
              style={{
                background: "linear-gradient(135deg, #f97316, #ea580c)",
                border: "none",
                height: "56px",
                fontSize: "16px",
                fontWeight: "600",
                borderRadius: "16px",
                boxShadow: "0 8px 24px rgba(249, 115, 22, 0.4)",
                padding: "0 32px",
                transition: "all 0.3s ease",
              }}
              icon={<TeamOutlined style={{ fontSize: "18px" }} />}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 32px rgba(249, 115, 22, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 8px 24px rgba(249, 115, 22, 0.4)";
              }}
            >
              Khám phá tất cả CLB
            </Button>
          </div>
        </div>

        {/* CSS Animations */}
        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </section>
    </div>
  );
};

export default StudentHome;
