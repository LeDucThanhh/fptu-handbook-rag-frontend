import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Bell, Users, TrendingUp, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

export default function AffairsDashboard() {
  const quickStats = [
    {
      title: "Thông báo tháng này",
      value: "45",
      change: "+8",
      icon: Bell,
      color: "text-primary",
    },
    {
      title: "Câu lạc bộ",
      value: "52",
      change: "+2",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Sự kiện sắp tới",
      value: "12",
      change: "+3",
      icon: Calendar,
      color: "text-green-600",
    },
    {
      title: "Tương tác hôm nay",
      value: "1,234",
      change: "+15%",
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ];

  const affairsPages = [
    {
      title: "Quản lý Thông báo",
      description: "Tạo và quản lý thông báo cho sinh viên",
      icon: Bell,
      href: "/affairs/notifications",
      color: "bg-primary/10 text-primary",
      features: [
        "Tạo thông báo mới",
        "Lên lịch gửi thông báo",
        "Theo dõi trạng thái đọc",
      ],
    },
    {
      title: "Quản lý CLB",
      description: "Quản lý câu lạc bộ sinh viên",
      icon: Users,
      href: "/affairs/clubs",
      color: "bg-blue-500/10 text-blue-600",
      features: [
        "Phê duyệt CLB mới",
        "Quản lý thành viên",
        "Theo dõi hoạt động",
      ],
    },
    {
      title: "Engagement Dashboard",
      description: "Theo dõi tương tác sinh viên",
      icon: TrendingUp,
      href: "/affairs/engagement",
      color: "bg-green-500/10 text-green-600",
      features: [
        "Thống kê tương tác",
        "Báo cáo hoạt động",
        "Phân tích xu hướng",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-screen-2xl mx-auto space-y-8">
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

        {/* Main Features - Horizontal Layout */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">
            Các chức năng chính
          </h2>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {affairsPages.map((page, index) => (
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
                    <h4 className="font-semibold mb-2">Tính năng:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {page.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    to={page.href}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    Truy cập
                    <page.icon className="w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activities - Horizontal Layout */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Hoạt động gần đây</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Bell className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-2">
                      Thông báo mới: Lịch thi cuối kỳ
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Đã gửi thông báo cho 2,500 sinh viên
                    </p>
                    <p className="text-xs text-muted-foreground">1 giờ trước</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-2">
                      CLB mới: FPTU Photography
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Đã phê duyệt câu lạc bộ nhiếp ảnh
                    </p>
                    <p className="text-xs text-muted-foreground">3 giờ trước</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
