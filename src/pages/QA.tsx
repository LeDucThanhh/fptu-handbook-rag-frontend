import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  ThumbsUp,
  ThumbsDown,
  Bot,
  User,
  Sparkles,
  BookOpen,
  MessageCircle,
  RotateCcw,
} from "lucide-react";

interface Message {
  type: "user" | "bot";
  content: string;
  sources?: string[];
  timestamp: Date;
  id: string;
  confidence?: number;
}

const QA: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [feedbackMessageId, setFeedbackMessageId] = useState<string | null>(
    null
  );
  const [feedbackText, setFeedbackText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Suggested questions
  const suggestedQuestions = [
    "Làm thế nào để đăng ký môn học?",
    "Điều kiện xét học bổng là gì?",
    "Làm sao để tham gia câu lạc bộ?",
    "Học phí FPTU là bao nhiêu?",
    "Quy định về điểm và học lực?",
    "Cơ sở vật chất tại FPTU như thế nào?",
  ];

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(question);
  };

  const handleSendMessage = (query: string) => {
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

    // Simulate AI response with typing delay
    setTimeout(() => {
      const confidence = Math.random() * 0.5 + 0.5; // 0.5 - 1.0
      const botMessage: Message = {
        type: "bot",
        content: `Để ${query.toLowerCase()}, bạn cần thực hiện các bước sau:\n\n**1. Truy cập FAP Portal**: Đăng nhập vào hệ thống FAP (fap.fpt.edu.vn) bằng tài khoản sinh viên của bạn.\n\n**2. Chọn chức năng tương ứng**: Vào mục đăng ký/quản lý môn học hoặc hoạt động bạn muốn.\n\n**3. Kiểm tra điều kiện**: Đảm bảo bạn đáp ứng các điều kiện cần thiết (GPA, số tín chỉ, v.v.).\n\n**4. Xác nhận đăng ký**: Sau khi hoàn tất, kiểm tra email xác nhận từ nhà trường.\n\nNếu bạn gặp khó khăn, vui lòng liên hệ phòng Đào tạo qua email: daotao@fpt.edu.vn hoặc hotline: (024) 7300 5588.`,
        sources: [
          "Sổ tay Sinh viên FPTU 2024",
          "Quy chế Đào tạo Đại học",
          "Hướng dẫn sử dụng FAP Portal",
        ],
        timestamp: new Date(),
        id: (Date.now() + 1).toString(),
        confidence,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestedQuestion = (q: string) => {
    setQuestion(q);
    handleSendMessage(q);
  };

  const handleFeedback = (messageId: string, isPositive: boolean) => {
    if (isPositive) {
      alert("Cảm ơn phản hồi của bạn! 👍");
    } else {
      setFeedbackMessageId(messageId);
    }
  };

  const handleSubmitFeedback = () => {
    alert(
      `Cảm ơn phản hồi của bạn! Chúng tôi sẽ cải thiện. Nội dung: ${feedbackText}`
    );
    setFeedbackMessageId(null);
    setFeedbackText("");
  };

  const handleNewChat = () => {
    if (
      messages.length > 0 &&
      confirm("Bạn có chắc muốn bắt đầu cuộc trò chuyện mới?")
    ) {
      setMessages([]);
      setQuestion("");
      inputRef.current?.focus();
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Header - Fixed Top */}
      <div className="bg-white border-b border-orange-200 shadow-sm z-10">
        <div className="container mx-auto px-4 py-4 max-w-5xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1
                  className="text-lg font-bold text-gray-900"
                  style={{ fontFamily: "SVN-Product Sans, Inter, sans-serif" }}
                >
                  FPTU AI Assistant
                </h1>
                <p className="text-xs text-gray-600">
                  Sẵn sàng giải đáp thắc mắc của bạn
                </p>
              </div>
            </div>
            {messages.length > 0 && (
              <button
                onClick={handleNewChat}
                className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-orange-200 text-orange-600 rounded-lg hover:bg-orange-50 hover:border-orange-400 transition-all text-sm font-semibold"
              >
                <RotateCcw className="w-4 h-4" />
                Chat mới
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Messages Area - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Welcome Screen when no messages */}
          {messages.length === 0 && (
            <div className="text-center py-16 animate-fadeInUp">
              <div className="inline-block bg-gradient-to-br from-orange-400 to-orange-600 p-8 rounded-3xl shadow-2xl mb-8 transform hover:scale-105 transition-transform">
                <Bot className="w-20 h-20 text-white" />
              </div>
              <h2
                className="text-3xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: "SVN-Product Sans, Inter, sans-serif" }}
              >
                Xin chào! Tôi là AI Assistant của FPTU
              </h2>
              <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
                Hãy hỏi tôi bất cứ điều gì về học vụ, hoạt động sinh viên, và
                cuộc sống tại FPTU.
              </p>

              {/* Suggested Questions Grid */}
              <div className="max-w-3xl mx-auto">
                <h3 className="text-lg font-semibold text-gray-700 mb-6 flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5 text-orange-500" />
                  Câu hỏi gợi ý
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {suggestedQuestions.map((q, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedQuestion(q)}
                      className="glare-card bg-white border-2 border-orange-200 hover:border-orange-500 hover:bg-orange-50 rounded-xl p-5 text-left transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        <MessageCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 group-hover:text-orange-600 font-medium">
                          {q}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.length > 0 && (
            <div className="space-y-6">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-4 ${
                    msg.type === "user" ? "justify-end" : "justify-start"
                  } animate-fadeInUp`}
                >
                  {/* Bot Avatar */}
                  {msg.type === "bot" && (
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                        <Bot className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[75%] ${
                      msg.type === "user"
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                        : "bg-white border-2 border-orange-100 shadow-md"
                    } rounded-2xl p-5`}
                  >
                    {/* Message Text */}
                    <div
                      className={`text-sm leading-relaxed whitespace-pre-wrap ${
                        msg.type === "user" ? "text-white" : "text-gray-800"
                      }`}
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {msg.content
                        .split(/\*\*(.*?)\*\*/g)
                        .map((part, i) =>
                          i % 2 === 0 ? (
                            <span key={i}>{part}</span>
                          ) : (
                            <strong key={i}>{part}</strong>
                          )
                        )}
                    </div>

                    {/* Confidence Badge for Bot */}
                    {msg.type === "bot" && msg.confidence !== undefined && (
                      <div className="mt-3">
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-semibold ${
                            msg.confidence >= 0.8
                              ? "bg-green-100 text-green-700"
                              : msg.confidence >= 0.5
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          Độ tin cậy: {(msg.confidence * 100).toFixed(0)}%
                        </span>
                      </div>
                    )}

                    {/* Sources Citation (Bot only) */}
                    {msg.type === "bot" && msg.sources && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-start gap-2 text-xs text-gray-600">
                          <BookOpen className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-gray-700 mb-2">
                              Nguồn tham khảo:
                            </p>
                            <ul className="space-y-1">
                              {msg.sources.map((source, i) => (
                                <li key={i} className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                                  <span className="italic">{source}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Feedback Section (Bot only) */}
                    {msg.type === "bot" && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        {feedbackMessageId === msg.id ? (
                          // Feedback Form
                          <div className="space-y-3">
                            <p className="text-sm font-semibold text-gray-700">
                              Vui lòng cho biết vấn đề:
                            </p>
                            <textarea
                              value={feedbackText}
                              onChange={(e) => setFeedbackText(e.target.value)}
                              placeholder="Ví dụ: Thông tin bị thiếu, Câu trả lời không chính xác..."
                              className="w-full px-3 py-2 border-2 border-orange-200 rounded-lg text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 resize-none transition-all"
                              rows={3}
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleSubmitFeedback()}
                                className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all text-sm font-semibold shadow-lg"
                              >
                                Gửi phản hồi
                              </button>
                              <button
                                onClick={() => setFeedbackMessageId(null)}
                                className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm"
                              >
                                Hủy
                              </button>
                            </div>
                          </div>
                        ) : (
                          // Feedback Buttons
                          <div className="flex items-center gap-4">
                            <p className="text-sm text-gray-600">
                              Câu trả lời này có hữu ích không?
                            </p>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleFeedback(msg.id, true)}
                                className="flex items-center gap-1 px-3 py-1.5 border-2 border-gray-300 rounded-lg hover:bg-green-50 hover:border-green-500 transition-all group"
                              >
                                <ThumbsUp className="w-4 h-4 text-gray-600 group-hover:text-green-600" />
                                <span className="text-sm">Hữu ích</span>
                              </button>
                              <button
                                onClick={() => handleFeedback(msg.id, false)}
                                className="flex items-center gap-1 px-3 py-1.5 border-2 border-gray-300 rounded-lg hover:bg-red-50 hover:border-red-500 transition-all group"
                              >
                                <ThumbsDown className="w-4 h-4 text-gray-600 group-hover:text-red-600" />
                                <span className="text-sm">Chưa hữu ích</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* User Avatar */}
                  {msg.type === "user" && (
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center shadow-lg">
                        <User className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-4 justify-start animate-fadeInUp">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="bg-white border-2 border-orange-100 rounded-2xl p-5 shadow-md">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input Area - Fixed Bottom */}
      <div className="bg-white border-t-2 border-orange-200 shadow-xl z-10">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <form onSubmit={handleSubmit} className="relative">
            <div className="glare-card">
              <div className="flex items-end gap-3 bg-white border-2 border-orange-200 rounded-2xl p-3 focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-100 transition-all shadow-lg">
                <textarea
                  ref={inputRef}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                  placeholder="Đặt câu hỏi của bạn... (Enter để gửi, Shift+Enter để xuống dòng)"
                  className="flex-1 outline-none text-gray-700 resize-none max-h-32 py-2 px-2"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                  rows={1}
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={!question.trim() || isTyping}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </form>

          {/* Helper Text */}
          <p className="text-xs text-gray-500 text-center mt-2">
            AI có thể mắc lỗi. Vui lòng kiểm tra thông tin quan trọng.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QA;
