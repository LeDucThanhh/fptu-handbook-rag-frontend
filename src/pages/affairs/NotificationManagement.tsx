import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Send, Users, Calendar, Plus } from "lucide-react";
import { mockNotifications } from "@/services/mock/mockData";

export default function NotificationManagement() {
  const [notifications] = useState(mockNotifications);
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-8 mb-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Quản lý Thông báo</h1>
          <p className="text-teal-100">
            Gửi thông báo, chọn nhóm đối tượng và thống kê mở
          </p>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-900">
                    Tổng thông báo: {notifications.length}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-teal-500 text-white px-6 py-2.5 rounded-lg hover:bg-teal-600 transition font-semibold inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Tạo thông báo mới
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className="hover:shadow-lg transition"
            >
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      notification.priority === "high"
                        ? "bg-red-100"
                        : "bg-blue-100"
                    }`}
                  >
                    <Bell
                      className={`w-6 h-6 ${
                        notification.priority === "high"
                          ? "text-red-600"
                          : "text-blue-600"
                      }`}
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-gray-900 text-lg">
                        {notification.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            notification.priority === "high"
                              ? "bg-red-100 text-red-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {notification.priority === "high"
                            ? "Ưu tiên cao"
                            : "Bình thường"}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-3">
                      {notification.content}
                    </p>

                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{notification.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{notification.targetAudience}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-teal-600">
                          {notification.type}
                        </span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-gray-900">
                            1,234
                          </p>
                          <p className="text-xs text-gray-500">Đã gửi</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-teal-600">
                            980
                          </p>
                          <p className="text-xs text-gray-500">Đã đọc</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-orange-600">
                            79%
                          </p>
                          <p className="text-xs text-gray-500">Tỷ lệ mở</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Create Modal Preview */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-2xl w-full">
              <CardHeader>
                <CardTitle>Tạo thông báo mới</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tiêu đề
                    </label>
                    <input
                      type="text"
                      placeholder="Nhập tiêu đề thông báo..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nội dung
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Nhập nội dung thông báo..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-teal-500 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Đối tượng
                      </label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-teal-500">
                        <option>Tất cả sinh viên</option>
                        <option>Sinh viên năm 1</option>
                        <option>Sinh viên năm 2+</option>
                        <option>Nhóm cụ thể</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mức độ ưu tiên
                      </label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-teal-500">
                        <option>Bình thường</option>
                        <option>Ưu tiên cao</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 mt-6">
                    <button
                      onClick={() => setShowCreateModal(false)}
                      className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    >
                      Hủy
                    </button>
                    <button className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition font-semibold inline-flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Gửi thông báo
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



