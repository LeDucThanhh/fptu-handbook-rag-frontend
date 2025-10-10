import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  Search,
  FolderOpen,
} from "lucide-react";
import { mockHandbookSections } from "@/services/mock/mockData";

export default function HandbookManagement() {
  const [sections] = useState(mockHandbookSections);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = ["all", "Giới thiệu", "Tài chính", "Học vụ", "Sinh viên"];

  const filteredSections = sections.filter((section) => {
    const matchesSearch = section.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || section.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-8 mb-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Quản lý Handbook</h1>
          <p className="text-purple-100">
            CRUD nội dung, tag topic và quản lý phiên bản
          </p>
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
                    ? "bg-purple-500 text-white"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {cat === "all" ? "Tất cả" : cat}
              </button>
            ))}
          </div>

          {/* Add New Button */}
          <button className="bg-purple-500 text-white px-6 py-2.5 rounded-lg hover:bg-purple-600 transition font-semibold flex items-center gap-2 whitespace-nowrap">
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
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">
                          {section.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full font-medium">
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
                    <button className="p-2 hover:bg-blue-50 rounded-lg transition">
                      <Edit className="w-4 h-4 text-blue-600" />
                    </button>
                    <button className="p-2 hover:bg-red-50 rounded-lg transition">
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
              <p className="text-gray-500 text-lg mb-2">Không tìm thấy nội dung</p>
              <p className="text-sm text-gray-400">
                Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

