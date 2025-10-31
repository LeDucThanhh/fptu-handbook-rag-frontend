import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  Search,
  FolderOpen,
  X,
} from "lucide-react";
import { mockHandbookSections } from "@/services/mock/mockData";
import ConfirmationDialog from "@/components/ui/confirmation-dialog";
import { useToast } from "@/components/ui/toast";
import FileUpload from "@/components/ui/file-upload";

export default function HandbookManagement() {
  const [sections, setSections] = useState(mockHandbookSections);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [sectionToDelete, setSectionToDelete] = useState<any>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingSection, setEditingSection] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { success, error, ToastContainer } = useToast();

  // Form data for add/edit
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "Học vụ",
    version: "1.0",
  });

  const categories = ["all", "Giới thiệu", "Tài chính", "Học vụ", "Sinh viên"];

  const filteredSections = sections.filter((section) => {
    const matchesSearch = section.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || section.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDeleteSection = (section: any) => {
    setSectionToDelete(section);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!sectionToDelete) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSections((prev) => prev.filter((s) => s.id !== sectionToDelete.id));
      success("Xóa thành công", `Đã xóa nội dung "${sectionToDelete.title}"`);
      setShowDeleteDialog(false);
      setSectionToDelete(null);
    } catch (err) {
      error("Lỗi xóa", "Không thể xóa nội dung. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditSection = (section: any) => {
    setEditingSection(section);
    setFormData({
      title: section.title,
      content: section.content,
      category: section.category,
      version: section.version,
    });
    setShowEditDialog(true);
  };

  const handleAddSection = () => {
    setFormData({
      title: "",
      content: "",
      category: "Học vụ",
      version: "1.0",
    });
    setShowAddDialog(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      category: "Học vụ",
      version: "1.0",
    });
  };

  const handleFormSubmit = async (isEdit: boolean = false) => {
    if (!formData.title.trim() || !formData.content.trim()) {
      error("Lỗi", "Vui lòng điền đầy đủ thông tin");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (isEdit && editingSection) {
        // Edit existing section
        const updatedSection = {
          ...editingSection,
          title: formData.title,
          content: formData.content,
          category: formData.category,
          version: formData.version,
          updatedAt: new Date().toLocaleDateString("vi-VN"),
        };

        setSections((prev) =>
          prev.map((s) => (s.id === editingSection.id ? updatedSection : s))
        );
        success("Sửa thành công", `Đã cập nhật nội dung "${formData.title}"`);
        setShowEditDialog(false);
        setEditingSection(null);
      } else {
        // Add new section
        const newSection = {
          id: Date.now().toString(),
          title: formData.title,
          content: formData.content,
          category: formData.category,
          version: formData.version,
          updatedAt: new Date().toLocaleDateString("vi-VN"),
        };

        setSections((prev) => [newSection, ...prev]);
        success("Thêm thành công", `Đã thêm nội dung "${formData.title}"`);
        setShowAddDialog(false);
      }

      resetForm();
    } catch (err) {
      error("Lỗi", "Không thể lưu nội dung. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (_files: File[]) => {
    // TODO: Implement file upload functionality
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-screen-2xl mx-auto space-y-8">
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm nội dung..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-purple-500"
            />
          </div>

          {/* Categories */}
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  selectedCategory === cat
                    ? "bg-orange-500 text-white"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {cat === "all" ? "Tất cả" : cat}
              </button>
            ))}
          </div>

          {/* Add New Button */}
          <button
            onClick={handleAddSection}
            className="bg-orange-500 text-white px-6 py-2.5 rounded-lg hover:bg-orange-600 transition font-semibold flex items-center gap-2 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Thêm nội dung
          </button>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSections.map((section) => (
            <Card
              key={section.id}
              className="hover:shadow-lg transition cursor-pointer"
            >
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">
                          {section.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full font-medium">
                            {section.category}
                          </span>
                          <span className="text-xs text-gray-500">
                            v{section.version}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {section.content}
                    </p>

                    <p className="text-xs text-gray-500">
                      Cập nhật: {section.updatedAt}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleEditSection(section)}
                      className="p-2 hover:bg-orange-50 rounded-lg transition"
                      title="Sửa nội dung"
                    >
                      <Edit className="w-4 h-4 text-orange-600" />
                    </button>
                    <button
                      onClick={() => handleDeleteSection(section)}
                      className="p-2 hover:bg-red-50 rounded-lg transition"
                      title="Xóa nội dung"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredSections.length === 0 && (
          <Card>
            <CardContent className="py-16 text-center">
              <FolderOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">
                Không tìm thấy nội dung
              </p>
              <p className="text-sm text-gray-400">
                Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
              </p>
            </CardContent>
          </Card>
        )}

        {/* Confirmation Dialogs */}
        <ConfirmationDialog
          isOpen={showDeleteDialog}
          onClose={() => {
            setShowDeleteDialog(false);
            setSectionToDelete(null);
          }}
          onConfirm={confirmDelete}
          title="Xác nhận xóa"
          message={`Bạn có chắc chắn muốn xóa nội dung "${sectionToDelete?.title}"? Hành động này không thể hoàn tác.`}
          confirmText="Xóa"
          cancelText="Hủy"
          type="danger"
          isLoading={isLoading}
        />

        {/* Add Form Modal */}
        {showAddDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Thêm nội dung mới
                  </h2>
                  <button
                    onClick={() => setShowAddDialog(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                    disabled={isLoading}
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tiêu đề *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="Nhập tiêu đề nội dung"
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Danh mục *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            category: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        disabled={isLoading}
                      >
                        <option value="Giới thiệu">Giới thiệu</option>
                        <option value="Tài chính">Tài chính</option>
                        <option value="Học vụ">Học vụ</option>
                        <option value="Sinh viên">Sinh viên</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nội dung *
                    </label>
                    <textarea
                      value={formData.content}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          content: e.target.value,
                        }))
                      }
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Nhập nội dung chi tiết..."
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phiên bản
                    </label>
                    <input
                      type="text"
                      value={formData.version}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          version: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="1.0"
                      disabled={isLoading}
                    />
                  </div>

                  {/* File Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tài liệu đính kèm
                    </label>
                    <FileUpload
                      onFileSelect={handleFileSelect}
                      maxFiles={5}
                      maxSize={10}
                      acceptedTypes={[
                        ".pdf",
                        ".doc",
                        ".docx",
                        ".txt",
                        ".jpg",
                        ".png",
                      ]}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 justify-end pt-4 border-t">
                    <button
                      onClick={() => setShowAddDialog(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                      disabled={isLoading}
                    >
                      Hủy
                    </button>
                    <button
                      onClick={() => handleFormSubmit(false)}
                      className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition font-semibold"
                      disabled={isLoading}
                    >
                      {isLoading ? "Đang lưu..." : "Thêm nội dung"}
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Edit Form Modal */}
        {showEditDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Sửa nội dung
                  </h2>
                  <button
                    onClick={() => setShowEditDialog(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                    disabled={isLoading}
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tiêu đề *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="Nhập tiêu đề nội dung"
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Danh mục *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            category: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        disabled={isLoading}
                      >
                        <option value="Giới thiệu">Giới thiệu</option>
                        <option value="Tài chính">Tài chính</option>
                        <option value="Học vụ">Học vụ</option>
                        <option value="Sinh viên">Sinh viên</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nội dung *
                    </label>
                    <textarea
                      value={formData.content}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          content: e.target.value,
                        }))
                      }
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Nhập nội dung chi tiết..."
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phiên bản
                    </label>
                    <input
                      type="text"
                      value={formData.version}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          version: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="1.0"
                      disabled={isLoading}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 justify-end pt-4 border-t">
                    <button
                      onClick={() => setShowEditDialog(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                      disabled={isLoading}
                    >
                      Hủy
                    </button>
                    <button
                      onClick={() => handleFormSubmit(true)}
                      className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition font-semibold"
                      disabled={isLoading}
                    >
                      {isLoading ? "Đang lưu..." : "Cập nhật"}
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Toast Container */}
        <ToastContainer />
      </div>
    </div>
  );
}
