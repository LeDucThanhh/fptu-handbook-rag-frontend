import { useState } from "react";
import { mockNotifications, mockSchoolEvents } from "@/services/mock/mockData";
import {
  Tabs,
  Badge,
  List,
  Card,
  Input,
  Button,
  Tag,
  Space,
  Statistic,
  Row,
  Col,
} from "antd";
import {
  BellOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  SearchOutlined,
  AlertOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

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

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Cao":
        return "red";
      case "Trung bình":
        return "orange";
      case "Thấp":
        return "blue";
      default:
        return "default";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Học vụ":
        return "orange";
      case "Sự kiện":
        return "blue";
      case "Học bổng":
        return "green";
      case "Thông báo":
        return "purple";
      default:
        return "default";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Trung tâm Thông báo
          </h1>
          <p className="text-lg text-gray-600">
            Quản lý thông báo và sự kiện từ nhà trường
          </p>
        </div>

        {/* Quick Stats */}
        <Row gutter={[16, 16]} className="mb-8">
          <Col xs={24} sm={8}>
            <Card hoverable>
              <Statistic
                title="Chưa đọc"
                value={unreadCount}
                prefix={<BellOutlined style={{ color: "#f97316" }} />}
                valueStyle={{ color: "#f97316" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card hoverable>
              <Statistic
                title="Tổng thông báo"
                value={allItems.length}
                prefix={<AlertOutlined style={{ color: "#3b82f6" }} />}
                valueStyle={{ color: "#3b82f6" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card hoverable>
              <Statistic
                title="Sự kiện"
                value={eventsAsNotifications.length}
                prefix={<CalendarOutlined style={{ color: "#10b981" }} />}
                valueStyle={{ color: "#10b981" }}
              />
            </Card>
          </Col>
        </Row>

        {/* Filters and Search */}
        <Card>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Filter Tabs */}
              <Space>
                <Button
                  type={filter === "all" ? "primary" : "default"}
                  onClick={() => setFilter("all")}
                >
                  Tất cả ({allItems.length})
                </Button>
                <Button
                  type={filter === "notifications" ? "primary" : "default"}
                  onClick={() => setFilter("notifications")}
                >
                  Thông báo ({notifications.length})
                </Button>
                <Button
                  type={filter === "events" ? "primary" : "default"}
                  onClick={() => setFilter("events")}
                >
                  Sự kiện ({eventsAsNotifications.length})
                </Button>
              </Space>

              {/* Mark All as Read Button */}
              <Button
                type="primary"
                icon={<CheckCircleOutlined />}
                onClick={markAllAsRead}
                danger
              >
                Đánh dấu tất cả đã đọc
              </Button>
            </div>

            {/* Search Bar */}
            <Input
              size="large"
              placeholder="Tìm kiếm thông báo..."
              prefix={<SearchOutlined />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              allowClear
            />
          </Space>
        </Card>

        {/* Notifications List */}
        <List
          itemLayout="vertical"
          size="large"
          dataSource={filteredNotifications}
          locale={{
            emptyText: (
              <div className="text-center py-12">
                <BellOutlined style={{ fontSize: 48, color: "#d1d5db" }} />
                <p className="text-gray-500 mt-4">Không có thông báo nào</p>
              </div>
            ),
          }}
          renderItem={(notification) => (
            <List.Item
              key={notification.id}
              onClick={() => markAsRead(notification.id)}
              style={{
                cursor: "pointer",
                backgroundColor: !notification.isRead ? "#fff7ed" : "white",
                borderLeft: !notification.isRead
                  ? "4px solid #f97316"
                  : "4px solid transparent",
                marginBottom: 16,
                borderRadius: 8,
                padding: 16,
              }}
              className="hover:shadow-md transition-all"
            >
              <List.Item.Meta
                avatar={
                  notification.type === "Sự kiện" ? (
                    <CalendarOutlined
                      style={{ fontSize: 32, color: "#10b981" }}
                    />
                  ) : (
                    <BellOutlined
                      style={{
                        fontSize: 32,
                        color:
                          notification.priority === "Cao"
                            ? "#ef4444"
                            : "#f97316",
                      }}
                    />
                  )
                }
                title={
                  <Space>
                    <span className="font-semibold">{notification.title}</span>
                    {!notification.isRead && (
                      <Badge status="processing" text="Mới" />
                    )}
                    {notification.isRead && (
                      <CheckCircleOutlined style={{ color: "#10b981" }} />
                    )}
                  </Space>
                }
                description={
                  <Space direction="vertical" size="small">
                    <p className="whitespace-pre-line">
                      {notification.content}
                    </p>
                    <Space wrap>
                      <Tag icon={<ClockCircleOutlined />} color="default">
                        {notification.date}
                      </Tag>
                      <Tag color={getTypeColor(notification.type)}>
                        {notification.type}
                      </Tag>
                      <Tag color={getPriorityColor(notification.priority)}>
                        {notification.priority}
                      </Tag>
                    </Space>
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}
