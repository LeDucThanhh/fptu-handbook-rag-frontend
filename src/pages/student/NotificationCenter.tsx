import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Calendar, CheckCircle, MapPin } from "lucide-react";
import { mockNotifications, mockSchoolEvents } from "@/services/mock/mockData";

export default function NotificationCenter() {
  // Combine notifications and events
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<"all" | "notifications" | "events">(
    "all"
  );

  // Convert events to notification format
  const eventsAsNotifications = mockSchoolEvents.map((event) => ({
    id: event.id,
    title: event.title,
    content: `${event.description}\n📍 ${event.location}\n🕐 ${event.time}`,
    type: event.type,
    priority: event.priority,
    date: event.date,
    isRead: false,
    targetAudience: event.targetAudience,
  }));

  const allItems = [...notifications, ...eventsAsNotifications];

  const filteredNotifications = allItems.filter((item) => {
    if (filter === "all") return true;
    if (filter === "notifications") return item.type !== "Sự kiện";
    if (filter === "events") return item.type === "Sự kiện";
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="relative flex items-center justify-between">
            <div>
              <h1
                className="text-3xl font-bold mb-2"
                style={{ fontFamily: "SVN-Product Sans, Inter, sans-serif" }}
              >
                Trung tâm thông báo 🔔
              </h1>
              <p className="text-orange-100">
                Thông báo và sự kiện từ nhà trường
              </p>
            </div>
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all text-sm font-semibold"
            >
              <CheckCircle className="w-4 h-4" />
              Đánh dấu đã đọc
            </button>
          </div>
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
            Tất cả ({allItems.length})
          </button>
          <button
            onClick={() => setFilter("notifications")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === "notifications"
                ? "bg-orange-500 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            📢 Thông báo ({notifications.length})
          </button>
          <button
            onClick={() => setFilter("events")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === "events"
                ? "bg-orange-500 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            📅 Sự kiện ({eventsAsNotifications.length})
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
                          notification.type === "Sự kiện"
                            ? "bg-blue-100"
                            : notification.priority === "high"
                            ? "bg-red-100"
                            : "bg-orange-100"
                        }`}
                      >
                        {notification.type === "Sự kiện" ? (
                          <Calendar className="w-6 h-6 text-blue-600" />
                        ) : (
                          <Bell
                            className={`w-6 h-6 ${
                              notification.priority === "high"
                                ? "text-red-600"
                                : "text-orange-600"
                            }`}
                          />
                        )}
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
