import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Save } from "lucide-react";

export default function ClubProfile() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl p-8 mb-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Quản lý hồ sơ CLB</h1>
          <p className="text-pink-100">Cập nhật thông tin, logo và mô tả CLB</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Thông tin cơ bản</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên CLB
                </label>
                <input
                  type="text"
                  defaultValue="FPTU Code"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loại CLB
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-pink-500">
                  <option>Học thuật</option>
                  <option>Thể thao</option>
                  <option>Nghệ thuật</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mô tả CLB
                </label>
                <textarea
                  rows={4}
                  defaultValue="Câu lạc bộ lập trình và công nghệ"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-pink-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email liên hệ
                  </label>
                  <input
                    type="email"
                    defaultValue="fcode@fpt.edu.vn"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    defaultValue="0123456789"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-pink-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trạng thái tuyển thành viên
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="recruiting" defaultChecked />
                    <span className="text-sm">Đang tuyển</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="recruiting" />
                    <span className="text-sm">Không tuyển</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  Hủy
                </button>
                <button className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition font-semibold inline-flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Lưu thay đổi
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}



