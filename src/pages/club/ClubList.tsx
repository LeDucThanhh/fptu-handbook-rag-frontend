import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, TrendingUp, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockClubs } from "@/services/mock/mockData";

export default function ClubList() {
  const navigate = useNavigate();

  const quickStats = [
    {
      label: "Tổng số CLB",
      value: mockClubs.length.toString(),
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      label: "Tổng thành viên",
      value: mockClubs.reduce((sum, club) => sum + club.members, 0).toString(),
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      label: "Sự kiện tháng này",
      value: "12",
      icon: Calendar,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-screen-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">
              Quản lý Câu lạc bộ
            </h1>
            <p className="text-xl text-muted-foreground mt-2">
              Quản lý thông tin và hoạt động của các CLB
            </p>
          </div>
          <button className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold">
            <Plus className="w-5 h-5" />
            Tạo CLB mới
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={index}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {stat.label}
                      </p>
                      <p className="text-3xl font-bold text-foreground">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`${stat.bgColor} p-4 rounded-xl`}>
                      <Icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Clubs List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Danh sách Câu lạc bộ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockClubs.map((club) => (
                <Card
                  key={club.id}
                  className="hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1"
                  onClick={() => navigate(`/club/detail/${club.id}`)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">
                          {club.name}
                        </CardTitle>
                        <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
                          {club.type}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {club.description}
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>{club.members} thành viên</span>
                      </div>
                      <div className="text-muted-foreground">
                        <span className="font-semibold">Điều phối viên:</span>{" "}
                        {club.coordinator}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

