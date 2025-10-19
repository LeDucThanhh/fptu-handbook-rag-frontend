import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SimpleChart } from "@/components/ui/simple-chart";
import {
  BarChart3,
  TrendingUp,
  Users,
  BookOpen,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";

// Mock data for demonstration
const mockData = {
  topQueryTopics: [
    { topic: "Học phí & Học bổng", count: 156, trend: "+12%" },
    { topic: "Quy trình đăng ký môn học", count: 134, trend: "+8%" },
    { topic: "Lịch thi & Lịch học", count: 98, trend: "+15%" },
    { topic: "Quy định tốt nghiệp", count: 87, trend: "+5%" },
    { topic: "Hỗ trợ sinh viên", count: 76, trend: "+22%" },
  ],
  feedbackAccuracy: {
    correct: 78,
    incorrect: 22,
    total: 100,
  },
  trendingSections: [
    { section: "Admission", views: 1240, accuracy: 85 },
    { section: "Tuition", views: 1156, accuracy: 92 },
    { section: "Academic Rules", views: 987, accuracy: 78 },
    { section: "Student Services", views: 856, accuracy: 88 },
  ],
  insights: [
    {
      type: "warning",
      title: "Thiếu nội dung về học bổng",
      description: "Nhiều câu hỏi về học bổng không được trả lời chính xác",
      count: 23,
    },
    {
      type: "info",
      title: "Cần cập nhật quy trình đăng ký",
      description:
        "Quy trình đăng ký môn học đã thay đổi nhưng chưa được cập nhật",
      count: 15,
    },
    {
      type: "success",
      title: "Nội dung về lịch thi được cập nhật tốt",
      description: "Tỷ lệ chính xác cao và ít câu hỏi không được trả lời",
      count: 2,
    },
  ],
};

const Analytics = () => {
  const [timeFilter, setTimeFilter] = useState("week");
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleExport = () => {
    // Export functionality
    console.log("Exporting analytics data...");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Mentor Analytics Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Theo dõi xu hướng hỏi-đáp của sinh viên để phát hiện lỗ hổng nội
              dung
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              <RefreshCw
                className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
              />
              Làm mới
            </Button>
            <Button onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Xuất báo cáo
            </Button>
          </div>
        </div>

        {/* Time Filter */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <span className="font-medium">Bộ lọc thời gian:</span>
              <div className="flex gap-2">
                {["week", "month", "semester"].map((period) => (
                  <Button
                    key={period}
                    variant={timeFilter === period ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTimeFilter(period)}
                  >
                    {period === "week"
                      ? "Tuần"
                      : period === "month"
                      ? "Tháng"
                      : "Học kỳ"}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Top Query Topics */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Top Query Topics
              </CardTitle>
              <CardDescription>
                Chủ đề được hỏi nhiều nhất trong{" "}
                {timeFilter === "week"
                  ? "tuần"
                  : timeFilter === "month"
                  ? "tháng"
                  : "học kỳ"}{" "}
                này
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Chart */}
                <div className="h-48">
                  <SimpleChart
                    data={mockData.topQueryTopics.map((item, index) => ({
                      label: item.topic,
                      value: item.count,
                      color: `hsl(${index * 60 + 200}, 70%, 50%)`,
                    }))}
                    type="bar"
                    className="h-full"
                  />
                </div>

                {/* List */}
                <div className="space-y-3">
                  {mockData.topQueryTopics.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{item.topic}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.count} câu hỏi
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-orange-600 font-medium">
                          {item.trend}
                        </span>
                        <TrendingUp className="w-4 h-4 text-orange-600" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feedback Accuracy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Feedback Accuracy
              </CardTitle>
              <CardDescription>
                Tỷ lệ trả lời đúng/sai theo người dùng
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">
                    {mockData.feedbackAccuracy.correct}%
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Tỷ lệ chính xác
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Chính xác</span>
                    <span>{mockData.feedbackAccuracy.correct}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${mockData.feedbackAccuracy.correct}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Không chính xác</span>
                    <span>{mockData.feedbackAccuracy.incorrect}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-destructive h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${mockData.feedbackAccuracy.incorrect}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trending Handbook Sections */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Trending Handbook Sections
              </CardTitle>
              <CardDescription>
                Các phần sổ tay đang được truy cập nhiều
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Chart */}
                <div className="flex justify-center">
                  <SimpleChart
                    data={mockData.trendingSections.map((section, index) => ({
                      label: section.section,
                      value: section.views,
                      color: `hsl(${index * 90 + 120}, 70%, 50%)`,
                    }))}
                    type="pie"
                    className="w-48 h-48"
                  />
                </div>

                {/* List */}
                <div className="space-y-3">
                  {mockData.trendingSections.map((section, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg border"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{section.section}</p>
                          <p className="text-sm text-muted-foreground">
                            {section.views} lượt xem
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-primary">
                          {section.accuracy}%
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Độ chính xác
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Insight Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Insight Summary
              </CardTitle>
              <CardDescription>
                Top vấn đề hoặc khu vực thiếu nội dung
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.insights.map((insight, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg border-l-4 border-l-primary/20 bg-muted/30"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          insight.type === "warning"
                            ? "bg-warning/20"
                            : insight.type === "info"
                            ? "bg-info/20"
                            : "bg-success/20"
                        }`}
                      >
                        {insight.type === "warning" ? (
                          <AlertCircle className="w-4 h-4 text-warning" />
                        ) : insight.type === "info" ? (
                          <Clock className="w-4 h-4 text-info" />
                        ) : (
                          <CheckCircle className="w-4 h-4 text-success" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{insight.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {insight.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            {insight.count} vấn đề
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
