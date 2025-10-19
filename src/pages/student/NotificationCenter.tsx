import { useState } from "react";
import { Bell, Calendar, CheckCircle, Filter, Search } from "lucide-react";
import { mockNotifications, mockSchoolEvents } from "@/services/mock/mockData";
import { PageContainer } from "@/components/layout/PageContainer";
import { Section } from "@/components/layout/Section";
import { ProfessionalCard } from "@/components/layout/ProfessionalCard";
import RoleHeader from "@/components/layout/RoleHeader";
import { DESIGN_TOKENS, BUTTON_VARIANTS } from "@/design-system/tokens";

export default function NotificationCenter() {
  // Combine notifications and events
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<"all" | "notifications" | "events">(
    "all"
  );
  const [searchQuery, setSearchQuery] = useState("");

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
    // Filter by type
    const matchesFilter =
      filter === "all" ||
      (filter === "notifications" && item.type !== "Sự kiện") ||
      (filter === "events" && item.type === "Sự kiện");

    // Filter by search query
    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
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
    <PageContainer>
      <Section>
        {/* Role-specific Header */}
        <RoleHeader
          title="Trung tâm Thông báo"
          description="Quản lý thông báo và sự kiện từ nhà trường"
          icon={<Bell className="w-8 h-8 text-white" />}
        />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button
            onClick={markAllAsRead}
            className={`${BUTTON_VARIANTS.primary} flex items-center gap-2`}
          >
            <CheckCircle className="w-4 h-4" />
            Đánh dấu tất cả đã đọc
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm thông báo..."
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-all bg-white shadow-sm"
          />
        </div>

        {/* Professional Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {[
            {
              key: "all",
              label: "Tất cả",
              count: allItems.length,
              icon: Filter,
            },
            {
              key: "notifications",
              label: "Thông báo",
              count: notifications.length,
              icon: Bell,
            },
            {
              key: "events",
              label: "Sự kiện",
              count: eventsAsNotifications.length,
              icon: Calendar,
            },
          ].map(({ key, label, count, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setFilter(key as any)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all
                ${
                  filter === key
                    ? "bg-orange-500 text-white shadow-lg transform scale-105"
                    : "bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-600 border-2 border-gray-200 hover:border-orange-300"
                }
              `}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs ${
                  filter === key
                    ? "bg-white/20 text-white"
                    : "bg-orange-100 text-orange-600"
                }`}
              >
                {count}
              </span>
            </button>
          ))}
        </div>

        {/* Professional Notifications List */}
        <div className="space-y-6">
          {filteredNotifications.map((notification) => (
            <ProfessionalCard
              key={notification.id}
              onClick={() => markAsRead(notification.id)}
              className={`${
                !notification.isRead ? "border-l-4 border-l-orange-500" : ""
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className={`
                  w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0
                  ${
                    notification.type === "Sự kiện"
                      ? "bg-gradient-to-br from-orange-100 to-orange-200"
                      : notification.priority === "high"
                      ? "bg-gradient-to-br from-red-100 to-red-200"
                      : "bg-gradient-to-br from-orange-100 to-orange-200"
                  }
                `}
                >
                  {notification.type === "Sự kiện" ? (
                    <Calendar className="w-7 h-7 text-orange-600" />
                  ) : (
                    <Bell
                      className={`w-7 h-7 ${
                        notification.priority === "high"
                          ? "text-red-600"
                          : "text-orange-600"
                      }`}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3
                          className={`${DESIGN_TOKENS.typography.heading4} ${DESIGN_TOKENS.colors.text.primary}`}
                        >
                          {notification.title}
                        </h3>
                        {!notification.isRead && (
                          <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                        )}
                      </div>

                      <p
                        className={`${DESIGN_TOKENS.typography.body} ${DESIGN_TOKENS.colors.text.secondary} mb-4`}
                      >
                        {notification.content}
                      </p>
                    </div>

                    {notification.isRead && (
                      <CheckCircle className="w-6 h-6 text-orange-500 flex-shrink-0 ml-4" />
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{notification.date}</span>
                    </div>

                    <span
                      className={`
                      px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        notification.priority === "high"
                          ? "bg-red-100 text-red-700"
                          : "bg-orange-100 text-orange-700"
                      }
                    `}
                    >
                      {notification.priority === "high"
                        ? "Quan trọng"
                        : "Bình thường"}
                    </span>

                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                      {notification.type}
                    </span>

                    <span className="text-sm text-gray-500">
                      {notification.targetAudience}
                    </span>
                  </div>
                </div>
              </div>
            </ProfessionalCard>
          ))}
        </div>

        {/* Professional Empty State */}
        {filteredNotifications.length === 0 && (
          <ProfessionalCard className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Bell className="w-10 h-10 text-orange-500" />
            </div>
            <h3
              className={`${DESIGN_TOKENS.typography.heading3} ${DESIGN_TOKENS.colors.text.primary} mb-2`}
            >
              Không có thông báo nào
            </h3>
            <p
              className={`${DESIGN_TOKENS.typography.body} ${DESIGN_TOKENS.colors.text.secondary}`}
            >
              {searchQuery
                ? "Không tìm thấy thông báo phù hợp với từ khóa tìm kiếm"
                : filter === "notifications"
                ? "Chưa có thông báo mới từ nhà trường"
                : filter === "events"
                ? "Chưa có sự kiện sắp tới"
                : "Bạn đã xem hết tất cả thông báo"}
            </p>
          </ProfessionalCard>
        )}
      </Section>
    </PageContainer>
  );
}
