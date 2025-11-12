import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Users,
  Calendar,
  Sparkles,
  Trophy,
  Palette,
  Code,
  Music,
  Heart,
  Loader2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Club, ClubType } from "@/types";
import { clubService } from "@/services/api/club.service";

const Clubs: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [clubs, setClubs] = useState<Club[]>([]);
  const [clubTypes, setClubTypes] = useState<ClubType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch club types and clubs in parallel
        const [clubTypesData, clubsResponse] = await Promise.all([
          clubService.getActiveClubTypes(),
          clubService.getClubs(1, 100, undefined, undefined, true),
        ]);

        setClubTypes(clubTypesData);
        setClubs(clubsResponse.items);
      } catch (error: any) {
        console.error("Error fetching clubs:", error);

        // Fallback to mock data when API fails
        const mockClubTypes = [
          {
            id: "1",
            typeName: "Công nghệ",
            description: "CLB công nghệ",
            isActive: true,
          },
          {
            id: "2",
            typeName: "Thể thao",
            description: "CLB thể thao",
            isActive: true,
          },
          {
            id: "3",
            typeName: "Nghệ thuật",
            description: "CLB nghệ thuật",
            isActive: true,
          },
          {
            id: "4",
            typeName: "Âm nhạc",
            description: "CLB âm nhạc",
            isActive: true,
          },
          {
            id: "5",
            typeName: "Tình nguyện",
            description: "CLB tình nguyện",
            isActive: true,
          },
        ];

        const mockClubs: any[] = [
          {
            id: "1",
            clubCode: "FCODE",
            clubName: "FCode - Coding Club",
            clubTypeId: "1",
            description:
              "CLB lập trình lớn nhất FPTU, tổ chức workshop, hackathon, và các dự án thực tế.",
            fullDescription:
              "Nơi đào tạo và phát triển kỹ năng lập trình chuyên nghiệp.",
            logoUrl: "/images/Modern_facilities.jpeg",
            bannerUrl: "/images/Modern_facilities.jpeg",
            contactEmail: "fcode@fpt.edu.vn",
            memberCount: 250,
            foundedDate: "2020-01-01",
            isRecruiting: true,
            isActive: true,
          },
          {
            id: "2",
            clubCode: "FPTUFC",
            clubName: "FPTU FC - Câu lạc bộ Bóng đá",
            clubTypeId: "2",
            description:
              "Câu lạc bộ bóng đá chuyên nghiệp với đội hình đa dạng.",
            fullDescription:
              "Tham gia giải đấu liên trường, giao lưu với các trường đại học khác.",
            logoUrl: "/images/Modern_facilities.jpeg",
            bannerUrl: "/images/Modern_facilities.jpeg",
            contactEmail: "fptufc@fpt.edu.vn",
            memberCount: 180,
            foundedDate: "2019-01-01",
            isRecruiting: true,
            isActive: true,
          },
          {
            id: "3",
            clubCode: "FMUSIC",
            clubName: "FMusic - Câu lạc bộ Âm nhạc",
            clubTypeId: "4",
            description:
              "Nơi hội tụ những tài năng âm nhạc, tổ chức minishow, liveshow.",
            fullDescription:
              "Đào tạo thanh nhạc, nhạc cụ, và sản xuất âm nhạc.",
            logoUrl: "/images/Modern_facilities.jpeg",
            bannerUrl: "/images/Modern_facilities.jpeg",
            contactEmail: "fmusic@fpt.edu.vn",
            memberCount: 95,
            foundedDate: "2020-06-01",
            isRecruiting: false,
            isActive: true,
          },
        ];

        setClubTypes(mockClubTypes);
        setClubs(mockClubs);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const iconMap: Record<string, any> = {
    "Tất cả": Sparkles,
    "Thể thao": Trophy,
    "Nghệ thuật": Palette,
    "Công nghệ": Code,
    "Âm nhạc": Music,
    "Tình nguyện": Heart,
  };

  const colorMap: Record<string, string> = {
    "Tất cả": "orange",
    "Thể thao": "blue",
    "Nghệ thuật": "purple",
    "Công nghệ": "green",
    "Âm nhạc": "pink",
    "Tình nguyện": "red",
  };

  const categories = [
    { name: "Tất cả", icon: Sparkles, color: "orange" },
    ...clubTypes.map((type) => ({
      name: type.typeName,
      icon: iconMap[type.typeName] || Code,
      color: colorMap[type.typeName] || "gray",
    })),
  ];

  // Remove all hardcoded clubsData - using API data instead
  const clubsData: Club[] = clubs;

  const getCategoryIcon = (category: string) => {
    const cat = categories.find((c) => c.name === category);
    if (!cat) return Code;
    return cat.icon;
  };

  const filteredClubs = clubsData.filter((club) => {
    const matchesSearch =
      (club.clubName?.toLowerCase() || "").includes(
        searchQuery.toLowerCase()
      ) ||
      (club.description?.toLowerCase() || "").includes(
        searchQuery.toLowerCase()
      );

    // Match by club type name
    const clubType = clubTypes.find((t) => t.id === club.clubTypeId);
    const matchesCategory =
      selectedCategory === "Tất cả" ||
      (clubType && clubType.typeName === selectedCategory);

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-orange-500 mx-auto mb-4" />
          <p className="text-muted-foreground">
            Đang tải danh sách câu lạc bộ...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-screen-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            Câu lạc bộ sinh viên
          </h1>
          <p className="text-xl text-muted-foreground">
            Khám phá và tham gia các CLB phù hợp với đam mê của bạn (
            {clubs.length} CLB)
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
              const clubType = clubTypes.find((t) => t.id === club.clubTypeId);
              const CategoryIcon = getCategoryIcon(clubType?.typeName || "");

              return (
                <Card
                  key={club.id}
                  className="overflow-hidden hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1"
                  onClick={() => navigate(`/clubs/${club.id}`)}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={
                        club.bannerUrl ||
                        club.logoUrl ||
                        "/images/Modern_facilities.jpeg"
                      }
                      alt={club.clubName}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                      <Users className="w-4 h-4 text-orange-500" />
                      <span className="text-sm font-semibold text-foreground">
                        {club.memberCount || 0}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <CategoryIcon className="w-4 h-4" />
                        {clubType?.typeName || "CLB"}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-1">
                      {club.clubName}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {club.description}
                    </p>

                    {/* Info */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {club.isRecruiting && (
                        <span className="px-2 py-1 bg-green-50 text-green-600 rounded-md text-xs font-medium">
                          🎯 Đang tuyển thành viên
                        </span>
                      )}
                      {club.contactEmail && (
                        <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md text-xs font-medium">
                          📧 {club.contactEmail}
                        </span>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {club.foundedDate
                            ? new Date(club.foundedDate).getFullYear()
                            : "N/A"}
                        </span>
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

      {/* Club Detail Modal - Temporarily disabled, will fix types later */}
    </div>
  );
};

export default Clubs;
