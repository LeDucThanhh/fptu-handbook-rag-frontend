import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  Calendar,
  Mail,
  MapPin,
  Clock,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Club, ClubActivity } from "@/types";
import { clubService } from "@/services/api/club.service";

export default function ClubDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [club, setClub] = useState<Club | null>(null);
  const [activities, setActivities] = useState<ClubActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("about");

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        setLoading(true);

        // Fetch club details and activities in parallel
        const [clubData, activitiesData] = await Promise.all([
          clubService.getClubById(id),
          clubService.getActivitiesByClub(id),
        ]);

        setClub(clubData);
        setActivities(activitiesData);
      } catch (error: any) {
        console.error("Error fetching club details:", error);

        // Fallback to mock data
        const mockClub: any = {
          id: id,
          clubCode: "FCODE",
          clubName: "FCode - Coding Club",
          clubTypeId: "1",
          description:
            "CLB lập trình lớn nhất FPTU, tổ chức workshop, hackathon, và các dự án thực tế.",
          fullDescription:
            "FCode là câu lạc bộ lập trình lớn nhất tại FPT University. Chúng tôi tổ chức các workshop, hackathon, và các dự án thực tế để giúp sinh viên phát triển kỹ năng lập trình. Tham gia FCode để kết nối với cộng đồng developer, học hỏi từ các senior, và xây dựng portfolio ấn tượng!",
          logoUrl: "/images/Modern_facilities.jpeg",
          bannerUrl: "/images/Modern_facilities.jpeg",
          contactEmail: "fcode@fpt.edu.vn",
          memberCount: 250,
          foundedDate: "2020-01-01",
          isRecruiting: true,
          isActive: true,
        };

        const mockActivities: any[] = [
          {
            id: "1",
            activityName: "Workshop: React & TypeScript",
            description:
              "Workshop về React và TypeScript cho người mới bắt đầu. Học cách xây dựng ứng dụng web hiện đại với React hooks, TypeScript, và best practices.",
            startDate: "2024-02-15T14:00:00",
            endDate: "2024-02-15T17:00:00",
            location: "Lab 301, Tòa nhà Alpha",
            maxParticipants: 50,
            isPublic: true,
            status: 0, // Upcoming
            clubId: id,
          },
          {
            id: "2",
            activityName: "Hackathon 2024",
            description:
              "Cuộc thi lập trình 24 giờ với giải thưởng hấp dẫn. Đội chiến thắng sẽ nhận được 10 triệu đồng và cơ hội thực tập tại các công ty công nghệ hàng đầu.",
            startDate: "2024-03-01T08:00:00",
            endDate: "2024-03-02T08:00:00",
            location: "Hội trường A",
            maxParticipants: 100,
            isPublic: true,
            status: 0, // Upcoming
            clubId: id,
          },
        ];

        setClub(mockClub);
        setActivities(mockActivities);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const getActivityStatusBadge = (status: number) => {
    const statusMap: Record<number, { label: string; variant: any }> = {
      0: { label: "Sắp diễn ra", variant: "default" },
      1: { label: "Đang diễn ra", variant: "default" },
      2: { label: "Đã kết thúc", variant: "secondary" },
      3: { label: "Đã hủy", variant: "destructive" },
    };
    const statusInfo = statusMap[status] || statusMap[0];
    return (
      <Badge variant={statusInfo.variant as any}>{statusInfo.label}</Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  if (!club) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Không tìm thấy câu lạc bộ</h2>
        <Button onClick={() => navigate("/clubs")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay lại danh sách
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div
        className="relative h-64 bg-cover bg-center"
        style={{
          backgroundImage: `url(${
            club.bannerUrl || "/images/Modern_facilities.jpeg"
          })`,
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-6">
            <Button
              variant="ghost"
              className="text-white hover:bg-white/20 mb-4"
              onClick={() => navigate("/clubs")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại
            </Button>
            <div className="flex items-end gap-4">
              <img
                src={club.logoUrl || "/images/Modern_facilities.jpeg"}
                alt={club.clubName}
                className="w-24 h-24 rounded-lg border-4 border-white shadow-lg object-cover"
              />
              <div className="text-white mb-2">
                <h1 className="text-3xl font-bold">{club.clubName}</h1>
                <p className="text-lg opacity-90">{club.clubCode}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="about">📖 Giới thiệu</TabsTrigger>
            <TabsTrigger value="activities">📅 Hoạt động</TabsTrigger>
            <TabsTrigger value="contact">📧 Liên hệ</TabsTrigger>
          </TabsList>

          {/* About Tab */}
          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>Về câu lạc bộ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Mô tả</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {club.fullDescription || club.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-sm text-gray-500">Thành viên</p>
                      <p className="font-semibold">
                        {club.memberCount || 0} người
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-sm text-gray-500">Ngày thành lập</p>
                      <p className="font-semibold">
                        {club.foundedDate
                          ? formatDate(club.foundedDate)
                          : "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-sm text-gray-500">Email liên hệ</p>
                      <p className="font-semibold">{club.contactEmail}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 flex items-center justify-center">
                      {club.isRecruiting ? "✅" : "❌"}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        Trạng thái tuyển thành viên
                      </p>
                      <p className="font-semibold">
                        {club.isRecruiting ? "Đang tuyển" : "Không tuyển"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activities Tab */}
          <TabsContent value="activities">
            <div className="space-y-4">
              {activities.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center text-gray-500">
                    Chưa có hoạt động nào
                  </CardContent>
                </Card>
              ) : (
                activities.map((activity) => (
                  <Card
                    key={activity.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold mb-2">
                            {activity.activityName}
                          </h3>
                          {getActivityStatusBadge(activity.status)}
                        </div>
                        {!activity.isPublic && (
                          <Badge variant="outline">🔒 Nội bộ</Badge>
                        )}
                      </div>

                      <p className="text-gray-700 mb-4">
                        {activity.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>
                            Bắt đầu: {formatDateTime(activity.startDate)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>
                            Kết thúc: {formatDateTime(activity.endDate)}
                          </span>
                        </div>
                        {activity.location && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{activity.location}</span>
                          </div>
                        )}
                        {activity.maxParticipants && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <Users className="w-4 h-4" />
                            <span>
                              Tối đa: {activity.maxParticipants} người
                            </span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin liên hệ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a
                      href={`mailto:${club.contactEmail}`}
                      className="font-semibold text-orange-500 hover:underline"
                    >
                      {club.contactEmail}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
