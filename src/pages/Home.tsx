import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      <section className="bg-gradient-to-br from-orange-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-orange-500 mb-4 leading-tight">
                CHÀO MỪNG TÂN SINH VIÊN
                <br />
                ĐẠI HỌC FPT!
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Khám phá trọn vẹn FPTU Handbook cùng sổi nổi sẽ sẵy FPTU.
              </p>

              {/* Search Box */}
              <form onSubmit={handleSearch} className="relative">
                <div className="flex items-center bg-white border-2 border-gray-300 rounded-full px-4 py-3 focus-within:border-orange-500 transition">
                  <svg
                    className="w-5 h-5 text-gray-400 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Hỏi ngay điều bạn cần biết về trường..."
                    className="flex-1 outline-none text-gray-700"
                  />
                  <button
                    type="submit"
                    className="bg-orange-500 text-white px-8 py-2 rounded-full hover:bg-orange-600 transition font-semibold ml-2"
                  >
                    Tìm kiếm
                  </button>
                </div>
              </form>
            </div>

            {/* Illustration */}
            <div className="flex justify-center">
              <div className="relative">
                <img
                  src="/api/placeholder/500/400"
                  alt="FPTU Students"
                  className="w-full max-w-lg rounded-2xl"
                />
                {/* Decorative icons */}
                <div className="absolute top-4 right-4 bg-white p-2 rounded-lg shadow-lg">
                  <span className="text-2xl">📚</span>
                </div>
                <div className="absolute bottom-4 left-4 bg-white p-2 rounded-lg shadow-lg">
                  <span className="text-2xl">💡</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Điểm nổi bật của FTU */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Điểm nổi bật của FTU
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="border-2 border-orange-500 rounded-2xl p-8 text-center hover:bg-orange-50 transition">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">
                Cơ sở chất lượng hiện đại
              </h3>
            </div>

            <div className="border-2 border-orange-500 rounded-2xl p-8 text-center hover:bg-orange-50 transition">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Cơ sở đào tạo đa dạng</h3>
            </div>

            <div className="border-2 border-orange-500 rounded-2xl p-8 text-center hover:bg-orange-50 transition">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Môi trường quốc tế</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Hoạt động & Sự kiện nổi bật */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Hoạt động & Sự kiện nổi bật
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Bảng thông báo */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <svg
                  className="w-6 h-6 text-orange-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                Bảng thông báo
              </h3>
              <div className="space-y-3">
                {[
                  {
                    date: "15/09",
                    title: "Tuần lễ định hướng SV",
                    time: "Toàn",
                  },
                  { date: "20/09", title: "Ngày hội CLB", time: "17:00" },
                  { date: "20/09", title: "Ngày hội CLB", time: "18:00" },
                  { date: "25/09", title: "Giải đấu E-Sports", time: "17:35" },
                  { date: "25/09", title: "Giải đấu E-Sports", time: "02:03" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-orange-500 font-semibold">
                        {item.date}
                      </span>
                      <span className="text-gray-700">{item.title}</span>
                    </div>
                    <span className="text-gray-500 text-sm">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hoạt động CLB */}
            <div className="space-y-4">
              {[
                { name: "CLB Bóng đá FPTU", img: "/api/placeholder/400/200" },
                { name: "CLB Coder Club", img: "/api/placeholder/400/200" },
                { name: "CLB Novy", img: "/api/placeholder/400/200" },
              ].map((club, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md overflow-hidden flex"
                >
                  <img
                    src={club.img}
                    alt={club.name}
                    className="w-32 h-24 object-cover"
                  />
                  <div className="flex-1 p-4 flex items-center justify-between">
                    <h4 className="font-semibold text-gray-900">{club.name}</h4>
                    <button
                      onClick={() => navigate("/clubs")}
                      className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition text-sm font-semibold"
                    >
                      Tìm hiểu
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
