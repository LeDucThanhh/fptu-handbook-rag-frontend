import React, { useState } from "react";

const QA: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<
    Array<{ type: "user" | "bot"; content: string }>
  >([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setMessages([...messages, { type: "user", content: question }]);
    // TODO: Call API here
    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content:
            "Đây là câu trả lời mẫu từ AI. Backend API sẽ được tích hợp sau.",
        },
      ]);
    }, 1000);
    setQuestion("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Chat Container */}
        <div className="bg-white rounded-lg shadow h-[calc(100vh-120px)] flex flex-col">
          {/* Header */}
          <div className="border-b px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              AI Assistant - FPTU Handbook
            </h1>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-6 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <div className="text-6xl mb-4">💬</div>
                  <p className="text-lg">Hỏi gì đó về FPT University</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-3 rounded-lg ${
                        msg.type === "user"
                          ? "bg-orange-500 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t p-4">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Nhập câu hỏi..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              />
              <button
                type="submit"
                className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
              >
                Gửi
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QA;
