import { Link } from "react-router-dom";
import { useAuthStore } from "@/contexts/AuthContext";
import { AlertCircle, BookOpen, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MentorDashboard() {
  const { user } = useAuthStore();

  const stats = [
    { label: "Chờ xử lý", value: 2, color: "text-red-600", icon: AlertCircle },
    { label: "Đang xử lý", value: 0, color: "text-blue-600", icon: TrendingUp },
    { label: "Đã giải quyết", value: 0, color: "text-green-600", icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 mb-8 text-white">
          <h1 className="text-3xl font-bold mb-2">
            Chào mừng Mentor {user?.fullName}! 👨‍🏫
          </h1>
          <p className="text-green-100">
            Hỗ trợ sinh viên giải đáp thắc mắc và chia sẻ kiến thức
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className={`text-4xl font-bold ${stat.color}`}>
                      {stat.value}
                    </p>
                  </div>
                  <stat.icon className="w-12 h-12 text-gray-300" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/mentor/unresolved">
            <Card className="hover:shadow-lg transition cursor-pointer border-l-4 border-l-orange-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-orange-500" />
                  Câu hỏi chưa giải quyết
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Xem và giải đáp các câu hỏi mà AI chưa trả lời tốt
                </p>
                <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">
                  Xem ngay →
                </button>
              </CardContent>
            </Card>
          </Link>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-blue-500" />
                Mentor Posts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Quản lý các bài viết và câu trả lời của bạn
              </p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                Quản lý →
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

