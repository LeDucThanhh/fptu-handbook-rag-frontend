import { useState } from "react";
import { useAuthStore } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Clock, ThumbsUp, ThumbsDown } from "lucide-react";
import { mockQueryLogs } from "@/services/mock/mockData";

export default function History() {
  const { user } = useAuthStore();
  const [queries] = useState(mockQueryLogs);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p className="text-gray-600">Vui lòng đăng nhập để xem lịch sử</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="relative">
            <h1
              className="text-3xl font-bold mb-2"
              style={{ fontFamily: "SVN-Product Sans, Inter, sans-serif" }}
            >
              Lịch sử hỏi đáp 📝
            </h1>
            <p className="text-orange-100">Xem lại các câu hỏi bạn đã đặt</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-500" />
              Các câu hỏi của bạn
            </CardTitle>
          </CardHeader>
          <CardContent>
            {queries.length === 0 ? (
              <div className="text-center py-12">
                <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Chưa có câu hỏi nào</p>
                <p className="text-sm text-gray-400 mt-2">
                  Bắt đầu đặt câu hỏi để xem lịch sử tại đây
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {queries.map((query) => (
                  <div
                    key={query.id}
                    className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <MessageCircle className="w-4 h-4 text-orange-500" />
                          {query.question}
                        </p>
                        <p className="text-sm text-gray-600 mb-3 pl-6">
                          {query.answer}
                        </p>

                        {query.sources && query.sources.length > 0 && (
                          <div className="pl-6 mb-2">
                            <p className="text-xs text-gray-500 mb-1">
                              Nguồn tham khảo:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {query.sources.map((source, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded"
                                >
                                  {source}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {query.feedback === "positive" ? (
                        <ThumbsUp className="w-5 h-5 text-green-500 flex-shrink-0 ml-4" />
                      ) : query.feedback === "negative" ? (
                        <ThumbsDown className="w-5 h-5 text-red-500 flex-shrink-0 ml-4" />
                      ) : null}
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500 pl-6">
                      <span>{query.timestamp}</span>
                      <div className="flex items-center gap-4">
                        <span
                          className={`px-2 py-0.5 rounded ${
                            query.confidence >= 0.8
                              ? "bg-green-100 text-green-700"
                              : query.confidence >= 0.5
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          Confidence: {(query.confidence * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
