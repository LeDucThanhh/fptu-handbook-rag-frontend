import { useState } from "react";
import { AlertCircle, Clock, Search, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface UnresolvedQuery {
  id: string;
  query: string;
  answer: string;
  confidence: number;
  topic: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "in_progress";
  userId: string;
  userName: string;
  createdAt: string;
}

// Mock data
const mockQueries: UnresolvedQuery[] = [
  {
    id: "1",
    query: "Làm thế nào để đăng ký học bổng?",
    answer: "Bạn cần vào FAP để đăng ký học bổng...",
    confidence: 0.45,
    topic: "Học bổng",
    priority: "high",
    status: "pending",
    userId: "student-001",
    userName: "Nguyễn Văn A",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    query: "Thủ tục bảo lưu học phí như thế nào?",
    answer: "Bạn cần nộp đơn bảo lưu tại phòng học vụ...",
    confidence: 0.52,
    topic: "Học vụ",
    priority: "medium",
    status: "pending",
    userId: "student-002",
    userName: "Trần Thị B",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export default function UnresolvedQueue() {
  const [queries] = useState(mockQueries);
  const [filter, setFilter] = useState<"all" | "pending" | "in_progress">(
    "all"
  );
  const [search, setSearch] = useState("");

  const filteredQueries = queries.filter((q) => {
    if (filter !== "all" && q.status !== filter) return false;
    if (search && !q.query.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-green-100 text-green-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <AlertCircle className="w-8 h-8 text-orange-500" />
            Câu hỏi chưa giải quyết
          </h1>
          <p className="text-gray-600 mt-2">
            Danh sách câu hỏi cần mentor hỗ trợ giải đáp
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Chờ xử lý</p>
                  <p className="text-3xl font-bold text-orange-600">
                    {queries.filter((q) => q.status === "pending").length}
                  </p>
                </div>
                <AlertCircle className="w-12 h-12 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Đang xử lý</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {queries.filter((q) => q.status === "in_progress").length}
                  </p>
                </div>
                <Clock className="w-12 h-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Ưu tiên cao</p>
                  <p className="text-3xl font-bold text-red-600">
                    {queries.filter((q) => q.priority === "high").length}
                  </p>
                </div>
                <AlertCircle className="w-12 h-12 text-red-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm câu hỏi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === "all"
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === "pending"
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Chờ xử lý
            </button>
            <button
              onClick={() => setFilter("in_progress")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === "in_progress"
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Đang xử lý
            </button>
          </div>
        </div>

        {/* Queries List */}
        <div className="space-y-4">
          {filteredQueries.map((query) => (
            <Card key={query.id} className="hover:shadow-lg transition">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${getPriorityColor(
                          query.priority
                        )}`}
                      >
                        {query.priority.toUpperCase()}
                      </span>
                      <span className="px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-800">
                        {query.topic}
                      </span>
                      <span className="text-xs text-gray-500">
                        Confidence: {(query.confidence * 100).toFixed(0)}%
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {query.query}
                    </h3>

                    <div className="bg-gray-50 p-3 rounded-lg mb-3">
                      <p className="text-sm text-gray-600 italic">
                        AI Answer: {query.answer}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {query.userName}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {new Date(query.createdAt).toLocaleString("vi-VN")}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition text-sm font-semibold whitespace-nowrap">
                      Tạo Mentor Post
                    </button>
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm whitespace-nowrap">
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredQueries.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Không có câu hỏi nào</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
