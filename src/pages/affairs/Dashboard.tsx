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
      color: "bg-teal-500",
      description: "Thông báo cho sinh viên",
    },
    {
      icon: Users,
      label: "Quản lý CLB",
      href: "/affairs/clubs",
      color: "bg-purple-500",
      description: "Duyệt và quản lý CLB",
    },
    {
      icon: TrendingUp,
      label: "Thống kê",
      href: "/affairs/engagement",
      color: "bg-orange-500",
      description: "Engagement Dashboard",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-8 mb-8 text-white">
          <h1 className="text-3xl font-bold mb-2">
            Affairs Dashboard - {user?.fullName} 🏢
          </h1>
          <p className="text-teal-100">
            Quản lý hoạt động sinh viên và thông báo
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Thông báo tháng này</p>
                  <p className="text-3xl font-bold text-gray-900">45</p>
                </div>
                <Bell className="w-10 h-10 text-teal-300" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Câu lạc bộ</p>
                  <p className="text-3xl font-bold text-gray-900">52</p>
                </div>
                <Users className="w-10 h-10 text-purple-300" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Sự kiện sắp tới</p>
                  <p className="text-3xl font-bold text-gray-900">12</p>
                </div>
                <Calendar className="w-10 h-10 text-orange-300" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Engagement Rate</p>
                  <p className="text-3xl font-bold text-gray-900">78%</p>
                </div>
                <TrendingUp className="w-10 h-10 text-green-300" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Thao tác nhanh</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickActions.map((action, index) => (
                <Link key={index} to={action.href}>
                  <div className="p-6 border-2 border-gray-200 rounded-xl hover:border-teal-500 hover:bg-teal-50 transition cursor-pointer group">
                    <div
                      className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition`}
                    >
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      {action.label}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {action.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Hoạt động gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                  <Bell className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Gửi thông báo "Lịch thi kỳ Fall 2024"</p>
                  <p className="text-sm text-gray-600">Gửi đến: Tất cả sinh viên • 2 giờ trước</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Tạo sự kiện "Ngày hội CLB 2024"</p>
                  <p className="text-sm text-gray-600">18/10/2024 • 1 ngày trước</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}



