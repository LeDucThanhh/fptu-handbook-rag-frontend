import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSuggestion = {
      id: suggestions.length + 1,
      ...formData,
      status: "pending" as const,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setSuggestions([newSuggestion, ...suggestions]);
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
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Resource Recommendation Panel
            </h1>
            <p className="text-muted-foreground mt-2">
              Đề xuất cập nhật hoặc bổ sung tài liệu học vụ / nội dung sổ tay
            </p>
          </div>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Tạo đề xuất mới
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {suggestions.filter((s) => s.status === "pending").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Chờ xử lý</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-info" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {
                      suggestions.filter((s) => s.status === "in_progress")
                        .length
                    }
                  </p>
                  <p className="text-sm text-muted-foreground">Đang xử lý</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {suggestions.filter((s) => s.status === "completed").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Hoàn thành</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{suggestions.length}</p>
                  <p className="text-sm text-muted-foreground">Tổng đề xuất</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm đề xuất..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === "all" ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("all")}
                >
                  Tất cả
                </Button>
                <Button
                  variant={filterStatus === "pending" ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("pending")}
                >
                  Chờ xử lý
                </Button>
                <Button
                  variant={
                    filterStatus === "in_progress" ? "primary" : "outline"
                  }
                  size="sm"
                  onClick={() => setFilterStatus("in_progress")}
                >
                  Đang xử lý
                </Button>
                <Button
                  variant={filterStatus === "completed" ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("completed")}
                >
                  Hoàn thành
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Suggestions List */}
        <div className="space-y-4">
          {filteredSuggestions.map((suggestion) => (
            <Card key={suggestion.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">
                        {suggestion.title}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          statusConfig[suggestion.status]?.bg || "bg-muted/10"
                        } ${
                          statusConfig[suggestion.status]?.color ||
                          "text-muted-foreground"
                        }`}
                      >
                        {statusConfig[suggestion.status]?.label ||
                          suggestion.status}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          priorityConfig[suggestion.priority]?.bg ||
                          "bg-muted/10"
                        } ${
                          priorityConfig[suggestion.priority]?.color ||
                          "text-muted-foreground"
                        }`}
                      >
                        {priorityConfig[suggestion.priority]?.label ||
                          suggestion.priority}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-3">
                      {suggestion.description}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-foreground mb-1">
                          Lý do:
                        </p>
                        <p className="text-muted-foreground">
                          {suggestion.reason}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-foreground mb-1">
                          Nguồn tham khảo:
                        </p>
                        <p className="text-muted-foreground">
                          {suggestion.reference}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
                        variant="outline"
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
                        onClick={() =>
                          handleStatusChange(suggestion.id, "completed")
                        }
                      >
                        Hoàn thành
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Create Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>Tạo đề xuất mới</CardTitle>
                <CardDescription>
                  Điền thông tin để tạo ticket tự động gửi đến Academic Office
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Tiêu đề đề xuất
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Nhập tiêu đề đề xuất..."
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Mô tả chi tiết
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={3}
                      placeholder="Mô tả chi tiết về nội dung cần cập nhật..."
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Lý do đề xuất
                    </label>
                    <textarea
                      value={formData.reason}
                      onChange={(e) =>
                        setFormData({ ...formData, reason: e.target.value })
                      }
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={2}
                      placeholder="Giải thích lý do cần cập nhật nội dung này..."
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Nguồn tham khảo
                    </label>
                    <input
                      type="text"
                      value={formData.reference}
                      onChange={(e) =>
                        setFormData({ ...formData, reference: e.target.value })
                      }
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Ví dụ: Thông báo số 123/2024, Hướng dẫn từ IT Department..."
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Danh mục
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      >
                        <option value="">Chọn danh mục</option>
                        <option value="Học bổng">Học bổng</option>
                        <option value="Đăng ký môn học">Đăng ký môn học</option>
                        <option value="Lịch thi">Lịch thi</option>
                        <option value="Quy định">Quy định</option>
                        <option value="Hỗ trợ sinh viên">
                          Hỗ trợ sinh viên
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Mức độ ưu tiên
                      </label>
                      <select
                        value={formData.priority}
                        onChange={(e) =>
                          setFormData({ ...formData, priority: e.target.value })
                        }
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="low">Thấp</option>
                        <option value="medium">Trung bình</option>
                        <option value="high">Cao</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowForm(false)}
                    >
                      Hủy
                    </Button>
                    <Button type="submit">
                      <Send className="w-4 h-4 mr-2" />
                      Gửi đề xuất
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceRecommendation;
