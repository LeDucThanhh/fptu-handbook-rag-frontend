import { useAuthStore } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, TrendingUp, Award } from "lucide-react";
import { Link } from "react-router-dom";

export default function ClubDashboard() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl p-8 mb-8 text-white">
          <h1 className="text-3xl font-bold mb-2">
            Club Dashboard - {user?.fullName} 🎭
          </h1>
          <p className="text-pink-100">Quản lý hoạt động và thành viên CLB</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Thành viên</p>
                  <p className="text-3xl font-bold text-gray-900">250</p>
                </div>
                <Users className="w-10 h-10 text-pink-300" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Sự kiện</p>
                  <p className="text-3xl font-bold text-gray-900">12</p>
                </div>
                <Calendar className="w-10 h-10 text-blue-300" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tăng trưởng</p>
                  <p className="text-3xl font-bold text-green-600">+15%</p>
                </div>
                <TrendingUp className="w-10 h-10 text-green-300" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Giải thưởng</p>
                  <p className="text-3xl font-bold text-gray-900">5</p>
                </div>
                <Award className="w-10 h-10 text-yellow-300" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link to="/club/profile">
            <Card className="hover:shadow-lg transition cursor-pointer border-l-4 border-l-pink-500">
              <CardContent className="pt-6">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">
                  Quản lý hồ sơ CLB
                </h3>
                <p className="text-sm text-gray-600">
                  Cập nhật thông tin, logo và mô tả CLB
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/club/activities">
            <Card className="hover:shadow-lg transition cursor-pointer border-l-4 border-l-blue-500">
              <CardContent className="pt-6">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">
                  Quản lý hoạt động
                </h3>
                <p className="text-sm text-gray-600">
                  Tạo và quản lý các sự kiện của CLB
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/club/members">
            <Card className="hover:shadow-lg transition cursor-pointer border-l-4 border-l-green-500">
              <CardContent className="pt-6">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">
                  Quản lý thành viên
                </h3>
                <p className="text-sm text-gray-600">
                  Xem danh sách và duyệt thành viên mới
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Upcoming Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Hoạt động sắp tới</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-pink-50 rounded-lg border border-pink-200">
                <div className="w-12 h-12 bg-pink-500 text-white rounded-lg flex flex-col items-center justify-center">
                  <span className="text-lg font-bold">15</span>
                  <span className="text-xs">OCT</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900">Workshop React cho Beginners</p>
                  <p className="text-sm text-gray-600">14:00 - 16:00 • Phòng 501</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                  45/50 đăng ký
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

