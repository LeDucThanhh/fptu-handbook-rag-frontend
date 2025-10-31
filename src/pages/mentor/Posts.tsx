import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Eye, ThumbsUp, Edit, Trash2, Plus } from "lucide-react";
import { mockMentorPosts } from "@/services/mock/mockData";

export default function MentorPosts() {
  const [posts] = useState(mockMentorPosts);
  const [filter, setFilter] = useState<"all" | "public" | "draft">("all");

  const filteredPosts = posts.filter((post) => {
    if (filter === "all") return true;
    return post.status === filter;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 mb-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Quản lý Mentor Posts</h1>
          <p className="text-orange-100">
            Quản lý các bài viết và câu trả lời chính thức của bạn
          </p>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          {/* Filter Tabs */}
          <div className="inline-flex rounded-lg border border-gray-300 bg-white p-1">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === "all"
                  ? "bg-orange-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Tất cả ({posts.length})
            </button>
            <button
              onClick={() => setFilter("public")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === "public"
                  ? "bg-orange-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Công khai ({posts.filter((p) => p.status === "public").length})
            </button>
            <button
              onClick={() => setFilter("draft")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === "draft"
                  ? "bg-orange-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Bản nháp ({posts.filter((p) => p.status === "draft").length})
            </button>
          </div>

          {/* Create New Button */}
          <button className="bg-orange-500 text-white px-6 py-2.5 rounded-lg hover:bg-orange-600 transition font-semibold flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Tạo bài viết mới
          </button>
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <Card
              key={post.id}
              className="hover:shadow-lg transition cursor-pointer"
            >
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-lg">
                          {post.title}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                          <span>{post.author}</span>
                          <span>•</span>
                          <span>{post.createdAt}</span>
                          <span>•</span>
                          <span className="text-orange-600 font-medium">
                            {post.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {post.content}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{post.views} lượt xem</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{post.helpful} hữu ích</span>
                      </div>
                      <div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            post.status === "public"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {post.status === "public" ? "Công khai" : "Bản nháp"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 ml-4">
                    <button className="p-2 hover:bg-orange-50 rounded-lg transition">
                      <Edit className="w-5 h-5 text-orange-600" />
                    </button>
                    <button className="p-2 hover:bg-red-50 rounded-lg transition">
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <Card>
            <CardContent className="py-16 text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">Chưa có bài viết nào</p>
              <p className="text-sm text-gray-400 mb-6">
                Tạo bài viết đầu tiên để chia sẻ kiến thức
              </p>
              <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition font-semibold">
                Tạo bài viết mới
              </button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
