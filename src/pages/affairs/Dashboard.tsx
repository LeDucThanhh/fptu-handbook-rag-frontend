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

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Sự kiện sắp tới</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                <div className="w-12 h-12 bg-orange-500 text-white rounded-lg flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold">15</span>
                  <span className="text-xs">THG 10</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900">Tech Talk: AI in Education</p>
                  <p className="text-sm text-gray-600">14:00 - 16:00 • Hội trường A</p>
                </div>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">
                  Upcoming
                </span>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-lg flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold">18</span>
                  <span className="text-xs">THG 10</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900">Ngày hội Câu lạc bộ</p>
                  <p className="text-sm text-gray-600">09:00 - 17:00 • Toàn bộ campus</p>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                  Upcoming
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

