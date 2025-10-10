import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Eye, MessageCircle, BarChart } from "lucide-react";

export default function EngagementDashboard() {
  const topClubs = [
    { name: "FPTU Code", members: 250, growth: "+15%" },
    { name: "FPTU Business", members: 200, growth: "+12%" },
    { name: "FPTU Football", members: 180, growth: "+8%" },
    { name: "FPTU Music", members: 120, growth: "+10%" },
    { name: "FPTU Dance", members: 95, growth: "+5%" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-8 mb-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Engagement Dashboard</h1>
          <p className="text-teal-100">
            Theo dõi tương tác sinh viên và mức độ quan tâm CLB
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tổng lượt xem</p>
                  <p className="text-3xl font-bold text-gray-900">12.5K</p>
                  <p className="text-xs text-green-600 mt-1">+18% tuần này</p>
                </div>
                <Eye className="w-10 h-10 text-blue-300" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tham gia CLB</p>
                  <p className="text-3xl font-bold text-gray-900">845</p>
                  <p className="text-xs text-green-600 mt-1">+12% tháng này</p>
                </div>
                <Users className="w-10 h-10 text-purple-300" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tương tác</p>
                  <p className="text-3xl font-bold text-gray-900">3.2K</p>
                  <p className="text-xs text-green-600 mt-1">+8% tuần này</p>
                </div>
                <MessageCircle className="w-10 h-10 text-orange-300" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Engagement Rate</p>
                  <p className="text-3xl font-bold text-gray-900">78%</p>
                  <p className="text-xs text-gray-400 mt-1">Trung bình</p>
                </div>
                <TrendingUp className="w-10 h-10 text-green-300" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Clubs */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="w-5 h-5 text-teal-500" />
              Top CLB theo thành viên
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topClubs.map((club, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {club.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-gray-900">
                        {club.members}
                      </span>
                      <span className="text-xs font-semibold text-green-600">
                        {club.growth}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-teal-400 to-teal-600 h-2 rounded-full transition-all"
                      style={{ width: `${(club.members / 250) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Engagement by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Mức độ quan tâm theo loại CLB</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 text-center">
                <div className="text-4xl mb-2">📚</div>
                <p className="text-2xl font-bold text-blue-600">450</p>
                <p className="text-sm text-gray-600 mt-1">Học thuật</p>
              </div>

              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
                <div className="text-4xl mb-2">⚽</div>
                <p className="text-2xl font-bold text-green-600">275</p>
                <p className="text-sm text-gray-600 mt-1">Thể thao</p>
              </div>

              <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6 text-center">
                <div className="text-4xl mb-2">🎭</div>
                <p className="text-2xl font-bold text-purple-600">215</p>
                <p className="text-sm text-gray-600 mt-1">Nghệ thuật</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

