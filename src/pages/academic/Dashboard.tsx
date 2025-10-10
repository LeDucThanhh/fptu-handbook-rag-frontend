import { useAuthStore } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, TrendingUp, FileText, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function AcademicDashboard() {
  const { user } = useAuthStore();

  const quickActions = [
    {
      icon: BookOpen,
      label: "Quản lý Handbook",
      href: "/academic/handbook",
      color: "bg-purple-500",
      description: "CRUD nội dung sổ tay",
    },
    {
      icon: TrendingUp,
      label: "Rebuild Index",
      href: "/academic/rebuild",
      color: "bg-blue-500",
      description: "Tái lập chỉ mục AI",
    },
    {
      icon: FileText,
      label: "Thống kê",
      href: "/academic/stats",
      color: "bg-green-500",
      description: "Xem báo cáo học vụ",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-8 mb-8 text-white">
          <h1 className="text-3xl font-bold mb-2">
            Academic Dashboard - {user?.fullName} 📚
          </h1>
          <p className="text-purple-100">
            Quản lý nội dung học vụ và hệ thống RAG
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Handbook Sections</p>
                  <p className="text-3xl font-bold text-gray-900">156</p>
                </div>
                <BookOpen className="w-10 h-10 text-purple-300" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">AI Queries</p>
                  <p className="text-3xl font-bold text-gray-900">4,567</p>
                </div>
                <TrendingUp className="w-10 h-10 text-blue-300" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Unresolved</p>
                  <p className="text-3xl font-bold text-orange-600">23</p>
                </div>
                <AlertCircle className="w-10 h-10 text-orange-300" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Last Index</p>
                  <p className="text-lg font-bold text-gray-900">2h ago</p>
                </div>
                <FileText className="w-10 h-10 text-green-300" />
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
                  <div className="p-6 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition cursor-pointer group">
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

        {/* Recent Updates */}
        <Card>
          <CardHeader>
            <CardTitle>Cập nhật gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    Cập nhật "Quy chế đào tạo 2024"
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Đã thêm 5 sections mới về quy định thi và điểm
                  </p>
                  <p className="text-xs text-gray-500 mt-2">2 giờ trước</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    Rebuild AI Index hoàn tất
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Đã tạo lại embeddings cho 156 documents
                  </p>
                  <p className="text-xs text-gray-500 mt-2">5 giờ trước</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

