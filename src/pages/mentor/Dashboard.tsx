import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            🎓 Mentor / Academic Advisor Dashboard
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Quản lý và cải thiện nội dung handbook thông qua việc theo dõi, phân
            tích và đề xuất cập nhật
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">
                      {stat.change} so với hôm qua
                    </p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-lg ${stat.color
                      .replace("text-", "bg-")
                      .replace(
                        "text",
                        ""
                      )}/10 flex items-center justify-center`}
                  >
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
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
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader className="text-center">
                  <div
                    className={`w-16 h-16 rounded-2xl ${page.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <page.icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-xl">{page.title}</CardTitle>
                  <CardDescription className="text-center">
                    {page.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Tính năng:</h4>
                    <ul className="space-y-1">
                      {page.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="text-sm text-muted-foreground flex items-center gap-2"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link to={page.href}>
                    <Button className="w-full group-hover:bg-primary/90 transition-colors">
                      Truy cập
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Workflow Overview */}
        <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              Quy trình làm việc
            </CardTitle>
            <CardDescription className="text-center">
              Ba trang tạo thành vòng lặp cải thiện nội dung handbook thông minh
              & liên tục
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold">Analytics Dashboard</h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Theo dõi & phát hiện vấn đề
                </p>
              </div>
              <ArrowRight className="w-6 h-6 text-muted-foreground hidden lg:block" />
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center">
                  <MessageSquare className="w-8 h-8 text-warning" />
                </div>
                <h3 className="font-semibold">Unresolved Queue</h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Xác định câu hỏi chưa có đáp án chuẩn
                </p>
              </div>
              <ArrowRight className="w-6 h-6 text-muted-foreground hidden lg:block" />
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-info/10 flex items-center justify-center">
                  <FileText className="w-8 h-8 text-info" />
                </div>
                <h3 className="font-semibold">Resource Recommendation</h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Đề xuất cập nhật nội dung tương ứng
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Hoạt động gần đây
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                <div className="w-2 h-2 rounded-full bg-success" />
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Đã hoàn thành đề xuất "Cập nhật lịch thi cuối kỳ"
                  </p>
                  <p className="text-xs text-muted-foreground">2 giờ trước</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                <div className="w-2 h-2 rounded-full bg-warning" />
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Có 5 câu hỏi mới cần xem xét trong Unresolved Queue
                  </p>
                  <p className="text-xs text-muted-foreground">4 giờ trước</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                <div className="w-2 h-2 rounded-full bg-info" />
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Tỷ lệ chính xác tăng 5% so với tuần trước
                  </p>
                  <p className="text-xs text-muted-foreground">1 ngày trước</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
