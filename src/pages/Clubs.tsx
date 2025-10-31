import React, { useState } from "react";
import {
  Search,
  Users,
  Calendar,
  MapPin,
  Mail,
  X,
  Sparkles,
  Trophy,
  Palette,
  Code,
  Music,
  Heart,
  BookOpen,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Club {
  id: number;
  name: string;
  category: string;
  members: number;
  description: string;
  meeting: string;
  location: string;
  contact: string;
  image: string;
  tags: string[];
  president: string;
  achievements?: string[];
}

const Clubs: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);

  const categories = [
    { name: "Tất cả", icon: Sparkles, color: "orange" },
    { name: "Thể thao", icon: Trophy, color: "blue" },
    { name: "Nghệ thuật", icon: Palette, color: "purple" },
    { name: "Công nghệ", icon: Code, color: "green" },
    { name: "Âm nhạc", icon: Music, color: "pink" },
    { name: "Tình nguyện", icon: Heart, color: "red" },
  ];

  const clubsData: Club[] = [
    {
      id: 1,
      name: "FCode - Coding Club",
      category: "Công nghệ",
      members: 250,
      description:
        "CLB lập trình lớn nhất FPTU, tổ chức workshop, hackathon, và các dự án thực tế. Nơi đào tạo và phát triển kỹ năng lập trình chuyên nghiệp.",
      meeting: "Thứ 3, 17:00 - 19:00",
      location: "Phòng Lab A201",
      contact: "fcode@fpt.edu.vn",
      image: "/images/Modern_facilities.jpeg",
      tags: ["Lập trình", "AI", "Web Dev", "Mobile"],
      president: "Nguyễn Văn A",
      achievements: [
        "🏆 Vô địch Hackathon FPTU 2023",
        "🎯 30+ dự án thực tế đã triển khai",
        "💡 5 startup thành công từ thành viên CLB",
      ],
    },
    {
      id: 2,
      name: "FPTU FC - Câu lạc bộ Bóng đá",
      category: "Thể thao",
      members: 180,
      description:
        "Câu lạc bộ bóng đá chuyên nghiệp với đội hình đa dạng. Tham gia giải đấu liên trường, giao lưu với các trường đại học khác.",
      meeting: "Thứ 2, 4, 6 - 17:00 - 19:00",
      location: "Sân bóng FPTU",
      contact: "fptufc@fpt.edu.vn",
      image: "/images/Modern_facilities.jpeg",
      tags: ["Bóng đá", "Thể thao", "Team building"],
      president: "Trần Văn B",
      achievements: [
        "⚽ Á quân giải bóng đá sinh viên TP.HCM 2023",
        "🏅 Top 4 giải đấu liên trường khu vực Đông Nam Bộ",
        "👥 120+ trận giao hữu với các trường",
      ],
    },
    {
      id: 3,
      name: "FMusic - Câu lạc bộ Âm nhạc",
      category: "Âm nhạc",
      members: 95,
      description:
        "Nơi hội tụ những tài năng âm nhạc, tổ chức minishow, liveshow, và các hoạt động âm nhạc. Đào tạo thanh nhạc, nhạc cụ, và sản xuất âm nhạc.",
      meeting: "Thứ 5, 18:00 - 20:00",
      location: "Phòng Band 301",
      contact: "fmusic@fpt.edu.vn",
      image: "/images/Modern_facilities.jpeg",
      tags: ["Âm nhạc", "Band", "Vocal", "Producer"],
      president: "Lê Thị C",
      achievements: [
        "🎵 10+ MV ca nhạc chất lượng",
        "🎤 Tổ chức 5 concert lớn mỗi năm",
        "🎸 Hợp tác với các nghệ sĩ chuyên nghiệp",
      ],
    },
    {
      id: 4,
      name: "FPhoto - Câu lạc bộ Nhiếp ảnh",
      category: "Nghệ thuật",
      members: 120,
      description:
        "CLB nhiếp ảnh và quay phim chuyên nghiệp. Đào tạo kỹ năng chụp ảnh, chỉnh sửa, và sản xuất nội dung visual cho các sự kiện trường.",
      meeting: "Thứ 7, 14:00 - 16:00",
      location: "Studio A102",
      contact: "fphoto@fpt.edu.vn",
      image: "/images/Modern_facilities.jpeg",
      tags: ["Nhiếp ảnh", "Photoshop", "Videography"],
      president: "Phạm Văn D",
      achievements: [
        "📸 1000+ ảnh chất lượng cho sự kiện trường",
        "🎬 20+ video viral trên mạng xã hội",
        "🏆 Giải nhất cuộc thi nhiếp ảnh sinh viên toàn quốc",
      ],
    },
    {
      id: 5,
      name: "Green FPTU - CLB Tình nguyện",
      category: "Tình nguyện",
      members: 200,
      description:
        "Câu lạc bộ tình nguyện lớn nhất FPTU, tổ chức các hoạt động từ thiện, bảo vệ môi trường, và hỗ trợ cộng đồng.",
      meeting: "Chủ nhật, 08:00 - 10:00",
      location: "Hội trường B",
      contact: "greenfptu@fpt.edu.vn",
      image: "/images/Modern_facilities.jpeg",
      tags: ["Tình nguyện", "Môi trường", "Từ thiện"],
      president: "Hoàng Thị E",
      achievements: [
        "❤️ 50+ chuyến từ thiện mỗi năm",
        "🌱 Trồng 10,000+ cây xanh",
        "🎁 Hỗ trợ 100+ gia đình khó khăn",
      ],
    },
    {
      id: 6,
      name: "FPTU Dance Crew",
      category: "Nghệ thuật",
      members: 75,
      description:
        "Đội nhảy chuyên nghiệp của FPTU, biểu diễn tại các sự kiện lớn, tham gia các cuộc thi nhảy toàn quốc. Đào tạo các thể loại từ Urban đến K-pop.",
      meeting: "Thứ 3, 6 - 19:00 - 21:00",
      location: "Phòng Dance 402",
      contact: "fptudance@fpt.edu.vn",
      image: "/images/Modern_facilities.jpeg",
      tags: ["Dance", "Performance", "K-pop", "Urban"],
      president: "Đỗ Văn F",
      achievements: [
        "💃 Top 3 cuộc thi nhảy toàn quốc",
        "🎭 Biểu diễn tại 20+ sự kiện lớn",
        "📺 5M+ views các video performance",
      ],
    },
  ];

  const getCategoryIcon = (category: string) => {
    const cat = categories.find((c) => c.name === category);
    if (!cat) return Code;
    return cat.icon;
  };

  const filteredClubs = clubsData.filter((club) => {
    const matchesSearch =
      club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "Tất cả" || club.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-screen-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            Câu lạc bộ sinh viên
          </h1>
          <p className="text-xl text-muted-foreground">
            Khám phá và tham gia các CLB phù hợp với đam mê của bạn
          </p>
        </div>
        {/* Search and Filter */}
        <Card>
          <CardContent className="p-6">
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm câu lạc bộ theo tên, mô tả, hoặc tag..."
                className="w-full pl-12 pr-4 py-4 border-2 border-border rounded-2xl focus:outline-none focus:border-orange-500 transition-all bg-background"
              />
            </div>

            {/* Categories Filter */}
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = selectedCategory === cat.name;
                return (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                      isActive
                        ? "bg-orange-500 text-white shadow-lg scale-105"
                        : "bg-background text-foreground hover:bg-muted border-2 border-border"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{cat.name}</span>
                    {cat.name === "Tất cả" && (
                      <span className="ml-1 text-xs opacity-75">
                        ({clubsData.length})
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Clubs Grid */}
        {filteredClubs.length === 0 ? (
          <Card>
            <CardContent className="text-center py-16">
              <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Không tìm thấy câu lạc bộ nào
              </h3>
              <p className="text-muted-foreground">
                Thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClubs.map((club) => {
              const CategoryIcon = getCategoryIcon(club.category);

              return (
                <Card
                  key={club.id}
                  className="overflow-hidden hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1"
                  onClick={() => setSelectedClub(club)}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={club.image}
                      alt={club.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                      <Users className="w-4 h-4 text-orange-500" />
                      <span className="text-sm font-semibold text-foreground">
                        {club.members}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <CategoryIcon className="w-4 h-4" />
                        {club.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-1">
                      {club.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {club.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {club.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-orange-50 text-orange-600 rounded-md text-xs font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{club.meeting.split(",")[0]}</span>
                      </div>
                      <button className="text-orange-500 hover:text-orange-600 font-semibold text-sm flex items-center gap-1">
                        Chi tiết
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Club Detail Modal */}
      {selectedClub && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4 backdrop-blur-sm"
          onClick={() => setSelectedClub(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-slideInUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedClub(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all shadow-lg z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image Header */}
            <div className="relative h-64 overflow-hidden rounded-t-3xl">
              <img
                src={selectedClub.image}
                alt={selectedClub.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-3 mb-3">
                  {React.createElement(getCategoryIcon(selectedClub.category), {
                    className: "w-8 h-8 text-white",
                  })}
                  <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                    {selectedClub.category}
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  {selectedClub.name}
                </h2>
                <p className="text-orange-200 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {selectedClub.members} thành viên
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-orange-500" />
                  Giới thiệu
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {selectedClub.description}
                </p>
              </div>

              {/* Achievements */}
              {selectedClub.achievements && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-orange-500" />
                    Thành tích nổi bật
                  </h3>
                  <ul className="space-y-2">
                    {selectedClub.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className="text-gray-700 pl-6 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-orange-500 before:rounded-full"
                      >
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Info Grid */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-orange-50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-orange-600 mb-2">
                    <Calendar className="w-5 h-5" />
                    <span className="font-semibold">Lịch họp</span>
                  </div>
                  <p className="text-gray-700">{selectedClub.meeting}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-blue-600 mb-2">
                    <MapPin className="w-5 h-5" />
                    <span className="font-semibold">Địa điểm</span>
                  </div>
                  <p className="text-gray-700">{selectedClub.location}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-purple-600 mb-2">
                    <Users className="w-5 h-5" />
                    <span className="font-semibold">Chủ nhiệm</span>
                  </div>
                  <p className="text-gray-700">{selectedClub.president}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-green-600 mb-2">
                    <Mail className="w-5 h-5" />
                    <span className="font-semibold">Liên hệ</span>
                  </div>
                  <p className="text-gray-700">{selectedClub.contact}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Tags:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedClub.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button className="flex-1 bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition font-semibold shadow-lg hover:shadow-xl">
                  Đăng ký tham gia
                </button>
                <button className="px-6 py-3 border-2 border-orange-500 text-orange-500 rounded-xl hover:bg-orange-50 transition font-semibold">
                  Tìm hiểu thêm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clubs;
