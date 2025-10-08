import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/qa?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[70vh] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
        }}>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content */}
        <div className="relative h-full flex items-center justify-end pr-8 md:pr-16">
          <div className="text-white text-right max-w-md">
            {/* Background mảng đậm phía sau text */}
            <div className="bg-black bg-opacity-60 p-8 rounded-lg backdrop-blur-sm">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                Cẩm nang sinh viên
              </h1>
              <p className="text-lg md:text-xl mb-6">
                cùng Trường Đại học FPT
              </p>
              <Button
                onClick={() => navigate("/qa")}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 text-sm md:text-base font-medium"
              >
                Đọc ngay tại đây
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          {/* Main Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-12 text-center">
            TRƯỜNG ĐẠI HỌC FPT
          </h2>

          {/* Three Column Layout */}
          <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {/* Column 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Được thành lập ngày 08/09/2006
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Theo quyết định số 208/2006/QĐ-TTG của Thủ tướng Chính Phủ, do một doanh nghiệp thành lập với 100% vốn đầu tư từ Công ty Cổ phần FPT
              </p>
            </div>

            {/* Column 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Chương trình đào tạo chuẩn công nghệ quốc tế
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Sinh viên được đào tạo thành thạo hai ngoại ngữ, được rèn luyện kĩ năng mềm, được chú trọng phát triển toàn diện
              </p>
            </div>

            {/* Column 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Ghi dấu ấn trên bản đồ tri thức quốc gia và quốc tế
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Xếp hạng 80 thế giới theo tiêu chí SDG8 - Việc làm tốt và Tăng trưởng kinh tế trong bảng xếp hạng THE Impact Rankings 2025 - tạp chí Times Higher Education (THE) công bố ngày 18/06/2025
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
