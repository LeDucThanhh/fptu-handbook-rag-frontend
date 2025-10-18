import { useAuthStore } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { User, Mail, Calendar, Edit } from "lucide-react";

export default function Profile() {
  const { user } = useAuthStore();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p className="text-gray-600">
            Vui lòng đăng nhập để xem thông tin cá nhân
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="relative">
            <h1
              className="text-3xl font-bold mb-2"
              style={{ fontFamily: "SVN-Product Sans, Inter, sans-serif" }}
            >
              Thông tin cá nhân 👤
            </h1>
            <p className="text-orange-100">
              Quản lý thông tin tài khoản của bạn
            </p>
          </div>
        </div>

        {/* Profile Card */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-start gap-6">
              <img
                src={
                  user.avatarUrl ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.fullName
                  )}&background=f97316&color=fff`
                }
                alt={user.fullName}
                className="w-32 h-32 rounded-full border-4 border-orange-500"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {user.fullName}
                  </h2>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg">
                    <Edit className="w-4 h-4" />
                    Chỉnh sửa
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Mail className="w-5 h-5 text-orange-500" />
                    <span>{user.email}</span>
                  </div>

                  {user.studentId && (
                    <div className="flex items-center gap-3 text-gray-700">
                      <User className="w-5 h-5 text-orange-500" />
                      <span>MSSV: {user.studentId}</span>
                    </div>
                  )}

                  {user.department && (
                    <div className="flex items-center gap-3 text-gray-700">
                      <User className="w-5 h-5 text-orange-500" />
                      <span>Phòng ban: {user.department}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-3 text-gray-700">
                    <Calendar className="w-5 h-5 text-orange-500" />
                    <span>
                      Tham gia:{" "}
                      {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                </div>

                {/* Roles */}
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Vai trò:</p>
                  <div className="flex flex-wrap gap-2">
                    {user.roles.map((role) => (
                      <span
                        key={role}
                        className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-bold text-gray-900 mb-4">Thông tin bổ sung</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600 mb-1">Số điện thoại</p>
                <p className="font-semibold text-gray-900">Chưa cập nhật</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Địa chỉ</p>
                <p className="font-semibold text-gray-900">Chưa cập nhật</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Ngày sinh</p>
                <p className="font-semibold text-gray-900">Chưa cập nhật</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Giới tính</p>
                <p className="font-semibold text-gray-900">Chưa cập nhật</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
