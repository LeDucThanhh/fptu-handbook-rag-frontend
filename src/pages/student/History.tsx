import { useState, useEffect } from "react";
import { useAuthStore } from "@/contexts/AuthContext";
import { Timeline, Card, Tag, Space, Empty, Rate, Spin, message } from "antd";
import {
  MessageOutlined,
  ClockCircleOutlined,
  LikeOutlined,
  DislikeOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { queryLogService } from "@/services/api";
import type { QueryLog } from "@/services/api/query-log.service";

export default function History() {
  const { user } = useAuthStore();
  const [queries, setQueries] = useState<QueryLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          message.error("Vui lòng đăng nhập lại");
          return;
        }

        const history = await queryLogService.getHistory(token);
        setQueries(history);
      } catch (error: any) {
        console.error("Error fetching history:", error);
        message.error(
          error.response?.data?.message || "Không thể tải lịch sử hỏi đáp"
        );
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchHistory();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600">Vui lòng đăng nhập để xem lịch sử</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Lịch sử hỏi đáp
          </h1>
          <p className="text-lg text-gray-600">
            Xem lại các câu hỏi và câu trả lời của bạn
          </p>
        </div>

        <Card>
          {loading ? (
            <div className="text-center py-12">
              <Spin size="large" />
              <p className="mt-4 text-gray-500">Đang tải lịch sử...</p>
            </div>
          ) : queries.length === 0 ? (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <Space direction="vertical">
                  <span>Chưa có câu hỏi nào</span>
                  <span className="text-sm text-gray-500">
                    Bắt đầu đặt câu hỏi để xem lịch sử tại đây
                  </span>
                </Space>
              }
            />
          ) : (
            <Timeline
              mode="left"
              items={queries.map((query) => ({
                color: query.isResolved ? "green" : "blue",
                dot: <MessageOutlined style={{ fontSize: "16px" }} />,
                children: (
                  <Card
                    hoverable
                    style={{ marginBottom: 16 }}
                    className="shadow-sm"
                  >
                    <Space
                      direction="vertical"
                      size="middle"
                      style={{ width: "100%" }}
                    >
                      {/* Question */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <MessageOutlined style={{ color: "#f97316" }} />
                          <span className="font-semibold text-lg">
                            {query.query}
                          </span>
                          {query.isResolved && (
                            <Tag color="green">Đã giải quyết</Tag>
                          )}
                        </div>
                        <p className="text-gray-600 pl-6">{query.response}</p>
                      </div>

                      {/* Sources */}
                      {query.sources && query.sources.length > 0 && (
                        <div className="pl-6">
                          <p className="text-sm text-gray-500 mb-2">
                            <FileTextOutlined /> Nguồn tham khảo:
                          </p>
                          <Space wrap>
                            {query.sources.map((source, idx) => (
                              <Tag key={idx} color="orange">
                                {source}
                              </Tag>
                            ))}
                          </Space>
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between pl-6 pt-2 border-t">
                        <Space>
                          <ClockCircleOutlined />
                          <span className="text-sm text-gray-500">
                            {new Date(query.createdAt).toLocaleString("vi-VN")}
                          </span>
                        </Space>

                        <Space>
                          {query.feedbackScore !== undefined &&
                            query.feedbackScore !== null && (
                              <>
                                {query.feedbackScore >= 4 ? (
                                  <LikeOutlined
                                    style={{ color: "#10b981", fontSize: 18 }}
                                  />
                                ) : (
                                  <DislikeOutlined
                                    style={{ color: "#ef4444", fontSize: 18 }}
                                  />
                                )}
                                <Rate
                                  disabled
                                  value={query.feedbackScore}
                                  style={{ fontSize: 14 }}
                                />
                              </>
                            )}
                          {query.feedbackComment && (
                            <Tag color="blue">{query.feedbackComment}</Tag>
                          )}
                        </Space>
                      </div>
                    </Space>
                  </Card>
                ),
              }))}
            />
          )}
        </Card>
      </div>
    </div>
  );
}
