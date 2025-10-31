import { useState } from "react";
import { useAuthStore } from "@/contexts/AuthContext";
import { mockQueryLogs } from "@/services/mock/mockData";
import { Timeline, Card, Tag, Space, Empty, Rate } from "antd";
import {
  MessageOutlined,
  ClockCircleOutlined,
  LikeOutlined,
  DislikeOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

export default function History() {
  const { user } = useAuthStore();
  const [queries] = useState(mockQueryLogs);

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
          {queries.length === 0 ? (
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
                color: "blue",
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
                            {query.question}
                          </span>
                        </div>
                        <p className="text-gray-600 pl-6">{query.answer}</p>
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
                            {query.timestamp}
                          </span>
                        </Space>

                        <Space>
                          {query.feedback === "positive" ? (
                            <LikeOutlined
                              style={{ color: "#10b981", fontSize: 18 }}
                            />
                          ) : query.feedback === "negative" ? (
                            <DislikeOutlined
                              style={{ color: "#ef4444", fontSize: 18 }}
                            />
                          ) : null}

                          <Tag
                            color={
                              query.confidence >= 0.8
                                ? "green"
                                : query.confidence >= 0.5
                                ? "orange"
                                : "red"
                            }
                          >
                            Confidence: {(query.confidence * 100).toFixed(0)}%
                          </Tag>
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
