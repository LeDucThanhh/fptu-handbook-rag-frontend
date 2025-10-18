import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Users, TrendingUp, Eye, Edit } from "lucide-react";
import { mockClubs } from "@/services/mock/mockData";

export default function ClubList() {
  // Giả sử Club Coordinator có thể quản lý nhiều clubs
  const [myClubs] = useState(mockClubs.slice(0, 2)); // Mock: quản lý 2 clubs
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="relative">
            <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "SVN-Product Sans, Inter, sans-serif" }}>
              Quản lý Câu lạc bộ 🎭
            </h1>
            <p className="text-orange-100">
              Danh sách các câu lạc bộ bạn đang quản lý
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">CLB quản lý</p>
                  <p className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">{myClubs.length}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Tổng thành viên</p>
                <p className="text-4xl font-bold text-gray-900">
                  {myClubs.reduce((sum, c) => sum + c.members, 0)}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Tăng trưởng</p>
                <p className="text-4xl font-bold text-green-600">+12%</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Engagement</p>
                <p className="text-4xl font-bold text-teal-600">85%</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Clubs List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myClubs.map((club) => (
            <Card
              key={club.id}
              className="hover:shadow-xl transition cursor-pointer"
              onClick={() => navigate(`/club/detail/${club.id}`)}
            >
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-20 h-20 bg-gradient-to-br from-${club.color}-400 to-${club.color}-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}
                  >
                    <span className="text-4xl">{club.icon}</span>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{club.name}</h3>
                    <span className="text-xs px-3 py-1 bg-pink-100 text-pink-700 rounded-full font-semibold">
                      {club.type}
                    </span>
                    <p className="text-sm text-gray-600 mt-3 mb-4">{club.description}</p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <Users className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                        <p className="text-xl font-bold text-gray-900">{club.members}</p>
                        <p className="text-xs text-gray-600">Thành viên</p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-green-600 mx-auto mb-1" />
                        <p className="text-xl font-bold text-green-600">+15%</p>
                        <p className="text-xs text-gray-600">Tăng trưởng</p>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <Eye className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                        <p className="text-xl font-bold text-gray-900">2.5K</p>
                        <p className="text-xs text-gray-600">Lượt xem</p>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/club/detail/${club.id}`);
                      }}
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all font-semibold inline-flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Edit className="w-4 h-4" />
                      Quản lý CLB này
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}



