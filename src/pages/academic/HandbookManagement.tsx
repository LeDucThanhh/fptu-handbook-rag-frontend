import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  Search,
  FolderOpen,
  Save,
  X,
  Upload,
  Tag,
} from "lucide-react";
import { mockHandbookSections } from "@/services/mock/mockData";

interface HandbookSection {
  id: string;
  title: string;
  content: string;
  category: string;
  version: string;
  updatedAt: string;
}

export default function HandbookManagement() {
  const [sections, setSections] = useState(mockHandbookSections);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedSection, setSelectedSection] = useState<HandbookSection | null>(null);
  
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

  const handleCreate = () => {
    setModalMode("create");
    setFormData({ title: "", content: "", category: "Học vụ", version: "1.0" });
    setShowModal(true);
  };

  const handleEdit = (section: HandbookSection) => {
    setModalMode("edit");
    setSelectedSection(section);
    setFormData({
      title: section.title,
      content: section.content,
      category: section.category,
      version: section.version,
    });
    setShowModal(true);
  };

  const handleDelete = (sectionId: string) => {
    if (confirm("Bạn có chắc muốn xóa section này?")) {
      setSections(sections.filter((s) => s.id !== sectionId));
      alert("Đã xóa section!");
    }
  };

  const handleSave = () => {
    if (!formData.title || !formData.content) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (modalMode === "create") {
      const newSection: HandbookSection = {
        id: `hb-${Date.now()}`,
        ...formData,
        updatedAt: new Date().toISOString().split("T")[0],
      };
      setSections([...sections, newSection]);
      alert("Đã thêm section mới!");
    } else {
      setSections(
        sections.map((s) =>
          s.id === selectedSection?.id
            ? { ...s, ...formData, updatedAt: new Date().toISOString().split("T")[0] }
            : s
        )
      );
      alert("Đã cập nhật section!");
    }

    setShowModal(false);
  };

  const handleUploadFile = () => {
    alert("Chức năng upload file PDF/Word sẽ được triển khai khi có backend!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <div className="container mx-auto px-4 max-w-7xl py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="relative">
            <h1
              className="text-3xl font-bold mb-2"
              style={{ fontFamily: "SVN-Product Sans, Inter, sans-serif" }}
            >
              Quản lý Handbook 📚
            </h1>
            <p className="text-orange-100">
              CRUD nội dung, tag topic và quản lý phiên bản
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="glare-card">
            <Card className="border-orange-200 hover:border-orange-400 transition-all hover:shadow-xl">
              <CardContent className="pt-6">
                <div className="text-center">
                  <BookOpen className="w-10 h-10 text-orange-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-1">Tổng Sections</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                    {sections.length}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {categories.slice(1, 5).map((cat) => (
            <div key={cat} className="glare-card">
              <Card className="border-orange-200 hover:border-orange-400 transition-all hover:shadow-xl">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Tag className="w-10 h-10 text-orange-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-1">{cat}</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {sections.filter((s) => s.category === cat).length}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

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
              className="w-full pl-10 pr-4 py-2.5 border-2 border-orange-200 rounded-lg outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
            />
          </div>

          {/* Categories */}
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                    : "bg-white border-2 border-orange-200 text-gray-700 hover:bg-orange-50 hover:border-orange-400"
                }`}
              >
                {cat === "all" ? "Tất cả" : cat}
              </button>
            ))}
          </div>

          {/* Add New Button */}
          <div className="flex gap-2">
            <button
              onClick={handleUploadFile}
              className="bg-white border-2 border-orange-500 text-orange-600 px-4 py-2.5 rounded-lg hover:bg-orange-50 transition-all font-semibold flex items-center gap-2 whitespace-nowrap"
            >
              <Upload className="w-4 h-4" />
              Upload File
            </button>
            <button
              onClick={handleCreate}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2.5 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all font-semibold shadow-lg flex items-center gap-2 whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              Thêm Section
            </button>
          </div>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSections.map((section) => (
            <div key={section.id} className="glare-card">
              <Card className="h-full border-orange-200 hover:border-orange-400 transition-all hover:shadow-xl cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                          <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3
                            className="font-bold text-gray-900"
                            style={{
                              fontFamily: "SVN-Product Sans, Inter, sans-serif",
                            }}
                          >
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
                        onClick={() => handleEdit(section)}
                        className="p-2 hover:bg-orange-50 rounded-lg transition"
                      >
                        <Edit className="w-4 h-4 text-orange-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(section.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredSections.length === 0 && (
          <Card className="border-orange-200">
            <CardContent className="py-16 text-center">
              <FolderOpen className="w-16 h-16 text-orange-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">
                Không tìm thấy nội dung
              </p>
              <p className="text-sm text-gray-400">
                Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
              </p>
            </CardContent>
          </Card>
        )}

        {/* Create/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <Card className="max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle style={{ fontFamily: "SVN-Product Sans, Inter, sans-serif" }}>
                    {modalMode === "create" ? "Thêm Section mới" : "Chỉnh sửa Section"}
                  </CardTitle>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tiêu đề Section *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      placeholder="Ví dụ: Quy chế đào tạo 2024"
                      className="w-full px-4 py-2 border-2 border-orange-200 rounded-lg outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nội dung *
                    </label>
                    <textarea
                      rows={8}
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                      placeholder="Nhập nội dung chi tiết của section..."
                      className="w-full px-4 py-2 border-2 border-orange-200 rounded-lg outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all resize-none"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.content.length} ký tự
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phân loại (Tag)
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        className="w-full px-4 py-2 border-2 border-orange-200 rounded-lg outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                      >
                        <option>Giới thiệu</option>
                        <option>Tài chính</option>
                        <option>Học vụ</option>
                        <option>Sinh viên</option>
                        <option>Quy chế</option>
                        <option>Cơ sở vật chất</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phiên bản
                      </label>
                      <input
                        type="text"
                        value={formData.version}
                        onChange={(e) =>
                          setFormData({ ...formData, version: e.target.value })
                        }
                        placeholder="1.0"
                        className="w-full px-4 py-2 border-2 border-orange-200 rounded-lg outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                      />
                    </div>
                  </div>

                  {modalMode === "edit" && (
                    <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                      <p className="text-sm text-gray-700 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-orange-600" />
                        <span>
                          Section ID: <strong>{selectedSection?.id}</strong>
                        </span>
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Sau khi cập nhật, cần Rebuild Index để AI học nội dung mới
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-end gap-3 pt-4 border-t">
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={handleSave}
                      className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all font-semibold shadow-lg inline-flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      {modalMode === "create" ? "Tạo Section" : "Lưu thay đổi"}
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
