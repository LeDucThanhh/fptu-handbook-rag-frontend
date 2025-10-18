import { useAuthStore } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Users, TrendingUp, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

export default function AffairsDashboard() {
  const { user } = useAuthStore();

  const quickActions = [
    {
      icon: Bell,
      label: "Gửi thông báo",
      href: "/affairs/notifications",
      description: "Thông báo cho sinh viên",
    },
    {
      icon: Users,
      label: "Quản lý CLB",
      href: "/affairs/clubs",
      description: "Duyệt và quản lý CLB",
    },
    {
      icon: TrendingUp,
      label: "Thống kê",
      href: "/affairs/engagement",
      description: "Engagement Dashboard",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Welcome Banner với màu cam */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="relative">
            <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "SVN-Product Sans, Inter, sans-serif" }}>
              Phòng Công tác Sinh viên - {user?.fullName} 🏢
            </h1>
            <p className="text-orange-100">
              Quản lý hoạt động sinh viên, thông báo và sự kiện
            </p>
          </div>
        </div>

        {/* Stats với glare-card */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glare-card">
            <Card className="h-full border-orange-200 hover:border-orange-400 transition-all hover:shadow-xl">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Thông báo tháng này</p>
                    <p className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">45</p>
                  </div>
                  <Bell className="w-12 h-12 text-orange-300" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="glare-card">
            <Card className="h-full border-orange-200 hover:border-orange-400 transition-all hover:shadow-xl">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Câu lạc bộ</p>
                    <p className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">52</p>
                  </div>
                  <Users className="w-12 h-12 text-orange-300" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="glare-card">
            <Card className="h-full border-orange-200 hover:border-orange-400 transition-all hover:shadow-xl">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Sự kiện sắp tới</p>
                    <p className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">12</p>
                  </div>
                  <Calendar className="w-12 h-12 text-orange-300" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="glare-card">
            <Card className="h-full border-orange-200 hover:border-orange-400 transition-all hover:shadow-xl">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Engagement Rate</p>
                    <p className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">78%</p>
                  </div>
                  <TrendingUp className="w-12 h-12 text-orange-300" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions với glare-card */}
        <Card className="mb-8 border-orange-200 shadow-lg">
          <CardHeader>
            <CardTitle style={{ fontFamily: "SVN-Product Sans, Inter, sans-serif" }}>
              Thao tác nhanh
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickActions.map((action, index) => (
                <Link key={index} to={action.href}>
                  <div className="glare-card">
                    <div className="p-6 border-2 border-orange-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-all cursor-pointer group bg-white">
                      <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                        <action.icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2 text-lg" style={{ fontFamily: "SVN-Product Sans, Inter, sans-serif" }}>
                        {action.label}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities với glare-card */}
        <Card className="border-orange-200 shadow-lg">
          <CardHeader>
            <CardTitle style={{ fontFamily: "SVN-Product Sans, Inter, sans-serif" }}>
              Hoạt động gần đây
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="glare-card">
                <div className="flex items-center gap-4 p-4 bg-white border-2 border-orange-100 rounded-xl hover:border-orange-300 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md">
                    <Bell className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Gửi thông báo "Lịch thi kỳ Fall 2024"</p>
                    <p className="text-sm text-gray-600">Gửi đến: Tất cả sinh viên • 2 giờ trước</p>
                  </div>
                </div>
              </div>

              <div className="glare-card">
                <div className="flex items-center gap-4 p-4 bg-white border-2 border-orange-100 rounded-xl hover:border-orange-300 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center shadow-md">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Tạo sự kiện "Ngày hội CLB 2024"</p>
                    <p className="text-sm text-gray-600">18/10/2024 • 1 ngày trước</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
