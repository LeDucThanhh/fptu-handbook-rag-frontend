import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Calendar, CheckCircle, X } from "lucide-react";
import { mockNotifications } from "@/services/mock/mockData";

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "all") return true;
    if (filter === "unread") return !notif.isRead;
    if (filter === "read") return notif.isRead;
    return true;
  });

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Bell className="w-8 h-8 text-orange-500" />
            Trung tâm thông báo
          </h1>
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition text-sm font-semibold"
          >
            <CheckCircle className="w-4 h-4" />
            Đánh dấu tất cả đã đọc
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="inline-flex rounded-lg border border-gray-300 bg-white p-1 mb-6">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === "all"
                ? "bg-orange-500 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Tất cả ({notifications.length})
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === "unread"
                ? "bg-orange-500 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Chưa đọc ({notifications.filter((n) => !n.isRead).length})
          </button>
          <button
            onClick={() => setFilter("read")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === "read"
                ? "bg-orange-500 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Đã đọc ({notifications.filter((n) => n.isRead).length})
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`hover:shadow-lg transition cursor-pointer ${
                !notification.isRead ? "border-l-4 border-l-orange-500" : ""
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
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
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-gray-900 text-lg">
                            {notification.title}
                          </h3>
                          {!notification.isRead && (
                            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                          )}
                        </div>

                        <p className="text-gray-600 text-sm mb-3">
                          {notification.content}
                        </p>

                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{notification.date}</span>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded-full font-semibold ${
                              notification.priority === "high"
                                ? "bg-red-100 text-red-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {notification.priority === "high"
                              ? "Quan trọng"
                              : "Bình thường"}
                          </span>
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full font-semibold">
                            {notification.type}
                          </span>
                          <span className="text-gray-500">
                            {notification.targetAudience}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {notification.isRead && (
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 ml-4" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredNotifications.length === 0 && (
          <Card>
            <CardContent className="py-16 text-center">
              <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">
                Không có thông báo nào
              </p>
              <p className="text-sm text-gray-400">
                {filter === "unread"
                  ? "Bạn đã đọc hết thông báo"
                  : "Chưa có thông báo mới"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}


