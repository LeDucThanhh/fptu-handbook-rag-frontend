import { Card, Modal, Input, Select, notification } from "antd";
import { Users, Calendar, TrendingUp, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockClubs } from "@/services/mock/mockData";
import { useState } from "react";

const { TextArea } = Input;

export default function ClubList() {
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    contactEmail: "",
    phone: "",
    facebookGroup: "",
    zaloGroup: "",
    instagram: "",
    website: "",
    icon: "🎯",
  });

  const clubTypes = [
    "Học thuật",
    "Thể thao",
    "Nghệ thuật",
    "Công nghệ",
    "Tình nguyện",
    "Văn hóa",
    "Khác",
  ];

  const handleCreateClub = () => {
    if (
      !formData.name ||
      !formData.type ||
      !formData.description ||
      !formData.contactEmail
    ) {
      notification.error({
        message: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc!",
        placement: "topRight",
      });
      return;
    }

    // TODO: Call API to create club
    notification.success({
      message: "Thành công",
      description: "Đã tạo CLB mới thành công!",
      placement: "topRight",
      duration: 3,
    });

    setShowCreateModal(false);
    setFormData({
      name: "",
      type: "",
      description: "",
      contactEmail: "",
      phone: "",
      facebookGroup: "",
      zaloGroup: "",
      instagram: "",
      website: "",
      icon: "🎯",
    });
  };

  const quickStats = [
    {
      label: "Tổng số CLB",
      value: mockClubs.length.toString(),
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      label: "Tổng thành viên",
      value: mockClubs.reduce((sum, club) => sum + club.members, 0).toString(),
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      label: "Sự kiện tháng này",
      value: "12",
      icon: Calendar,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-screen-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Quản lý Câu lạc bộ
            </h1>
            <p className="text-xl text-gray-600 mt-2">
              Quản lý thông tin và hoạt động của các CLB
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold"
          >
            <Plus className="w-5 h-5" />
            Tạo CLB mới
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={index}
                className="hover:shadow-md transition-shadow shadow-md"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`${stat.bgColor} p-4 rounded-xl`}>
                      <Icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Clubs List */}
        <Card
          className="shadow-md"
          title={
            <span className="text-2xl font-semibold">Danh sách Câu lạc bộ</span>
          }
        >
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockClubs.map((club) => (
                <Card
                  key={club.id}
                  className="hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1 shadow-md"
                  onClick={() => navigate(`/club/detail/${club.id}`)}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">
                          {club.name}
                        </h3>
                        <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
                          {club.type}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {club.description}
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{club.members} thành viên</span>
                      </div>
                      <div className="text-gray-600">
                        <span className="font-semibold">Điều phối viên:</span>{" "}
                        {club.coordinator}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Create Club Modal */}
      <Modal
        title={<span className="text-xl font-semibold">Tạo CLB mới</span>}
        open={showCreateModal}
        onCancel={() => setShowCreateModal(false)}
        onOk={handleCreateClub}
        okText="Tạo CLB"
        cancelText="Hủy"
        width={700}
        okButtonProps={{ className: "bg-orange-500 hover:bg-orange-600" }}
      >
        <div className="space-y-4 py-4">
          {/* Club Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên CLB <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="Nhập tên câu lạc bộ"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              size="large"
            />
          </div>

          {/* Club Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loại CLB <span className="text-red-500">*</span>
            </label>
            <Select
              placeholder="Chọn loại câu lạc bộ"
              value={formData.type || undefined}
              onChange={(value) => setFormData({ ...formData, type: value })}
              size="large"
              className="w-full"
              options={clubTypes.map((type) => ({ label: type, value: type }))}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mô tả <span className="text-red-500">*</span>
            </label>
            <TextArea
              placeholder="Nhập mô tả về câu lạc bộ"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
            />
          </div>

          {/* Contact Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email liên hệ <span className="text-red-500">*</span>
            </label>
            <Input
              type="email"
              placeholder="example@fpt.edu.vn"
              value={formData.contactEmail}
              onChange={(e) =>
                setFormData({ ...formData, contactEmail: e.target.value })
              }
              size="large"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số điện thoại
            </label>
            <Input
              placeholder="0123456789"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              size="large"
            />
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Facebook Group
              </label>
              <Input
                placeholder="https://facebook.com/groups/..."
                value={formData.facebookGroup}
                onChange={(e) =>
                  setFormData({ ...formData, facebookGroup: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Zalo Group
              </label>
              <Input
                placeholder="https://zalo.me/g/..."
                value={formData.zaloGroup}
                onChange={(e) =>
                  setFormData({ ...formData, zaloGroup: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Instagram
              </label>
              <Input
                placeholder="https://instagram.com/..."
                value={formData.instagram}
                onChange={(e) =>
                  setFormData({ ...formData, instagram: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Website
              </label>
              <Input
                placeholder="https://..."
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
