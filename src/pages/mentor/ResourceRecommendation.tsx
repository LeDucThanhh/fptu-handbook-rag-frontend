import React, { useState } from "react";
import { Card, Button, Modal, Input, Select, notification } from "antd";
import {
  FileText,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Edit,
  Search,
  Calendar,
  Tag,
} from "lucide-react";

const { TextArea } = Input;

// Mock data for demonstration
const mockSuggestions = [
  {
    id: 1,
    title: "Cập nhật thông tin học bổng mới",
    description:
      "Cần bổ sung thông tin về các loại học bổng mới được triển khai trong học kỳ này",
    reason:
      "Nhiều sinh viên hỏi về học bổng nhưng hệ thống không có thông tin đầy đủ",
    reference: "Thông báo từ Phòng Đào tạo số 123/2024",
    status: "pending",
    createdAt: "2024-01-15",
    priority: "high",
    category: "Học bổng",
  },
  {
    id: 2,
    title: "Bổ sung quy trình đăng ký môn học online",
    description:
      "Cần thêm hướng dẫn chi tiết về cách đăng ký môn học qua hệ thống online",
    reason: "Sinh viên gặp khó khăn trong việc đăng ký môn học",
    reference: "Hướng dẫn từ IT Department",
    status: "in_progress",
    createdAt: "2024-01-10",
    priority: "medium",
    category: "Đăng ký môn học",
  },
  {
    id: 3,
    title: "Cập nhật lịch thi cuối kỳ",
    description: "Lịch thi đã thay đổi nhưng chưa được cập nhật trong handbook",
    reason: "Thông tin lịch thi không chính xác gây nhầm lẫn cho sinh viên",
    reference: "Lịch thi chính thức từ Phòng Đào tạo",
    status: "completed",
    createdAt: "2024-01-05",
    priority: "high",
    category: "Lịch thi",
  },
];

const statusConfig: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  pending: { label: "Chờ xử lý", color: "text-warning", bg: "bg-warning/10" },
  in_progress: { label: "Đang xử lý", color: "text-info", bg: "bg-info/10" },
  completed: {
    label: "Hoàn thành",
    color: "text-success",
    bg: "bg-success/10",
  },
};

const priorityConfig: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  high: { label: "Cao", color: "text-destructive", bg: "bg-destructive/10" },
  medium: { label: "Trung bình", color: "text-warning", bg: "bg-warning/10" },
  low: { label: "Thấp", color: "text-muted-foreground", bg: "bg-muted/10" },
};

