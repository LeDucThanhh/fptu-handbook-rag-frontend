import { Card } from "antd";
import { BookOpen, TrendingUp, FileText, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function AcademicDashboard() {
  const quickStats = [
    {
      title: "Handbook Sections",
      value: "156",
      change: "+5",
      icon: BookOpen,
      color: "text-primary",
    },
    {
      title: "AI Queries",
      value: "4,567",
      change: "+12%",
      icon: TrendingUp,
      color: "text-blue-600",
    },
    {
      title: "Unresolved",
      value: "23",
      change: "-3",
      icon: AlertCircle,
      color: "text-orange-600",
    },
    {
      title: "Last Index",
      value: "2h ago",
      change: "Updated",
      icon: FileText,
      color: "text-green-600",
    },
  ];

  const academicPages = [
    {
      title: "Quản lý Handbook",
      description: "CRUD nội dung sổ tay và tài liệu học vụ",
      icon: BookOpen,
      href: "/academic/handbook",
      color: "bg-primary/10 text-primary",
      features: [
        "Thêm/sửa/xóa sections",
        "Upload tài liệu mới",
        "Quản lý phiên bản",
      ],
    },
    {
      title: "Rebuild Index",
      description: "Tái lập chỉ mục AI cho hệ thống RAG",
      icon: TrendingUp,
      href: "/academic/rebuild",
      color: "bg-blue-500/10 text-blue-600",
      features: [
        "Tạo embeddings mới",
        "Cập nhật vector database",
        "Kiểm tra chất lượng index",
      ],
    },
    {
      title: "Thống kê & Báo cáo",
      description: "Xem báo cáo chi tiết về hệ thống",
      icon: FileText,
      href: "/academic/stats",
      color: "bg-green-500/10 text-green-600",
      features: [
        "Báo cáo sử dụng AI",
        "Thống kê truy vấn",
        "Phân tích hiệu suất",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-screen-2xl mx-auto space-y-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Academic Dashboard</h1>
          <p className="text-gray-600">
            Quản lý nội dung học vụ và hệ thống AI
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
            {academicPages.map((page, index) => (
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

        {/* Recent Updates - Horizontal Layout */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Cập nhật gần đây</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-md">
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Cập nhật "Quy chế đào tạo 2024"
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Đã thêm 5 sections mới về quy định thi và điểm
                    </p>
                    <p className="text-xs text-gray-500">2 giờ trước</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="shadow-md">
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Rebuild AI Index hoàn tất
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Đã tạo lại embeddings cho 156 documents
                    </p>
                    <p className="text-xs text-gray-500">5 giờ trước</p>
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
