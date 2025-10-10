import { useAuthStore } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  MessageCircle,
  ThumbsUp,
  Clock,
  BarChart,
} from "lucide-react";
import { mockAnalyticsData } from "@/services/mock/mockData";

export default function MentorAnalytics() {
  const { user } = useAuthStore();
  const { popularTopics, queryTrends, userSatisfaction } = mockAnalyticsData;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 mb-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-green-100">
            Theo dõi xu hướng câu hỏi và mức độ hài lòng của sinh viên
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tổng câu hỏi</p>
                  <p className="text-3xl font-bold text-gray-900">1,520</p>
                  <p className="text-xs text-green-600 mt-1">+12% tuần này</p>
                </div>
                <MessageCircle className="w-10 h-10 text-blue-300" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Đã giải quyết</p>
                  <p className="text-3xl font-bold text-gray-900">1,420</p>
                  <p className="text-xs text-green-600 mt-1">93.4%</p>
                </div>
                <ThumbsUp className="w-10 h-10 text-green-300" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Phản hồi tích cực</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {userSatisfaction.positive}
                  </p>
                  <p className="text-xs text-green-600 mt-1">89% hài lòng</p>
                </div>
                <TrendingUp className="w-10 h-10 text-orange-300" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Thời gian phản hồi</p>
                  <p className="text-3xl font-bold text-gray-900">2.5h</p>
                  <p className="text-xs text-gray-400 mt-1">Trung bình</p>
                </div>
                <Clock className="w-10 h-10 text-purple-300" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Popular Topics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="w-5 h-5 text-orange-500" />
                Chủ đề phổ biến
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {popularTopics.map((topic, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        {topic.topic}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-gray-900">
                          {topic.count}
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
                        className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all"
                        style={{ width: `${(topic.count / 1250) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Query Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Xu hướng câu hỏi (7 ngày)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {queryTrends.map((day, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-xs text-gray-600 w-20">
                      {day.date.slice(5)}
                    </span>
                    <div className="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full flex items-center justify-end pr-2 transition-all"
                        style={{ width: `${(day.count / 650) * 100}%` }}
                      >
                        <span className="text-xs font-bold text-white">
                          {day.count}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Satisfaction */}
        <Card>
          <CardHeader>
            <CardTitle>Mức độ hài lòng của sinh viên</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
                <div className="text-4xl mb-2">😊</div>
                <p className="text-3xl font-bold text-green-600">
                  {userSatisfaction.positive}
                </p>
                <p className="text-sm text-gray-600 mt-1">Phản hồi tích cực</p>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 text-center">
                <div className="text-4xl mb-2">😐</div>
                <p className="text-3xl font-bold text-yellow-600">
                  {userSatisfaction.neutral}
                </p>
                <p className="text-sm text-gray-600 mt-1">Trung lập</p>
              </div>

              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 text-center">
                <div className="text-4xl mb-2">😞</div>
                <p className="text-3xl font-bold text-red-600">
                  {userSatisfaction.negative}
                </p>
                <p className="text-sm text-gray-600 mt-1">Cần cải thiện</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

