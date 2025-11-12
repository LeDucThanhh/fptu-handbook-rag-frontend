import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Input,
  Button,
  Avatar,
  Tag,
  Space,
  Spin,
  Dropdown,
  message as antMessage,
} from "antd";
import type { MenuProps } from "antd";
import {
  SendOutlined,
  LikeOutlined,
  DislikeOutlined,
  RobotOutlined,
  UserOutlined,
  MessageOutlined,
  BookOutlined,
  TeamOutlined,
  BellOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useAuthStore } from "@/contexts/AuthContext";
import { queryLogService } from "@/services/api";

interface Message {
  type: "user" | "bot";
  content: string;
  sources?: string[];
  timestamp: Date;
  id: string;
}

const QA: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [feedbackMessageId, setFeedbackMessageId] = useState<string | null>(
    null
  );
  const [feedbackText, setFeedbackText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return null;
  }

  const currentPath = location.pathname;

  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Hồ sơ cá nhân",
      onClick: () => navigate("/student/profile"),
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
      danger: true,
      onClick: handleLogout,
    },
  ];

  // Suggested questions
  const suggestedQuestions = [
    "Làm thế nào để đăng ký môn học?",
    "Điều kiện xét học bổng là gì?",
    "Làm sao để tham gia câu lạc bộ?",
    "Lịch thi học kỳ này như thế nào?",
    "Nội quy sinh viên FPTU có những gì?",
    "Học phí FPTU là bao nhiêu?",
  ];

  // Related questions based on topic
  const getRelatedQuestions = (lastMessage: string) => {
    if (lastMessage.includes("học bổng")) {
      return [
        "Hạn chót nộp hồ sơ học bổng là khi nào?",
        "Điều kiện duy trì học bổng?",
        "Có những loại học bổng nào?",
      ];
    }
    if (lastMessage.includes("đăng ký môn")) {
      return [
        "Làm sao để thay đổi lịch học?",
        "Số tín chỉ tối đa mỗi kỳ là bao nhiêu?",
        "Khi nào có thể rút môn?",
      ];
    }
    if (lastMessage.includes("CLB") || lastMessage.includes("câu lạc bộ")) {
      return [
        "Có những CLB nào về công nghệ?",
        "Làm sao để thành lập CLB mới?",
        "Lợi ích của việc tham gia CLB?",
      ];
    }
    return [
      "Dịch vụ hỗ trợ sinh viên có những gì?",
      "Cơ sở vật chất FPTU như thế nào?",
      "Hoạt động ngoại khóa tại FPTU?",
    ];
  };

  // Get query from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const queryParam = searchParams.get("q");
    if (queryParam) {
      setQuestion(queryParam);
      handleSubmitWithQuery(queryParam);
    }
  }, [location.search]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSubmitWithQuery = async (query: string) => {
    if (!query.trim()) return;

    const userMessage: Message = {
      type: "user",
      content: query,
      timestamp: new Date(),
      id: Date.now().toString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");
    setIsTyping(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        antMessage.error("Vui lòng đăng nhập lại");
        setIsTyping(false);
        return;
      }

      // Call API to generate AI response
      const response = await queryLogService.generate(query, token);

      const botMessage: Message = {
        type: "bot",
        content: response.response,
        sources: response.sources || [],
        timestamp: new Date(),
        id: response.id,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error: any) {
      console.error("Error generating response:", error);
      antMessage.error(
        error.response?.data?.message ||
          "Không thể tạo câu trả lời. Vui lòng thử lại!"
      );

      // Fallback message
      const errorMessage: Message = {
        type: "bot",
        content:
          "Xin lỗi, tôi đang gặp sự cố kỹ thuật. Vui lòng thử lại sau hoặc liên hệ phòng Đào tạo qua email: daotao@fpt.edu.vn hoặc hotline: (024) 7300 5588.",
        timestamp: new Date(),
        id: (Date.now() + 1).toString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmitWithQuery(question);
  };

  const handleSuggestedQuestion = (q: string) => {
    setQuestion(q);
    handleSubmitWithQuery(q);
  };

  const handleFeedback = async (messageId: string, isPositive: boolean) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        antMessage.error("Vui lòng đăng nhập lại");
        return;
      }

      if (isPositive) {
        // Send positive feedback to API
        await queryLogService.submitFeedback(
          {
            queryLogId: messageId,
            score: 5,
          },
          token
        );
        antMessage.success("Cảm ơn phản hồi của bạn! 👍");
      } else {
        setFeedbackMessageId(messageId);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      antMessage.error("Không thể gửi phản hồi. Vui lòng thử lại!");
    }
  };

  const handleSubmitFeedback = async () => {
    if (!feedbackMessageId) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        antMessage.error("Vui lòng đăng nhập lại");
        return;
      }

      // Send negative feedback to API
      await queryLogService.submitFeedback(
        {
          queryLogId: feedbackMessageId,
          score: 1,
          comment: feedbackText,
        },
        token
      );

      antMessage.success("Cảm ơn phản hồi của bạn! Chúng tôi sẽ cải thiện.");
      setFeedbackMessageId(null);
      setFeedbackText("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      antMessage.error("Không thể gửi phản hồi. Vui lòng thử lại!");
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Header - Riêng cho Chat */}
      <header className="bg-white border-b border-gray-200 shadow-sm flex-shrink-0">
        <div className="max-w-screen-2xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => navigate("/student")}
              className="flex items-center hover:opacity-80 transition"
            >
              <img
                src="/images/Logo_FPT_Education.png"
                alt="FPT Education"
                className="h-10 w-auto"
              />
            </button>

            {/* Navigation + User - BÊN PHẢI */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => navigate("/qa")}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-orange-50 text-orange-600"
              >
                <MessageOutlined />
                <span>Hỏi đáp AI</span>
              </button>
              <button
                onClick={() => navigate("/handbook")}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                <BookOutlined />
                <span>Sổ tay</span>
              </button>
              <button
                onClick={() => navigate("/clubs")}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                <TeamOutlined />
                <span>Câu lạc bộ</span>
              </button>
              <button
                onClick={() => navigate("/student/notifications")}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                <BellOutlined />
                <span>Thông báo</span>
              </button>

              {/* Divider */}
              <div className="w-px h-8 bg-gray-200 mx-2"></div>

              {/* User Dropdown */}
              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                <button className="flex items-center gap-3 hover:bg-gray-50 rounded-lg p-2 transition">
                  <Avatar
                    src={
                      user.avatarUrl ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user.fullName
                      )}&background=f97316&color=fff`
                    }
                    alt={user.fullName}
                    size={36}
                  />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900">
                      {user.fullName}
                    </p>
                    <p className="text-xs text-gray-500">{user.studentId}</p>
                  </div>
                </button>
              </Dropdown>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Container - FULL HEIGHT */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full overflow-hidden">
        {/* Welcome Screen */}
        {messages.length === 0 && (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center max-w-2xl">
              <div className="mb-8">
                <Avatar
                  size={100}
                  icon={<RobotOutlined />}
                  style={{
                    background: "linear-gradient(135deg, #f97316, #ea580c)",
                  }}
                  className="mx-auto shadow-lg"
                />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                Trợ lý AI - FPTU Handbook
              </h1>
              <p className="text-gray-600 mb-8">
                Xin chào! Tôi là trợ lý AI. Hãy hỏi tôi bất cứ điều gì về FPTU.
              </p>

              {/* Suggested Questions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {suggestedQuestions.map((q, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(q)}
                    className="text-left p-4 bg-white rounded-xl border border-gray-200 hover:border-orange-500 hover:shadow-md transition text-sm text-gray-700 hover:text-orange-600"
                  >
                    <MessageOutlined className="mr-2 text-orange-500" />
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Messages Area */}
        {messages.length > 0 && (
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${
                  msg.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {/* Bot Avatar */}
                {msg.type === "bot" && (
                  <Avatar
                    size={36}
                    icon={<RobotOutlined />}
                    style={{
                      background: "linear-gradient(135deg, #f97316, #ea580c)",
                      flexShrink: 0,
                    }}
                  />
                )}

                {/* Message Bubble */}
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                    msg.type === "user"
                      ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                      : "bg-white border border-gray-200 text-gray-900"
                  }`}
                  style={{
                    boxShadow:
                      msg.type === "user"
                        ? "0 2px 8px rgba(249, 115, 22, 0.3)"
                        : "0 1px 3px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {/* Message Text */}
                  <div className="text-sm leading-relaxed whitespace-pre-wrap">
                    {msg.content}
                  </div>

                  {/* Sources (Bot only) */}
                  {msg.type === "bot" && msg.sources && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-2 mb-2">
                        <BookOutlined className="text-orange-500 text-xs" />
                        <span className="text-xs font-semibold text-gray-700">
                          Nguồn tham khảo:
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {msg.sources.map((source, i) => (
                          <Tag key={i} color="orange" className="text-xs">
                            {source}
                          </Tag>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Feedback (Bot only) */}
                  {msg.type === "bot" && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      {feedbackMessageId === msg.id ? (
                        <div className="space-y-2">
                          <span className="text-xs font-semibold text-gray-700">
                            Vui lòng cho biết vấn đề:
                          </span>
                          <Input.TextArea
                            rows={2}
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                            placeholder="Nhập phản hồi..."
                            className="text-xs"
                          />
                          <Space size="small">
                            <Button
                              type="primary"
                              size="small"
                              onClick={handleFeedbackSubmit}
                              style={{
                                background:
                                  "linear-gradient(135deg, #f97316, #ea580c)",
                                border: "none",
                              }}
                            >
                              Gửi
                            </Button>
                            <Button
                              size="small"
                              onClick={() => setFeedbackMessageId(null)}
                            >
                              Hủy
                            </Button>
                          </Space>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">
                            Hữu ích?
                          </span>
                          <Button
                            type="text"
                            size="small"
                            icon={<LikeOutlined />}
                            onClick={() => handleFeedback(msg.id, "positive")}
                            className="text-green-600 hover:text-green-700"
                          />
                          <Button
                            type="text"
                            size="small"
                            icon={<DislikeOutlined />}
                            onClick={() => setFeedbackMessageId(msg.id)}
                            className="text-red-600 hover:text-red-700"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* User Avatar */}
                {msg.type === "user" && (
                  <Avatar
                    size={40}
                    icon={<UserOutlined />}
                    style={{
                      background: "linear-gradient(135deg, #6b7280, #374151)",
                      flexShrink: 0,
                    }}
                  />
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <Avatar
                  size={36}
                  icon={<RobotOutlined />}
                  style={{
                    background: "linear-gradient(135deg, #f97316, #ea580c)",
                    flexShrink: 0,
                  }}
                />
                <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                  <Space size="small">
                    <Spin size="small" />
                    <span className="text-sm text-gray-600">
                      Đang trả lời...
                    </span>
                  </Space>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Input Box - Fixed at bottom */}
        <div className="border-t border-gray-200 bg-white p-4">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <Input
              size="large"
              placeholder="Nhập câu hỏi của bạn..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              disabled={isTyping}
              className="flex-1"
              style={{ borderRadius: "12px" }}
            />
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              icon={<SendOutlined />}
              loading={isTyping}
              disabled={!question.trim()}
              style={{
                background: "linear-gradient(135deg, #f97316, #ea580c)",
                border: "none",
                borderRadius: "12px",
                minWidth: "100px",
              }}
            >
              Gửi
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QA;
