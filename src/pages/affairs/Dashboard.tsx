import { Card } from "antd";
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
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Student Affairs Dashboard</h1>
          <p className="text-gray-600">
            Quản lý thông báo và hoạt động sinh viên
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

        {/* Main Features - Horizontal Layout */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">
            Các chức năng chính
          </h2>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {affairsPages.map((page, index) => (
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
                    <h4 className="font-semibold mb-2">Tính năng:</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {page.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    to={page.href}
                    className="w-full bg-orange-500 text-white hover:bg-orange-600 px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    Truy cập
                    <page.icon className="w-4 h-4" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activities - Horizontal Layout */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Hoạt động gần đây</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-md">
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Bell className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Thông báo mới: Lịch thi cuối kỳ
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Đã gửi thông báo cho 2,500 sinh viên
                    </p>
                    <p className="text-xs text-gray-500">1 giờ trước</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="shadow-md">
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      CLB mới: FPTU Photography
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Đã phê duyệt câu lạc bộ nhiếp ảnh
                    </p>
                    <p className="text-xs text-gray-500">3 giờ trước</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
