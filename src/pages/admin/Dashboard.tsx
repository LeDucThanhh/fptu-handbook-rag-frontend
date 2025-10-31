import { Link } from "react-router-dom";
import {
  Users,
  Settings,
  Shield,
  Activity,
  Database,
  FileText,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboard() {
  const quickActions = [
    {
      icon: Users,
      label: "Quản lý người dùng",
      href: "/admin/users",
      color: "bg-blue-500",
    },
    {
      icon: Settings,
      label: "Cấu hình hệ thống",
      href: "/admin/config",
      color: "bg-purple-500",
    },
    {
      icon: FileText,
      label: "Audit Logs",
      href: "/admin/logs",
      color: "bg-green-500",
    },
    {
      icon: Activity,
      label: "System Health",
      href: "/admin/health",
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-screen-2xl mx-auto space-y-8">
        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tổng người dùng</p>
                  <p className="text-3xl font-bold text-gray-900">156</p>
                </div>
                <Users className="w-10 h-10 text-blue-300" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Queries hôm nay</p>
                  <p className="text-3xl font-bold text-gray-900">45</p>
                </div>
                <Activity className="w-10 h-10 text-green-300" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">System Uptime</p>
                  <p className="text-3xl font-bold text-gray-900">99.9%</p>
                </div>
                <Shield className="w-10 h-10 text-orange-300" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Database Size</p>
                  <p className="text-3xl font-bold text-gray-900">2.4GB</p>
                </div>
                <Database className="w-10 h-10 text-purple-300" />
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Link key={index} to={action.href}>
                  <div className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition cursor-pointer group">
                    <div
                      className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition`}
                    >
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="font-semibold text-gray-900">
                      {action.label}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Access All Roles */}
        <Card>
          <CardHeader>
            <CardTitle>Truy cập chức năng các role</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                to="/dashboard"
                className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg hover:bg-blue-100 transition"
              >
                <p className="font-semibold text-blue-900">
                  🎓 Student Dashboard
                </p>
                <p className="text-sm text-blue-600 mt-1">
                  Xem giao diện sinh viên
                </p>
              </Link>

              <Link
                to="/mentor/unresolved"
                className="p-4 bg-green-50 border-2 border-green-200 rounded-lg hover:bg-green-100 transition"
              >
                <p className="font-semibold text-green-900">
                  👨‍🏫 Mentor Dashboard
                </p>
                <p className="text-sm text-green-600 mt-1">
                  Xem giao diện mentor
                </p>
              </Link>

              <Link
                to="/profile"
                className="p-4 bg-orange-50 border-2 border-orange-200 rounded-lg hover:bg-orange-100 transition"
              >
                <p className="font-semibold text-orange-900">
                  👤 Thông tin cá nhân
                </p>
                <p className="text-sm text-orange-600 mt-1">
                  Quản lý tài khoản
                </p>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
