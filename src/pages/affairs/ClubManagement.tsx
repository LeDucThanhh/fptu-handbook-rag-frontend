import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  CheckCircle,
  XCircle,
  Eye,
  Search,
  Globe,
  Mail,
  Phone,
} from "lucide-react";
import { mockClubs } from "@/services/mock/mockData";

export default function ClubManagement() {
  const [clubs, setClubs] = useState(mockClubs);
  const [filter, setFilter] = useState<"all" | "active" | "pending">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClub, setSelectedClub] = useState<any>(null);

  const filteredClubs = clubs.filter((club) => {
    const matchesSearch = club.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "active" && club.isActive) ||
      (filter === "pending" && !club.isActive);
    return matchesSearch && matchesFilter;
  });

  const handleApprove = (clubId: string) => {
    setClubs(
      clubs.map((c) => (c.id === clubId ? { ...c, isActive: true } : c))
    );
    alert("Đã duyệt câu lạc bộ!");
  };

  const handleHide = (clubId: string) => {
    setClubs(
      clubs.map((c) => (c.id === clubId ? { ...c, isActive: false } : c))
    );
    alert("Đã ẩn câu lạc bộ!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Tổng CLB</p>
                <p className="text-4xl font-bold text-gray-900">
                  {clubs.length}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Đang hoạt động</p>
                <p className="text-4xl font-bold text-orange-600">
                  {clubs.filter((c) => c.isActive).length}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Chờ duyệt</p>
                <p className="text-4xl font-bold text-orange-600">
                  {clubs.filter((c) => !c.isActive).length}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Tổng thành viên</p>
                <p className="text-4xl font-bold text-gray-900">
                  {clubs.reduce((sum, c) => sum + c.members, 0)}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="inline-flex rounded-lg border border-gray-300 bg-white p-1">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === "all"
                  ? "bg-orange-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Tất cả ({clubs.length})
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === "active"
                  ? "bg-orange-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Hoạt động ({clubs.filter((c) => c.isActive).length})
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === "pending"
                  ? "bg-orange-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Chờ duyệt ({clubs.filter((c) => !c.isActive).length})
            </button>
          </div>

          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm câu lạc bộ..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-teal-500"
            />
          </div>
        </div>

        {/* Clubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClubs.map((club) => (
            <Card
              key={club.id}
              className={`hover:shadow-lg transition cursor-pointer ${
                !club.isActive ? "border-2 border-orange-300" : ""
              }`}
            >
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r from-${club.color}-400 to-${club.color}-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg`}
                  >
                    <span className="text-3xl">{club.icon}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">
                    {club.name}
                  </h3>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full font-medium">
                      {club.type}
                    </span>
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-semibold ${
                        club.isActive
                          ? "bg-orange-100 text-orange-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {club.isActive ? "Hoạt động" : "Chờ duyệt"}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 text-center mb-4 line-clamp-2">
                  {club.description}
                </p>

                <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-orange-500" />
                    <span className="font-semibold">{club.members}</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-3 h-3" />
                    <span>Điều phối: {club.coordinator}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3 h-3" />
                    <span className="truncate">{club.contactEmail}</span>
                  </div>
                  {club.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-3 h-3" />
                      <span>{club.phone}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedClub(club)}
                    className="flex-1 bg-orange-50 text-orange-600 px-3 py-2 rounded-lg hover:bg-orange-100 transition text-sm font-semibold inline-flex items-center justify-center gap-1"
                  >
                    <Eye className="w-4 h-4" />
                    Chi tiết
                  </button>
                  {club.isActive ? (
                    <button
                      onClick={() => handleHide(club.id)}
                      className="flex-1 bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100 transition text-sm font-semibold inline-flex items-center justify-center gap-1"
                    >
                      <XCircle className="w-4 h-4" />
                      Ẩn
                    </button>
                  ) : (
                    <button
                      onClick={() => handleApprove(club.id)}
                      className="flex-1 bg-orange-500 text-white px-3 py-2 rounded-lg hover:bg-orange-600 transition text-sm font-semibold inline-flex items-center justify-center gap-1"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Duyệt
                    </button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detail Modal */}
        {selectedClub && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-2xl w-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Chi tiết câu lạc bộ</CardTitle>
                  <button
                    onClick={() => setSelectedClub(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r from-${selectedClub.color}-400 to-${selectedClub.color}-600 rounded-2xl flex items-center justify-center text-3xl`}
                    >
                      {selectedClub.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {selectedClub.name}
                      </h3>
                      <span className="text-sm px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
                        {selectedClub.type}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-600 mb-1">Thành viên</p>
                      <p className="font-bold text-gray-900 text-lg">
                        {selectedClub.members}
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-600 mb-1">Trạng thái</p>
                      <p
                        className={`font-bold text-lg ${
                          selectedClub.isActive
                            ? "text-orange-600"
                            : "text-orange-600"
                        }`}
                      >
                        {selectedClub.isActive ? "Hoạt động" : "Chờ duyệt"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Mô tả
                    </p>
                    <p className="text-gray-600">{selectedClub.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 mb-1 flex items-center gap-1">
                        <Users className="w-4 h-4" /> Điều phối viên
                      </p>
                      <p className="font-semibold text-gray-900">
                        {selectedClub.coordinator}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1 flex items-center gap-1">
                        <Mail className="w-4 h-4" /> Email
                      </p>
                      <p className="font-semibold text-gray-900 truncate">
                        {selectedClub.contactEmail}
                      </p>
                    </div>
                    {selectedClub.phone && (
                      <div>
                        <p className="text-gray-600 mb-1 flex items-center gap-1">
                          <Phone className="w-4 h-4" /> Điện thoại
                        </p>
                        <p className="font-semibold text-gray-900">
                          {selectedClub.phone}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Social Links */}
                  {(selectedClub.facebookGroup ||
                    selectedClub.zaloGroup ||
                    selectedClub.instagram ||
                    selectedClub.website) && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Social Media
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selectedClub.facebookGroup && (
                          <a
                            href={selectedClub.facebookGroup}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs px-3 py-1.5 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition"
                          >
                            Facebook Group
                          </a>
                        )}
                        {selectedClub.zaloGroup && (
                          <span className="text-xs px-3 py-1.5 bg-orange-50 text-orange-600 rounded-lg">
                            Zalo Group
                          </span>
                        )}
                        {selectedClub.instagram && (
                          <a
                            href={selectedClub.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs px-3 py-1.5 bg-pink-50 text-pink-600 rounded-lg hover:bg-pink-100 transition"
                          >
                            Instagram
                          </a>
                        )}
                        {selectedClub.website && (
                          <a
                            href={selectedClub.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs px-3 py-1.5 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition flex items-center gap-1"
                          >
                            <Globe className="w-3 h-3" />
                            Website
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-4 border-t">
                    {selectedClub.isActive ? (
                      <button
                        onClick={() => {
                          handleHide(selectedClub.id);
                          setSelectedClub(null);
                        }}
                        className="flex-1 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition font-semibold inline-flex items-center justify-center gap-2"
                      >
                        <XCircle className="w-4 h-4" />
                        Ẩn CLB
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          handleApprove(selectedClub.id);
                          setSelectedClub(null);
                        }}
                        className="flex-1 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition font-semibold inline-flex items-center justify-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Duyệt CLB
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedClub(null)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