const ResourceRecommendation = () => {
  const [suggestions, setSuggestions] = useState(mockSuggestions);
  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    reason: "",
    reference: "",
    category: "",
    priority: "medium",
  });

  const categories = [
    "Học bổng",
    "Đăng ký môn học",
    "Lịch thi",
    "Học phí",
    "Câu lạc bộ",
    "Sự kiện",
    "Thực tập",
    "Tốt nghiệp",
  ];

  const handleSubmit = () => {
    if (!formData.title || !formData.description || !formData.reason) {
      notification.error({
        message: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc!",
        placement: "topRight",
      });
      return;
    }

    const newSuggestion = {
      id: suggestions.length + 1,
      ...formData,
      status: "pending" as const,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setSuggestions([newSuggestion, ...suggestions]);

    notification.success({
      message: "Thành công",
      description: "Đã tạo đề xuất tài liệu thành công!",
      placement: "topRight",
      duration: 3,
    });

    setFormData({
      title: "",
      description: "",
      reason: "",
      reference: "",
      category: "",
      priority: "medium",
    });
    setShowForm(false);
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    setSuggestions(
      suggestions.map((s) =>
        s.id === id ? { ...s, status: newStatus as any } : s
      )
    );

    notification.success({
      message: "Thành công",
      description: "Đã cập nhật trạng thái đề xuất!",
      placement: "topRight",
      duration: 3,
    });
  };

  const filteredSuggestions = suggestions.filter((suggestion) => {
    const matchesStatus =
      filterStatus === "all" || suggestion.status === filterStatus;
    const matchesSearch =
      suggestion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      suggestion.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Resource Recommendation Panel
            </h1>
            <p className="text-gray-600">
              Đề xuất cập nhật hoặc bổ sung tài liệu học vụ / nội dung sổ tay
            </p>
          </div>
          <Button
            className="bg-orange-500 hover:bg-orange-600"
            onClick={() => setShowForm(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Tạo đề xuất mới
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-md">
            <div className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {suggestions.filter((s) => s.status === "pending").length}
                  </p>
                  <p className="text-sm text-gray-600">Chờ xử lý</p>
                </div>
              </div>
            </div>
          </Card>
          <Card className="shadow-md">
            <div className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {
                      suggestions.filter((s) => s.status === "in_progress")
                        .length
                    }
                  </p>
                  <p className="text-sm text-gray-600">Đang xử lý</p>
                </div>
              </div>
            </div>
          </Card>
          <Card className="shadow-md">
            <div className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {suggestions.filter((s) => s.status === "completed").length}
                  </p>
                  <p className="text-sm text-gray-600">Hoàn thành</p>
                </div>
              </div>
            </div>
          </Card>
          <Card className="shadow-md">
            <div className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{suggestions.length}</p>
                  <p className="text-sm text-gray-600">Tổng đề xuất</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="shadow-md">
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm đề xuất..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  className={
                    filterStatus === "all"
                      ? "bg-orange-500 hover:bg-orange-600 text-white"
                      : "border border-gray-300"
                  }
                  size="sm"
                  onClick={() => setFilterStatus("all")}
                >
                  Tất cả
                </Button>
                <Button
                  className={
                    filterStatus === "pending"
                      ? "bg-orange-500 hover:bg-orange-600 text-white"
                      : "border border-gray-300"
                  }
                  size="sm"
                  onClick={() => setFilterStatus("pending")}
                >
                  Chờ xử lý
                </Button>
                <Button
                  className={
                    filterStatus === "in_progress"
                      ? "bg-orange-500 hover:bg-orange-600 text-white"
                      : "border border-gray-300"
                  }
                  size="sm"
                  onClick={() => setFilterStatus("in_progress")}
                >
                  Đang xử lý
                </Button>
                <Button
                  className={
                    filterStatus === "completed"
                      ? "bg-orange-500 hover:bg-orange-600 text-white"
                      : "border border-gray-300"
                  }
                  size="sm"
                  onClick={() => setFilterStatus("completed")}
                >
                  Hoàn thành
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Suggestions List */}
        <div className="space-y-4">
          {filteredSuggestions.map((suggestion) => (
            <Card key={suggestion.id} className="shadow-md">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">
                        {suggestion.title}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          suggestion.status === "pending"
                            ? "bg-orange-100 text-orange-600"
                            : suggestion.status === "in_progress"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {statusConfig[suggestion.status]?.label ||
                          suggestion.status}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          suggestion.priority === "high"
                            ? "bg-red-100 text-red-600"
                            : suggestion.priority === "medium"
                            ? "bg-orange-100 text-orange-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {priorityConfig[suggestion.priority]?.label ||
                          suggestion.priority}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">
                      {suggestion.description}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium mb-1">Lý do:</p>
                        <p className="text-gray-600">{suggestion.reason}</p>
                      </div>
                      <div>
                        <p className="font-medium mb-1">Nguồn tham khảo:</p>
                        <p className="text-gray-600">{suggestion.reference}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {suggestion.createdAt}
                    </div>
                    <div className="flex items-center gap-1">
                      <Tag className="w-4 h-4" />
                      {suggestion.category}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {suggestion.status === "pending" && (
                      <Button
                        size="sm"
                        className="border border-gray-300"
                        onClick={() =>
                          handleStatusChange(suggestion.id, "in_progress")
                        }
                      >
                        Bắt đầu xử lý
                      </Button>
                    )}
                    {suggestion.status === "in_progress" && (
                      <Button
                        size="sm"
                        className="bg-orange-500 hover:bg-orange-600"
                        onClick={() =>
                          handleStatusChange(suggestion.id, "completed")
                        }
                      >
                        Hoàn thành
                      </Button>
                    )}
                    <Button size="sm" className="border border-gray-300">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" className="border border-gray-300">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Create Form Modal */}
        <Modal
          title={<span className="text-xl font-semibold">Tạo đề xuất mới</span>}
          open={showForm}
          onCancel={() => setShowForm(false)}
          onOk={handleSubmit}
          okText="Gửi đề xuất"
          cancelText="Hủy"
          width={800}
          okButtonProps={{ className: "bg-orange-500 hover:bg-orange-600" }}
        >
          <div className="space-y-4 py-4">
            <p className="text-gray-600 mb-4">
              Điền thông tin để tạo ticket tự động gửi đến Academic Office
            </p>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tiêu đề đề xuất <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="Nhập tiêu đề đề xuất..."
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                size="large"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mô tả chi tiết <span className="text-red-500">*</span>
              </label>
              <TextArea
                placeholder="Mô tả chi tiết về nội dung cần cập nhật..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
              />
            </div>

            {/* Reason */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lý do đề xuất <span className="text-red-500">*</span>
              </label>
              <TextArea
                placeholder="Giải thích lý do cần cập nhật nội dung này..."
                value={formData.reason}
                onChange={(e) =>
                  setFormData({ ...formData, reason: e.target.value })
                }
                rows={3}
              />
            </div>

            {/* Reference */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nguồn tham khảo
              </label>
              <Input
                placeholder="Ví dụ: Thông báo số 123/2024, Hướng dẫn từ IT Department..."
                value={formData.reference}
                onChange={(e) =>
                  setFormData({ ...formData, reference: e.target.value })
                }
                size="large"
              />
            </div>

            {/* Category and Priority */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Danh mục <span className="text-red-500">*</span>
                </label>
                <Select
                  placeholder="Chọn danh mục"
                  value={formData.category || undefined}
                  onChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                  size="large"
                  className="w-full"
                  options={categories.map((cat) => ({
                    label: cat,
                    value: cat,
                  }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mức độ ưu tiên
                </label>
                <Select
                  value={formData.priority}
                  onChange={(value) =>
                    setFormData({ ...formData, priority: value })
                  }
                  size="large"
                  className="w-full"
                  options={[
                    { label: "Thấp", value: "low" },
                    { label: "Trung bình", value: "medium" },
                    { label: "Cao", value: "high" },
                  ]}
                />
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ResourceRecommendation;
