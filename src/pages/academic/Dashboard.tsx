import { useAuthStore } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, TrendingUp, FileText, AlertCircle, Download, Users, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { mockHandbookSections, mockUnresolvedQueries, mockQueryLogs } from "@/services/mock/mockData";

export default function AcademicDashboard() {
  const { user } = useAuthStore();

  const quickActions = [
    {
      icon: BookOpen,
      label: "Quản lý Handbook",
      href: "/academic/handbook",
      description: "CRUD nội dung sổ tay",
      count: mockHandbookSections.length,
    },
    {
      icon: TrendingUp,
      label: "Rebuild Index",
      href: "/academic/rebuild",
      description: "Tái lập chỉ mục AI",
      status: "Ready",
    },
    {
      icon: AlertCircle,
      label: "Unresolved Queries",
      href: "/mentor/unresolved",
      description: "Câu hỏi cần xử lý",
      count: mockUnresolvedQueries.length,
    },
  ];

  const topTopics = [
    { topic: "Học phí", queries: 1250, trend: "+12%" },
    { topic: "Ký túc xá", queries: 980, trend: "+8%" },
    { topic: "Học bổng", queries: 850, trend: "+15%" },
    { topic: "Đăng ký môn", queries: 720, trend: "+5%" },
    { topic: "Quy chế", queries: 650, trend: "-3%" },
  ];

  const handleExportReport = () => {
    alert("Xuất báo cáo Excel sẽ được triển khai khi có backend!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <div className="container mx-auto px-4 max-w-7xl py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="relative">
            <h1
              className="text-3xl font-bold mb-2"
              style={{ fontFamily: "SVN-Product Sans, Inter, sans-serif" }}
            >
              Phòng Đào tạo - {user?.fullName} 📚
            </h1>
            <p className="text-orange-100">
              Quản lý nội dung học vụ và hệ thống RAG
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glare-card">
            <Card className="h-full border-orange-200 hover:border-orange-400 transition-all hover:shadow-xl">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Handbook Sections</p>
                    <p className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                      {mockHandbookSections.length}
                    </p>
                  </div>
                  <BookOpen className="w-12 h-12 text-orange-300" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="glare-card">
            <Card className="h-full border-orange-200 hover:border-orange-400 transition-all hover:shadow-xl">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">AI Queries</p>
                    <p className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                      {mockQueryLogs.length}
                    </p>
                  </div>
                  <MessageCircle className="w-12 h-12 text-orange-300" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="glare-card">
            <Card className="h-full border-orange-200 hover:border-orange-400 transition-all hover:shadow-xl">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Unresolved</p>
                    <p className="text-4xl font-bold text-red-600">
                      {mockUnresolvedQueries.length}
                    </p>
                  </div>
                  <AlertCircle className="w-12 h-12 text-red-300" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="glare-card">
            <Card className="h-full border-orange-200 hover:border-orange-400 transition-all hover:shadow-xl">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Last Index</p>
                    <p className="text-lg font-bold text-gray-900">2h ago</p>
                  </div>
                  <FileText className="w-12 h-12 text-orange-300" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8 border-orange-200 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle
                style={{ fontFamily: "SVN-Product Sans, Inter, sans-serif" }}
              >
                Thao tác nhanh
              </CardTitle>
              <button
                onClick={handleExportReport}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all font-semibold inline-flex items-center gap-2 text-sm shadow-md"
              >
                <Download className="w-4 h-4" />
                Xuất báo cáo
              </button>
            </div>
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
                      <h3
                        className="font-bold text-gray-900 mb-2 text-lg"
                        style={{
                          fontFamily: "SVN-Product Sans, Inter, sans-serif",
                        }}
                      >
                        {action.label}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {action.description}
                      </p>
                      {action.count !== undefined && (
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-orange-600">
                            {action.count}
                          </span>
                          <span className="text-xs text-gray-500">items</span>
                        </div>
                      )}
                      {action.status && (
                        <span className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full font-semibold">
                          {action.status}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Topics */}
          <Card className="border-orange-200 shadow-lg">
            <CardHeader>
              <CardTitle
                style={{ fontFamily: "SVN-Product Sans, Inter, sans-serif" }}
              >
                Chủ đề được hỏi nhiều nhất
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topTopics.map((topic, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md">
                          {index + 1}
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {topic.topic}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-gray-900">
                          {topic.queries}
                        </span>
                        <span
                          className={`text-xs font-semibold ${
                            topic.trend.startsWith("+")
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {topic.trend}
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full transition-all"
                        style={{ width: `${(topic.queries / 1250) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Updates */}
          <Card className="border-orange-200 shadow-lg">
            <CardHeader>
              <CardTitle
                style={{ fontFamily: "SVN-Product Sans, Inter, sans-serif" }}
              >
                Cập nhật gần đây
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="glare-card">
                  <div className="flex items-start gap-4 p-4 bg-white border-2 border-orange-100 rounded-xl hover:border-orange-300 hover:shadow-lg transition-all">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        Cập nhật "Quy chế đào tạo 2024"
                      </p>
                      <p className="text-sm text-gray-600">
                        Đã thêm 5 sections mới về quy định thi và điểm
                      </p>
                      <p className="text-xs text-gray-500 mt-2">2 giờ trước</p>
                    </div>
                  </div>
                </div>

                <div className="glare-card">
                  <div className="flex items-start gap-4 p-4 bg-white border-2 border-orange-100 rounded-xl hover:border-orange-300 hover:shadow-lg transition-all">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        Rebuild AI Index hoàn tất
                      </p>
                      <p className="text-sm text-gray-600">
                        Đã tạo lại embeddings cho {mockHandbookSections.length} documents
                      </p>
                      <p className="text-xs text-gray-500 mt-2">5 giờ trước</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
