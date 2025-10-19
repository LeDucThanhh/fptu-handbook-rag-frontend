import { useAuthStore } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Mail, Phone, Globe, Save, Edit, Facebook, Instagram, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockClubs } from "@/services/mock/mockData";

export default function ClubDetail() {
  const { user } = useAuthStore();
  const { clubId } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  // Mock: Lấy club data từ clubId
  const initialClub = mockClubs.find(c => c.id === clubId) || mockClubs[0];
  
  const [clubData, setClubData] = useState({
    name: initialClub.name,
    type: initialClub.type,
    description: initialClub.description,
    members: initialClub.members,
    coordinator: initialClub.coordinator,
    contactEmail: initialClub.contactEmail,
    phone: initialClub.phone || "",
    facebookGroup: initialClub.facebookGroup || "",
    zaloGroup: initialClub.zaloGroup || "",
    instagram: initialClub.instagram || "",
    tiktok: initialClub.tiktok || "",
    website: initialClub.website || "",
    isRecruiting: true,
  });

  const handleSave = () => {
    // TODO: Save to backend
    setIsEditing(false);
    alert("Đã lưu thông tin CLB!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back Button */}
        <button
          onClick={() => navigate("/club/dashboard")}
          className="flex items-center gap-2 text-gray-600 hover:text-pink-600 mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại danh sách</span>
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-4xl backdrop-blur-sm">
              {initialClub.icon}
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-1">Chi tiết Câu lạc bộ</h1>
              <p className="text-pink-100">{clubData.name}</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tổng thành viên</p>
                  <p className="text-4xl font-bold text-pink-600">{clubData.members}</p>
                </div>
                <Users className="w-12 h-12 text-pink-300" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tăng trưởng</p>
                  <p className="text-4xl font-bold text-orange-600">+15%</p>
                  <p className="text-xs text-gray-500 mt-1">So với tháng trước</p>
                </div>
                <TrendingUp className="w-12 h-12 text-orange-300" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Trạng thái</p>
                  <p
                    className={`text-lg font-bold ${
                      clubData.isRecruiting ? "text-orange-600" : "text-gray-600"
                    }`}
                  >
                    {clubData.isRecruiting ? "Đang tuyển" : "Không tuyển"}
                  </p>
                </div>
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    clubData.isRecruiting ? "bg-orange-100" : "bg-gray-100"
                  }`}
                >
                  <span className="text-2xl">{clubData.isRecruiting ? "✅" : "⏸️"}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Club Information */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Thông tin câu lạc bộ</CardTitle>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition font-semibold"
                >
                  <Edit className="w-4 h-4" />
                  Chỉnh sửa
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition font-semibold"
                  >
                    <Save className="w-4 h-4" />
                    Lưu thay đổi
                  </button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên câu lạc bộ
                  </label>
                  <input
                    type="text"
                    value={clubData.name}
                    onChange={(e) => setClubData({ ...clubData, name: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-pink-500 disabled:bg-gray-50 disabled:text-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loại câu lạc bộ
                  </label>
                  <select
                    value={clubData.type}
                    onChange={(e) => setClubData({ ...clubData, type: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-pink-500 disabled:bg-gray-50"
                  >
                    <option>Học thuật</option>
                    <option>Thể thao</option>
                    <option>Nghệ thuật</option>
                    <option>Tình nguyện</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mô tả câu lạc bộ
                </label>
                <textarea
                  rows={4}
                  value={clubData.description}
                  onChange={(e) => setClubData({ ...clubData, description: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-pink-500 resize-none disabled:bg-gray-50"
                  placeholder="Giới thiệu về câu lạc bộ..."
                />
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Thông tin liên hệ</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-pink-500" />
                      Email
                    </label>
                    <input
                      type="email"
                      value={clubData.contactEmail}
                      onChange={(e) =>
                        setClubData({ ...clubData, contactEmail: e.target.value })
                      }
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-pink-500 disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-pink-500" />
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      value={clubData.phone}
                      onChange={(e) => setClubData({ ...clubData, phone: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-pink-500 disabled:bg-gray-50"
                      placeholder="0123456789"
                    />
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Social Media & Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Facebook className="w-4 h-4 text-orange-500" />
                      Facebook Group
                    </label>
                    <input
                      type="url"
                      value={clubData.facebookGroup}
                      onChange={(e) =>
                        setClubData({ ...clubData, facebookGroup: e.target.value })
                      }
                      disabled={!isEditing}
                      placeholder="https://facebook.com/groups/..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-pink-500 disabled:bg-gray-50 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <img
                        src="https://img.icons8.com/color/20/zalo.png"
                        alt="Zalo"
                        className="w-4 h-4"
                      />
                      Zalo Group
                    </label>
                    <input
                      type="url"
                      value={clubData.zaloGroup}
                      onChange={(e) =>
                        setClubData({ ...clubData, zaloGroup: e.target.value })
                      }
                      disabled={!isEditing}
                      placeholder="https://zalo.me/g/..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-pink-500 disabled:bg-gray-50 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Instagram className="w-4 h-4 text-pink-500" />
                      Instagram
                    </label>
                    <input
                      type="url"
                      value={clubData.instagram}
                      onChange={(e) =>
                        setClubData({ ...clubData, instagram: e.target.value })
                      }
                      disabled={!isEditing}
                      placeholder="https://instagram.com/..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-pink-500 disabled:bg-gray-50 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-orange-500" />
                      Website
                    </label>
                    <input
                      type="url"
                      value={clubData.website}
                      onChange={(e) => setClubData({ ...clubData, website: e.target.value })}
                      disabled={!isEditing}
                      placeholder="https://..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-pink-500 disabled:bg-gray-50 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Recruiting Status */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Trạng thái tuyển thành viên</h3>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="recruiting"
                      checked={clubData.isRecruiting}
                      onChange={() => setClubData({ ...clubData, isRecruiting: true })}
                      disabled={!isEditing}
                      className="w-4 h-4 text-pink-500"
                    />
                    <span className="text-sm font-medium">Đang tuyển thành viên</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="recruiting"
                      checked={!clubData.isRecruiting}
                      onChange={() => setClubData({ ...clubData, isRecruiting: false })}
                      disabled={!isEditing}
                      className="w-4 h-4 text-pink-500"
                    />
                    <span className="text-sm font-medium">Tạm ngưng tuyển</span>
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preview Card */}
        <Card>
          <CardHeader>
            <CardTitle>Preview - Giao diện sinh viên nhìn thấy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-br from-pink-50 to-white p-6 rounded-xl border-2 border-pink-200">
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-16 h-16 bg-gradient-to-br from-${initialClub.color}-400 to-${initialClub.color}-600 rounded-2xl flex items-center justify-center text-3xl`}>
                  {initialClub.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{clubData.name}</h3>
                  <span className="text-xs px-3 py-1 bg-pink-100 text-pink-700 rounded-full font-medium">
                    {clubData.type}
                  </span>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{clubData.description}</p>

              <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-pink-500" />
                  <span className="text-gray-700">{clubData.members} thành viên</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-pink-500" />
                  <span className="text-gray-700 truncate">{clubData.contactEmail}</span>
                </div>
                {clubData.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-pink-500" />
                    <span className="text-gray-700">{clubData.phone}</span>
                  </div>
                )}
                {clubData.isRecruiting && (
                  <div className="col-span-2">
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">
                      ✅ Đang tuyển thành viên mới
                    </span>
                  </div>
                )}
              </div>

              {/* Social Links Preview */}
              <div className="flex flex-wrap gap-2 mb-4">
                {clubData.facebookGroup && (
                  <a
                    href={clubData.facebookGroup}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm font-medium"
                  >
                    <Facebook className="w-4 h-4" />
                    Facebook
                  </a>
                )}
                {clubData.zaloGroup && (
                  <a
                    href={clubData.zaloGroup}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition text-sm font-medium"
                  >
                    Zalo Group
                  </a>
                )}
                {clubData.instagram && (
                  <a
                    href={clubData.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1.5 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition text-sm font-medium"
                  >
                    <Instagram className="w-4 h-4" />
                    Instagram
                  </a>
                )}
                {clubData.website && (
                  <a
                    href={clubData.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm font-medium"
                  >
                    <Globe className="w-4 h-4" />
                    Website
                  </a>
                )}
              </div>

              <button className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-pink-700 transition shadow-lg">
                Đăng ký tham gia
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

