import { Card } from "antd";
import {
  TrendingUp,
  Users,
  Eye,
  MessageCircle,
  BarChart,
  Bell,
} from "lucide-react";

export default function EngagementDashboard() {
  const topClubs = [
    { name: "FPTU Code", members: 250, growth: "+15%", engagement: 92 },
    { name: "FPTU Business", members: 200, growth: "+12%", engagement: 88 },
    { name: "FPTU Football", members: 180, growth: "+8%", engagement: 85 },
    { name: "FPTU Music", members: 120, growth: "+10%", engagement: 78 },
    { name: "FPTU Dance", members: 95, growth: "+5%", engagement: 75 },
  ];

  const engagementByCategory = [
    { category: "Học thuật", members: 450, clubs: 8, avgEngagement: 85 },
    { category: "Thể thao", members: 275, clubs: 6, avgEngagement: 82 },
    { category: "Nghệ thuật", members: 215, clubs: 5, avgEngagement: 79 },
    { category: "Tình nguyện", members: 180, clubs: 4, avgEngagement: 88 },
  ];

  const weeklyStats = [
    { day: "T2", views: 450, interactions: 120 },
    { day: "T3", views: 520, interactions: 145 },
    { day: "T4", views: 480, interactions: 132 },
    { day: "T5", views: 550, interactions: 168 },
    { day: "T6", views: 610, interactions: 195 },
    { day: "T7", views: 580, interactions: 178 },
    { day: "CN", views: 420, interactions: 98 },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-screen-2xl mx-auto space-y-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Engagement Dashboard</h1>
          <p className="text-gray-600">
            Theo dõi tương tác và hoạt động sinh viên
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-md">
            <div className="pt-6 px-6 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Lượt xem tuần này</p>
                  <p className="text-3xl font-bold text-gray-900">12.5K</p>
                  <p className="text-xs text-orange-600 mt-1">
                    +18% so với tuần trước
                  </p>
                </div>
                <Eye className="w-10 h-10 text-orange-400" />
              </div>
            </div>
          </Card>

          <Card className="shadow-md">
            <div className="pt-6 px-6 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tham gia CLB</p>
                  <p className="text-3xl font-bold text-gray-900">845</p>
                  <p className="text-xs text-orange-600 mt-1">+12% tháng này</p>
                </div>
                <Users className="w-10 h-10 text-orange-400" />
              </div>
            </div>
          </Card>

          <Card className="shadow-md">
            <div className="pt-6 px-6 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tương tác</p>
                  <p className="text-3xl font-bold text-gray-900">3.2K</p>
                  <p className="text-xs text-orange-600 mt-1">+8% tuần này</p>
                </div>
                <MessageCircle className="w-10 h-10 text-orange-400" />
              </div>
            </div>
          </Card>

          <Card className="shadow-md">
            <div className="pt-6 px-6 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Engagement Rate</p>
                  <p className="text-3xl font-bold text-orange-600">78%</p>
                  <p className="text-xs text-gray-400 mt-1">Trung bình</p>
                </div>
                <TrendingUp className="w-10 h-10 text-orange-400" />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Clubs */}
          <Card
            className="shadow-md"
            title={
              <span className="flex items-center gap-2 text-lg font-semibold">
                <BarChart className="w-5 h-5 text-orange-500" />
                Top CLB theo thành viên
              </span>
            }
          >
            <div className="p-6">
              <div className="space-y-4">
                {topClubs.map((club, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
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
                        <span className="text-xs font-semibold text-orange-600">
                          {club.growth}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-orange-500 h-2 rounded-full transition-all"
                          style={{ width: `${(club.members / 250) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 w-12 text-right">
                        {club.engagement}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Weekly Engagement Trends */}
          <Card
            className="shadow-md"
            title={
              <span className="flex items-center gap-2 text-lg font-semibold">
                <TrendingUp className="w-5 h-5 text-orange-500" />
                Xu hướng tương tác (7 ngày)
              </span>
            }
          >
            <div className="p-6">
              <div className="space-y-3">
                {weeklyStats.map((day, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-xs text-gray-600 w-8 font-medium">
                      {day.day}
                    </span>
                    <div className="flex-1 space-y-1">
                      {/* Views bar */}
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-4 relative overflow-hidden">
                          <div
                            className="bg-orange-400 h-full rounded-full flex items-center justify-end pr-2"
                            style={{ width: `${(day.views / 650) * 100}%` }}
                          >
                            <span className="text-xs font-bold text-white">
                              {day.views}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500 w-12">
                          views
                        </span>
                      </div>
                      {/* Interactions bar */}
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-4 relative overflow-hidden">
                          <div
                            className="bg-orange-500 h-full rounded-full flex items-center justify-end pr-2"
                            style={{
                              width: `${(day.interactions / 200) * 100}%`,
                            }}
                          >
                            <span className="text-xs font-bold text-white">
                              {day.interactions}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500 w-12">
                          action
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Engagement by Category */}
        <Card
          className="mb-8 shadow-md"
          title={
            <span className="text-lg font-semibold">
              Mức độ quan tâm theo loại CLB
            </span>
          }
        >
          <div className="p-6">
            <div className="space-y-4">
              {engagementByCategory.map((cat, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-gray-900">
                        {cat.category}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {cat.clubs} CLB • {cat.members} thành viên
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-orange-600">
                        {cat.avgEngagement}%
                      </p>
                      <p className="text-xs text-gray-500">Engagement</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-orange-500 h-3 rounded-full transition-all"
                      style={{ width: `${cat.avgEngagement}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Notification Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            className="shadow-md"
            title={
              <span className="text-base font-semibold">Thông báo gần đây</span>
            }
          >
            <div className="p-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                  <Bell className="w-8 h-8 text-orange-500" />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">
                      Lịch thi Fall 2024
                    </p>
                    <p className="text-xs text-gray-600">Gửi: 2 giờ trước</p>
                  </div>
                  <span className="text-xs font-bold text-orange-600">89%</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                  <Bell className="w-8 h-8 text-orange-500" />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">
                      Đăng ký môn học
                    </p>
                    <p className="text-xs text-gray-600">Gửi: 1 ngày trước</p>
                  </div>
                  <span className="text-xs font-bold text-orange-600">95%</span>
                </div>
              </div>
            </div>
          </Card>

          <Card
            className="shadow-md"
            title={
              <span className="text-base font-semibold">Sự kiện sắp tới</span>
            }
          >
            <div className="p-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                  <div className="w-10 h-10 bg-orange-500 text-white rounded-lg flex flex-col items-center justify-center text-xs">
                    <span className="font-bold text-sm">15</span>
                    <span>Oct</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">
                      Tech Talk
                    </p>
                    <p className="text-xs text-gray-600">14:00 - 16:00</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                  <div className="w-10 h-10 bg-orange-500 text-white rounded-lg flex flex-col items-center justify-center text-xs">
                    <span className="font-bold text-sm">18</span>
                    <span>Oct</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">
                      Ngày hội CLB
                    </p>
                    <p className="text-xs text-gray-600">09:00 - 17:00</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card
            className="shadow-md"
            title={
              <span className="text-base font-semibold">Overall Metrics</span>
            }
          >
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">
                      Notification Open Rate
                    </span>
                    <span className="text-sm font-bold text-orange-600">
                      82%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full"
                      style={{ width: "82%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">
                      Event Participation
                    </span>
                    <span className="text-sm font-bold text-orange-600">
                      67%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full"
                      style={{ width: "67%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">
                      Club Join Rate
                    </span>
                    <span className="text-sm font-bold text-orange-600">
                      45%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full"
                      style={{ width: "45%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
