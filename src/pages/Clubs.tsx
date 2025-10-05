import React from "react";

const Clubs: React.FC = () => {
  const sampleClubs = [
    { name: "CLB Bóng đá", members: 120, category: "Thể thao" },
    { name: "CLB Âm nhạc", members: 80, category: "Nghệ thuật" },
    { name: "CLB Lập trình", members: 150, category: "Công nghệ" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Danh sách câu lạc bộ
        </h1>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Tìm kiếm câu lạc bộ..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
          />
        </div>

        {/* Clubs List */}
        <div className="space-y-4">
          {sampleClubs.map((club, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{club.name}</h3>
                  <p className="text-gray-500">
                    {club.category} • {club.members} thành viên
                  </p>
                </div>
                <button className="text-orange-500 hover:text-orange-600 font-semibold">
                  Chi tiết →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Clubs;
