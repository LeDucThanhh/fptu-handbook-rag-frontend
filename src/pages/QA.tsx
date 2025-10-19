import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Send,
  ThumbsUp,
  ThumbsDown,
  Bot,
  User,
  Sparkles,
  BookOpen,
  Search,
  MessageCircle,
} from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Section } from "@/components/layout/Section";
import { ProfessionalCard } from "@/components/layout/ProfessionalCard";
import { DESIGN_TOKENS, BUTTON_VARIANTS } from "@/design-system/tokens";

interface Message {
  type: "user" | "bot";
  content: string;
  sources?: string[];
  timestamp: Date;
  id: string;
}

const QA: React.FC = () => {
  const location = useLocation();
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [feedbackMessageId, setFeedbackMessageId] = useState<string | null>(
    null
  );
  const [feedbackText, setFeedbackText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  const handleSubmitWithQuery = (query: string) => {
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
      const botMessage: Message = {
        type: "bot",
        content: `Để ${query.toLowerCase()}, bạn cần thực hiện các bước sau:\n\n1. **Truy cập FAP Portal**: Đăng nhập vào hệ thống FAP (fap.fpt.edu.vn) bằng tài khoản sinh viên của bạn.\n\n2. **Chọn chức năng tương ứng**: Vào mục đăng ký/quản lý môn học hoặc hoạt động bạn muốn.\n\n3. **Kiểm tra điều kiện**: Đảm bảo bạn đáp ứng các điều kiện cần thiết (GPA, số tín chỉ, v.v.).\n\n4. **Xác nhận đăng ký**: Sau khi hoàn tất, kiểm tra email xác nhận từ nhà trường.\n\nNếu bạn gặp khó khăn, vui lòng liên hệ phòng Đào tạo qua email: daotao@fpt.edu.vn hoặc hotline: (024) 7300 5588.`,
        sources: [
          "Sổ tay Sinh viên FPTU 2024",
          "Quy chế Đào tạo Đại học",
          "Hướng dẫn sử dụng FAP Portal",
        ],
        timestamp: new Date(),
        id: (Date.now() + 1).toString(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmitWithQuery(question);
  };

  const handleSuggestedQuestion = (q: string) => {
    setQuestion(q);
    handleSubmitWithQuery(q);
  };

  const handleFeedback = (messageId: string, isPositive: boolean) => {
    if (isPositive) {
      // TODO: Send positive feedback to API
      alert("Cảm ơn phản hồi của bạn! 👍");
    } else {
      setFeedbackMessageId(messageId);
    }
  };

  const handleSubmitFeedback = () => {
    // TODO: Send negative feedback to API
    alert(
      `Cảm ơn phản hồi của bạn! Chúng tôi sẽ cải thiện. Nội dung: ${feedbackText}`
    );
    setFeedbackMessageId(null);
    setFeedbackText("");
  };

  return (
    <PageContainer>
      {/* Professional Header Search Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="container mx-auto px-4 py-4 max-w-screen-2xl">
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-center bg-gray-50 border-2 border-gray-300 rounded-xl px-4 py-3 focus-within:border-orange-500 focus-within:bg-white transition-all">
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Đặt câu hỏi tiếp theo về FPTU..."
                className="flex-1 outline-none text-gray-700 bg-transparent"
              />
              <button
                type="submit"
                className={`${BUTTON_VARIANTS.primary} ml-2 flex items-center gap-2`}
                disabled={isTyping}
              >
                <Send className="w-4 h-4" />
                Gửi
              </button>
            </div>
          </form>
        </div>
      </div>

      <Section>
        {/* Professional Welcome Screen when no messages */}
        {messages.length === 0 && (
          <div className="text-center py-16 animate-fadeInUp">
            <div className="inline-block bg-gradient-to-br from-orange-400 to-orange-600 p-6 rounded-3xl shadow-2xl mb-6 transform hover:scale-105 transition-transform">
              <Bot className="w-16 h-16 text-white" />
            </div>
            <h1
              className={`${DESIGN_TOKENS.typography.heading2} ${DESIGN_TOKENS.colors.text.primary} mb-4`}
            >
              AI Assistant - FPTU Handbook RAG
            </h1>
            <p
              className={`${DESIGN_TOKENS.typography.bodyLarge} ${DESIGN_TOKENS.colors.text.secondary} mb-8 max-w-2xl mx-auto`}
            >
              Xin chào! Tôi là trợ lý AI của FPTU Handbook. Hãy hỏi tôi bất cứ
              điều gì về học vụ, hoạt động sinh viên, và cuộc sống tại FPTU.
            </p>

            {/* Suggested Questions Grid */}
            <div className="max-w-3xl mx-auto">
              <h2
                className={`${DESIGN_TOKENS.typography.heading4} ${DESIGN_TOKENS.colors.text.primary} mb-4 flex items-center justify-center gap-2`}
              >
                <Sparkles className="w-5 h-5 text-orange-500" />
                Câu hỏi gợi ý
              </h2>
              <div className="grid md:grid-cols-2 gap-3">
                {suggestedQuestions.map((q, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(q)}
                    className="bg-white border-2 border-gray-200 hover:border-orange-500 hover:bg-orange-50 rounded-xl p-4 text-left transition-all group"
                  >
                    <div className="flex items-start gap-3">
                      <MessageCircle className="w-5 h-5 text-orange-500 mt-0.5" />
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

        {/* Professional Messages Area */}
        {messages.length > 0 && (
          <div className="space-y-6">
            {messages.map((msg, index) => (
              <div
                key={msg.id}
                className={`flex gap-4 ${
                  msg.type === "user" ? "justify-end" : "justify-start"
                } animate-fadeInUp`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Avatar */}
                {msg.type === "bot" && (
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                  </div>
                )}

                {/* Message Content */}
                <div
                  className={`max-w-[75%] ${
                    msg.type === "user"
                      ? "bg-orange-500 text-white"
                      : "bg-white border-2 border-orange-100"
                  } rounded-2xl p-5 shadow-lg`}
                >
                  {/* Message Text */}
                  <div
                    className={`text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.type === "user" ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {msg.content}
                  </div>

                  {/* Sources Citation (Bot only) */}
                  {msg.type === "bot" && msg.sources && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-start gap-2 text-xs text-gray-600">
                        <BookOpen className="w-4 h-4 text-orange-500 mt-0.5" />
                        <div>
                          <p className="font-semibold text-gray-700 mb-1">
                            Nguồn tham khảo:
                          </p>
                          <ul className="space-y-1">
                            {msg.sources.map((source, i) => (
                              <li key={i} className="flex items-center gap-1">
                                <span className="w-1 h-1 bg-orange-500 rounded-full"></span>
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-orange-500 resize-none"
                            rows={3}
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleSubmitFeedback()}
                              className="flex-1 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition text-sm font-semibold"
                            >
                              Gửi phản hồi
                            </button>
                            <button
                              onClick={() => setFeedbackMessageId(null)}
                              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm"
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
                              className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-green-50 hover:border-green-500 transition group"
                            >
                              <ThumbsUp className="w-4 h-4 text-gray-600 group-hover:text-green-600" />
                              <span className="text-sm">Hữu ích</span>
                            </button>
                            <button
                              onClick={() => handleFeedback(msg.id, false)}
                              className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-red-50 hover:border-red-500 transition group"
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

                {/* Avatar (User) */}
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
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="bg-white border-2 border-orange-100 rounded-2xl p-5 shadow-lg">
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

            {/* Professional Related Questions */}
            {messages.length > 0 && !isTyping && (
              <ProfessionalCard className="animate-fadeInUp">
                <h3
                  className={`${DESIGN_TOKENS.typography.caption} ${DESIGN_TOKENS.colors.text.primary} mb-4 flex items-center gap-2`}
                >
                  <Sparkles className="w-4 h-4 text-orange-500" />
                  Câu hỏi liên quan bạn có thể quan tâm
                </h3>
                <div className="flex flex-wrap gap-2">
                  {getRelatedQuestions(
                    messages[messages.length - 1]?.content || ""
                  ).map((q, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedQuestion(q)}
                      className="px-4 py-2 bg-orange-50 hover:bg-orange-100 text-orange-600 rounded-lg text-sm font-medium transition border border-orange-200 hover:border-orange-400"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </ProfessionalCard>
            )}
          </div>
        )}
      </Section>
    </PageContainer>
  );
};

export default QA;
