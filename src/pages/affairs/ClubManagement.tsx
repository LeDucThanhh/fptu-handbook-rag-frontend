import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CheckCircle, XCircle, Eye, Search } from "lucide-react";
import { mockClubs } from "@/services/mock/mockData";

export default function ClubManagement() {
  const [clubs] = useState(mockClubs);
  const [filter, setFilter] = useState<"all" | "active" | "pending">("all");

  const filteredClubs = clubs.filter((club) => {
    if (filter === "all") return true;
    if (filter === "active") return club.isActive;
    if (filter === "pending") return !club.isActive;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-8 mb-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Quản lý Câu lạc bộ</h1>
          <p className="text-teal-100">Duyệt, ẩn và quản lý thông tin CLB</p>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="inline-flex rounded-lg border border-gray-300 bg-white p-1">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === "all"
                  ? "bg-teal-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Tất cả ({clubs.length})
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === "active"
                  ? "bg-teal-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Đang hoạt động ({clubs.filter((c) => c.isActive).length})
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === "pending"
                  ? "bg-teal-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Chờ duyệt ({clubs.filter((c) => !c.isActive).length})
            </button>
          </div>

          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm CLB..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-teal-500"
            />
          </div>
        </div>

        {/* Clubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClubs.map((club) => (
            <Card
              key={club.id}
              className="hover:shadow-lg transition cursor-pointer"
            >
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r from-${club.color}-400 to-${club.color}-600 rounded-2xl flex items-center justify-center mx-auto mb-3`}
                  >
                    <span className="text-3xl">{club.icon}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">
                    {club.name}
                  </h3>
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full font-medium">
                    {club.type}
                  </span>
                </div>

                <p className="text-sm text-gray-600 text-center mb-4">
                  {club.description}
                </p>

                <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{club.members} thành viên</span>
                  </div>
                </div>

                <div className="text-xs text-gray-500 text-center mb-4">
                  <p>Điều phối: {club.coordinator}</p>
                  <p>{club.contactEmail}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {club.isActive ? (
                    <>
                      <button className="flex-1 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition text-sm font-semibold inline-flex items-center justify-center gap-2">
                        <XCircle className="w-4 h-4" />
                        Ẩn
                      </button>
                      <button className="flex-1 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition text-sm font-semibold inline-flex items-center justify-center gap-2">
                        <Eye className="w-4 h-4" />
                        Chi tiết
                      </button>
                    </>
                  ) : (
                    <button className="w-full bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition text-sm font-semibold inline-flex items-center justify-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Duyệt CLB
                    </button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

