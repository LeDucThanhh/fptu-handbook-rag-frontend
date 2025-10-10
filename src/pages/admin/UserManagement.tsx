import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Plus, Edit, Trash2, Shield, Search } from "lucide-react";
import { mockUsersData } from "@/services/mock/mockData";

export default function UserManagement() {
  const [users] = useState(mockUsersData);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-8 mb-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Quản lý người dùng & roles</h1>
          <p className="text-purple-100">
            Quản lý tài khoản, phân quyền và reset password
          </p>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm người dùng..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-purple-500 w-80"
            />
          </div>

          <button className="bg-purple-500 text-white px-6 py-2.5 rounded-lg hover:bg-purple-600 transition font-semibold inline-flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Thêm người dùng
          </button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Danh sách người dùng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {user.fullName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{user.fullName}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      {user.studentId && (
                        <p className="text-xs text-gray-500">
                          MSSV: {user.studentId}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {user.roles.map((role) => (
                        <span
                          key={role}
                          className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold"
                        >
                          {role}
                        </span>
                      ))}
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>

                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-blue-50 rounded-lg transition">
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg transition">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                      <button className="p-2 hover:bg-purple-50 rounded-lg transition">
                        <Shield className="w-4 h-4 text-purple-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

