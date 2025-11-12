import { useState } from "react";
import { Card, message } from "antd";
import {
  Bell,
  Send,
  Users,
  Calendar,
  Edit,
  Trash2,
  Eye,
  X,
} from "lucide-react";
import { mockNotifications, mockSchoolEvents } from "@/services/mock/mockData";
import ConfirmationDialog from "@/components/ui/confirmation-dialog";

interface NotificationForm {
  title: string;
  content: string;
  type: string;
  priority: "high" | "medium" | "low";
  targetAudience: string;
  scheduledDate?: string;
}

export default function NotificationManagement() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [events, setEvents] = useState(mockSchoolEvents);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createType, setCreateType] = useState<"notification" | "event">(
    "notification"
  );
  const [activeTab, setActiveTab] = useState<"notifications" | "events">(
    "notifications"
  );
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const [formData, setFormData] = useState<NotificationForm>({
    title: "",
    content: "",
    type: "Học vụ",
    priority: "medium",
    targetAudience: "Tất cả sinh viên",
  });

  const handleCreate = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      messageApi.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (createType === "notification") {
        const newNotification = {
          id: Date.now().toString(),
          title: formData.title,
          content: formData.content,
          type: formData.type,
          priority: formData.priority,
          targetAudience: formData.targetAudience,
          date: new Date().toLocaleDateString("vi-VN"),
          isRead: false,
        };
        setNotifications((prev) => [newNotification, ...prev]);
        messageApi.success(`Đã tạo thông báo "${formData.title}"`);
      } else {
        const newEvent = {
          id: Date.now().toString(),
          title: formData.title,
          description: formData.content,
          type: formData.type,
          priority: formData.priority,
          targetAudience: formData.targetAudience,
          date: new Date().toLocaleDateString("vi-VN"),
          time: "00:00",
          location: "TBA",
        };
        setEvents((prev) => [newEvent, ...prev]);
        messageApi.success(`Đã tạo sự kiện "${formData.title}"`);
      }

      setShowCreateModal(false);
      // Reset form
      setFormData({
        title: "",
        content: "",
        type: "Học vụ",
        priority: "medium",
        targetAudience: "Tất cả sinh viên",
      });
    } catch (err) {
      messageApi.error("Không thể tạo. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteItem = (item: any, type: "notification" | "event") => {
    setItemToDelete({ ...item, type });
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (itemToDelete.type === "notification") {
        setNotifications((prev) =>
          prev.filter((n) => n.id !== itemToDelete.id)
        );
        messageApi.success(`Đã xóa thông báo "${itemToDelete.title}"`);
      } else {
        setEvents((prev) => prev.filter((e) => e.id !== itemToDelete.id));
        messageApi.success(`Đã xóa sự kiện "${itemToDelete.title}"`);
      }

      setShowDeleteDialog(false);
      setItemToDelete(null);
    } catch (err) {
      messageApi.error("Không thể xóa. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditItem = (_item: any) => {
    // TODO: Implement edit functionality
    messageApi.info("Chức năng sửa sẽ được triển khai sớm");
  };

  const handleViewItem = (item: any) => {
    // TODO: Implement view functionality
    messageApi.info(`Đang xem chi tiết "${item.title}"`);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {contextHolder}
      <div className="max-w-screen-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">
            Quản lý Thông báo & Sự kiện
          </h1>
          <p className="text-gray-600">
            Tạo và quản lý thông báo, sự kiện cho sinh viên
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card className="shadow-md">
            <div className="pt-6 px-6 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tổng thông báo</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {notifications.length}
                  </p>
                </div>
                <Bell className="w-10 h-10 text-orange-300" />
              </div>
            </div>
          </Card>

          <Card className="shadow-md">
            <div className="pt-6 px-6 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Sự kiện</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {events.length}
                  </p>
                </div>
                <Calendar className="w-10 h-10 text-orange-300" />
              </div>
            </div>
          </Card>

          <Card className="shadow-md">
            <div className="pt-6 px-6 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tỷ lệ mở</p>
                  <p className="text-3xl font-bold text-orange-600">82%</p>
                </div>
                <Eye className="w-10 h-10 text-orange-300" />
              </div>
            </div>
          </Card>

          <Card className="shadow-md">
            <div className="pt-6 px-6 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Người nhận</p>
                  <p className="text-3xl font-bold text-gray-900">10.5K</p>
                </div>
                <Users className="w-10 h-10 text-orange-300" />
              </div>
            </div>
          </Card>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between mb-6">
          {/* Tabs */}
          <div className="inline-flex rounded-lg border border-gray-300 bg-white p-1">
            <button
              onClick={() => setActiveTab("notifications")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === "notifications"
                  ? "bg-orange-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              📢 Thông báo ({notifications.length})
            </button>
            <button
              onClick={() => setActiveTab("events")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === "events"
                  ? "bg-orange-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              📅 Sự kiện ({events.length})
            </button>
          </div>

          {/* Create Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                setCreateType("notification");
                setShowCreateModal(true);
              }}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition font-semibold inline-flex items-center gap-2"
            >
              <Bell className="w-4 h-4" />
              Tạo thông báo
            </button>
            <button
              onClick={() => {
                setCreateType("event");
                setShowCreateModal(true);
              }}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition font-semibold inline-flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Tạo sự kiện
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === "notifications" ? (
          /* Notifications List */
          <div className="space-y-4">
            {notifications.map((notification) => (
              <Card
                key={notification.id}
                className="hover:shadow-lg transition shadow-md"
              >
                <div className="pt-6 px-6 pb-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        notification.priority === "high"
                          ? "bg-red-100"
                          : "bg-orange-100"
                      }`}
                    >
                      <Bell
                        className={`w-6 h-6 ${
                          notification.priority === "high"
                            ? "text-red-600"
                            : "text-orange-600"
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
                                : "bg-orange-100 text-orange-700"
                            }`}
                          >
                            {notification.priority === "high"
                              ? "Quan trọng"
                              : "Bình thường"}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-3">
                        {notification.content}
                      </p>

                      <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{notification.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{notification.targetAudience}</span>
                        </div>
                        <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-semibold">
                          {notification.type}
                        </span>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">
                            1,234
                          </p>
                          <p className="text-xs text-gray-500">Đã gửi</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-orange-600">
                            980
                          </p>
                          <p className="text-xs text-gray-500">Đã đọc</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-orange-600">
                            79%
                          </p>
                          <p className="text-xs text-gray-500">Tỷ lệ mở</p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      <button
                        className="p-2 hover:bg-orange-50 rounded-lg transition"
                        title="Xem chi tiết"
                      >
                        <Eye className="w-5 h-5 text-orange-600" />
                      </button>
                      <button
                        className="p-2 hover:bg-orange-50 rounded-lg transition"
                        title="Chỉnh sửa"
                      >
                        <Edit className="w-5 h-5 text-orange-600" />
                      </button>
                      <button
                        className="p-2 hover:bg-red-50 rounded-lg transition"
                        title="Xóa"
                      >
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          /* Events List */
          <div className="space-y-4">
            {events.map((event) => (
              <Card
                key={event.id}
                className="hover:shadow-lg transition border-l-4 border-l-orange-500 shadow-md"
              >
                <div className="pt-6 px-6 pb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-orange-500 rounded-xl flex flex-col items-center justify-center text-white flex-shrink-0">
                      <span className="text-xl font-bold">
                        {event.date.split("-")[2]}
                      </span>
                      <span className="text-xs">
                        THG {event.date.split("-")[1]}
                      </span>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-gray-900 text-lg">
                          {event.title}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            event.priority === "high"
                              ? "bg-red-100 text-red-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {event.priority === "high"
                            ? "Quan trọng"
                            : "Bình thường"}
                        </span>
                      </div>

                      <p className="text-gray-600 text-sm mb-3">
                        {event.description}
                      </p>

                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4 text-orange-500" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Users className="w-4 h-4 text-orange-500" />
                          <span>{event.targetAudience}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg">
                        <Calendar className="w-4 h-4 text-orange-600" />
                        <span className="text-sm font-medium text-orange-900">
                          {event.location}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleViewItem(event)}
                        className="p-2 hover:bg-orange-50 rounded-lg transition"
                        title="Xem chi tiết"
                      >
                        <Eye className="w-5 h-5 text-orange-600" />
                      </button>
                      <button
                        onClick={() => handleEditItem(event)}
                        className="p-2 hover:bg-orange-50 rounded-lg transition"
                        title="Sửa sự kiện"
                      >
                        <Edit className="w-5 h-5 text-orange-600" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(event, "event")}
                        className="p-2 hover:bg-red-50 rounded-lg transition"
                        title="Xóa sự kiện"
                      >
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Create/Edit Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-md">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">
                    {createType === "notification"
                      ? "Tạo thông báo mới"
                      : "Tạo sự kiện mới"}
                  </h2>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  {/* Type Selector */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loại
                    </label>
                    <div className="inline-flex rounded-lg border border-gray-300 bg-white p-1">
                      <button
                        onClick={() => setCreateType("notification")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                          createType === "notification"
                            ? "bg-orange-500 text-white"
                            : "text-gray-600"
                        }`}
                      >
                        📢 Thông báo
                      </button>
                      <button
                        onClick={() => setCreateType("event")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                          createType === "event"
                            ? "bg-orange-500 text-white"
                            : "text-gray-600"
                        }`}
                      >
                        📅 Sự kiện
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tiêu đề *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      placeholder="Nhập tiêu đề..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-orange-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nội dung *
                    </label>
                    <textarea
                      rows={5}
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                      placeholder="Nhập nội dung chi tiết..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-orange-500 resize-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phân loại
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) =>
                          setFormData({ ...formData, type: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-orange-500"
                      >
                        {createType === "notification" ? (
                          <>
                            <option>Học vụ</option>
                            <option>Tài chính</option>
                            <option>Quy định</option>
                            <option>Khác</option>
                          </>
                        ) : (
                          <>
                            <option>Sự kiện</option>
                            <option>Hội thảo</option>
                            <option>Workshop</option>
                            <option>Orientation</option>
                          </>
                        )}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mức độ ưu tiên
                      </label>
                      <select
                        value={formData.priority}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            priority: e.target.value as
                              | "high"
                              | "medium"
                              | "low",
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-orange-500"
                      >
                        <option value="low">Thấp</option>
                        <option value="medium">Bình thường</option>
                        <option value="high">Cao</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Đối tượng nhận
                    </label>
                    <select
                      value={formData.targetAudience}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          targetAudience: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-orange-500"
                    >
                      <option>Tất cả sinh viên</option>
                      <option>Sinh viên năm 1</option>
                      <option>Sinh viên năm 2</option>
                      <option>Sinh viên năm 3</option>
                      <option>Sinh viên năm 4</option>
                      <option>Sinh viên K19</option>
                      <option>Sinh viên K18</option>
                    </select>
                  </div>

                  {createType === "event" && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Ngày diễn ra
                          </label>
                          <input
                            type="date"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-orange-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Thời gian
                          </label>
                          <input
                            type="text"
                            placeholder="14:00 - 16:00"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-orange-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Địa điểm
                        </label>
                        <input
                          type="text"
                          placeholder="Hội trường A, Tòa nhà Alpha"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-orange-500"
                        />
                      </div>
                    </>
                  )}

                  <div className="flex items-center justify-end gap-3 pt-4 border-t">
                    <button
                      onClick={() => setShowCreateModal(false)}
                      className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={handleCreate}
                      disabled={!formData.title || !formData.content}
                      className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition font-semibold inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                      {createType === "notification"
                        ? "Gửi thông báo"
                        : "Tạo sự kiện"}
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Confirmation Dialog */}
        <ConfirmationDialog
          isOpen={showDeleteDialog}
          onClose={() => {
            setShowDeleteDialog(false);
            setItemToDelete(null);
          }}
          onConfirm={confirmDelete}
          title="Xác nhận xóa"
          message={`Bạn có chắc chắn muốn xóa ${
            itemToDelete?.type === "notification" ? "thông báo" : "sự kiện"
          } "${itemToDelete?.title}"? Hành động này không thể hoàn tác.`}
          confirmText="Xóa"
          cancelText="Hủy"
          type="danger"
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
