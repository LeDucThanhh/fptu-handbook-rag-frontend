import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Plus, Edit, Trash2, Users } from "lucide-react";
import { mockClubActivities } from "@/services/mock/mockData";

export default function ActivityManagement() {
  const [activities] = useState(mockClubActivities.filter((a) => a.clubId === "club-001"));

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl p-8 mb-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Quản lý hoạt động</h1>
          <p className="text-pink-100">CRUD hoạt động, gửi duyệt, public sự kiện</p>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-900">
                    Tổng hoạt động: {activities.length}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <button className="bg-pink-500 text-white px-6 py-2.5 rounded-lg hover:bg-pink-600 transition font-semibold inline-flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Tạo hoạt động mới
          </button>
        </div>

        <div className="space-y-4">
          {activities.map((activity) => (
            <Card key={activity.id} className="hover:shadow-lg transition">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-lg flex flex-col items-center justify-center text-white flex-shrink-0">
                    <span className="text-lg font-bold">{activity.date.split("-")[2]}</span>
                    <span className="text-xs">THG {activity.date.split("-")[1]}</span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">
                          {activity.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {activity.description}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          activity.status === "upcoming"
                            ? "bg-blue-100 text-blue-700"
                            : activity.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {activity.status === "upcoming"
                          ? "Sắp diễn ra"
                          : activity.status === "completed"
                          ? "Đã hoàn thành"
                          : "Đang diễn ra"}
                      </span>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{activity.time}</span>
                      </div>
                      <div>
                        <span>{activity.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>
                          {activity.registrations}/{activity.maxParticipants}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition text-sm font-semibold inline-flex items-center gap-2">
                        <Edit className="w-4 h-4" />
                        Chỉnh sửa
                      </button>
                      <button className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition text-sm font-semibold inline-flex items-center gap-2">
                        <Trash2 className="w-4 h-4" />
                        Xóa
                      </button>
                    </div>
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



