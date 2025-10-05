import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            FPTU Handbook RAG
          </h1>
          <p className="text-xl mb-8">
            Hệ thống hỏi đáp thông minh cho sinh viên FPT
          </p>
          <button
            onClick={() => navigate("/qa")}
            className="bg-white text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Bắt đầu hỏi đáp
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-6">
            <div className="text-5xl mb-4">💬</div>
            <h3 className="text-xl font-semibold mb-2">Hỏi đáp AI</h3>
            <p className="text-gray-600">
              Hỏi bất kỳ câu hỏi nào về quy định học vụ
            </p>
          </div>

          <div className="text-center p-6">
            <div className="text-5xl mb-4">📚</div>
            <h3 className="text-xl font-semibold mb-2">Sổ tay sinh viên</h3>
            <p className="text-gray-600">Tra cứu thông tin nhanh chóng</p>
          </div>

          <div className="text-center p-6">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">Câu lạc bộ</h3>
            <p className="text-gray-600">Khám phá các hoạt động ngoại khóa</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
