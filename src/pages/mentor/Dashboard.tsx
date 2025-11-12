import { Link } from "react-router-dom";
import { Card, Button } from "antd";
import {
  BarChart3,
  FileText,
  MessageSquare,
  ArrowRight,
  Users,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

const Dashboard = () => {
  const quickStats = [
    {
      title: "Tổng câu hỏi hôm nay",
      value: "47",
      change: "+12%",
      icon: MessageSquare,
      color: "text-primary",
    },
    {
      title: "Tỷ lệ chính xác",
      value: "78%",
      change: "+5%",
      icon: TrendingUp,
      color: "text-success",
    },
    {
      title: "Đề xuất chờ xử lý",
      value: "12",
      change: "-3",
      icon: FileText,
      color: "text-warning",
    },
    {
      title: "Câu hỏi chưa giải quyết",
      value: "8",
      change: "+2",
      icon: AlertCircle,
      color: "text-destructive",
    },
  ];

  const mentorPages = [
    {
      title: "Analytics Dashboard",
      description:
        "Theo dõi xu hướng hỏi-đáp của sinh viên để phát hiện lỗ hổng nội dung trong handbook",
      icon: BarChart3,
      href: "/mentor/analytics",
      features: [
        "Top Query Topics",
        "Feedback Accuracy",
        "Trending Handbook Sections",
        "Insight Summary",
      ],
      color: "bg-primary/10 text-primary",
    },
    {
      title: "Resource Recommendation Panel",
      description:
        "Đề xuất cập nhật hoặc bổ sung tài liệu học vụ / nội dung sổ tay",
      icon: FileText,
      href: "/mentor/recommendations",
      features: [
        "Form đề xuất",
        "Gửi đến Academic Office",
        "Theo dõi trạng thái",
        "Quản lý tickets",
      ],
      color: "bg-info/10 text-info",
    },
    {
      title: "Unresolved Queue",
      description:
        "Xem và xử lý các câu hỏi sinh viên mà hệ thống chưa trả lời đúng hoặc chưa được xác nhận",
      icon: MessageSquare,
      href: "/mentor/queue",
      features: [
        "Danh sách câu hỏi chưa giải quyết",
        "Gợi ý chỉnh sửa / phân loại",
        "Liên kết với Resource Panel",
        "Ghi chú của mentor",
      ],
      color: "bg-warning/10 text-warning",
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">
            🎓 Mentor / Academic Advisor Dashboard
          </h1>
          <p className="text-gray-600">
            Quản lý và cải thiện nội dung handbook thông qua việc theo dõi, phân
            tích và đề xuất cập nhật
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <Card
              key={index}
              className="hover:shadow-md transition-shadow shadow-md"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-gray-500">
                      {stat.change} so với hôm qua
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Features */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">
            Các chức năng chính
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {mentorPages.map((page, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 shadow-md"
              >
                <div className="text-center p-6">
                  <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <page.icon className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{page.title}</h3>
                  <p className="text-gray-600 text-center text-sm">
                    {page.description}
                  </p>
                </div>
                <div className="space-y-4 px-6 pb-6">
                  <div>
                    <h4 className="font-medium mb-2">Tính năng:</h4>
                    <ul className="space-y-1">
                      {page.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="text-sm text-gray-600 flex items-center gap-2"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link to={page.href}>
                    <Button className="w-full bg-orange-500 hover:bg-orange-600 transition-colors">
                      Truy cập
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Workflow Overview */}
        <Card className="bg-orange-50 border-orange-200 shadow-md">
          <div className="p-6">
            <h2 className="text-center text-2xl font-semibold mb-2">
              Quy trình làm việc
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Ba trang tạo thành vòng lặp cải thiện nội dung handbook thông minh
              & liên tục
            </p>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
                  <BarChart3 className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="font-semibold">Analytics Dashboard</h3>
                <p className="text-sm text-gray-600 max-w-xs">
                  Theo dõi & phát hiện vấn đề
                </p>
              </div>
              <ArrowRight className="w-6 h-6 text-gray-400 hidden lg:block" />
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
                  <MessageSquare className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="font-semibold">Unresolved Queue</h3>
                <p className="text-sm text-gray-600 max-w-xs">
                  Xác định câu hỏi chưa có đáp án chuẩn
                </p>
              </div>
              <ArrowRight className="w-6 h-6 text-gray-400 hidden lg:block" />
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
                  <FileText className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="font-semibold">Resource Recommendation</h3>
                <p className="text-sm text-gray-600 max-w-xs">
                  Đề xuất cập nhật nội dung tương ứng
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card
          className="shadow-md"
          title={
            <span className="flex items-center gap-2 text-lg font-semibold">
              <Users className="w-5 h-5" />
              Hoạt động gần đây
            </span>
          }
        >
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Đã hoàn thành đề xuất "Cập nhật lịch thi cuối kỳ"
                  </p>
                  <p className="text-xs text-gray-500">2 giờ trước</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
                <div className="w-2 h-2 rounded-full bg-orange-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Có 5 câu hỏi mới cần xem xét trong Unresolved Queue
                  </p>
                  <p className="text-xs text-gray-500">4 giờ trước</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Tỷ lệ chính xác tăng 5% so với tuần trước
                  </p>
                  <p className="text-xs text-gray-500">1 ngày trước</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
