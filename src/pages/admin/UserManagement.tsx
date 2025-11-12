import { useState, useEffect } from "react";
import { Card } from "antd";
import { Plus, Edit, Shield, Search, Loader2 } from "lucide-react";
import {
  Modal,
  Form,
  Input,
  Select,
  message,
  Popconfirm,
  Pagination,
} from "antd";
import { userService, adminService, departmentService } from "@/services/api";
import type { UserProfile } from "@/types";
import type { Department } from "@/services/api/department.service";

const { Option } = Select;

export default function UserManagement() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
  const [form] = Form.useForm();
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchUsers();
    fetchDepartments();
  }, [page, searchQuery]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("Vui lòng đăng nhập lại");
        return;
      }

      const response = await userService.getAllUsers(
        page,
        pageSize,
        searchQuery,
        undefined,
        undefined,
        undefined,
        "fullname",
        false,
        token
      );

      setUsers(response.items);
      setTotal(response.total);
    } catch (error: any) {
      console.error("Error fetching users:", error);
      message.error(
        error.response?.data?.message || "Không thể tải danh sách người dùng"
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const data = await departmentService.getAll(token);
      setDepartments(data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const handleAddUser = () => {
    setEditingUser(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEditUser = (user: UserProfile) => {
    setEditingUser(user);
    form.setFieldsValue({
      email: user.email,
      fullName: user.fullName,
      departmentId: user.departmentId,
      role: user.role,
    });
    setIsModalOpen(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("Vui lòng đăng nhập lại");
        return;
      }

      if (editingUser) {
        // Update existing user
        await userService.updateUserProfile(
          editingUser.userProfileId,
          values,
          token
        );
        message.success("Cập nhật người dùng thành công!");
      } else {
        // Create new user based on role
        if (values.role === "Staff" || values.role === "Admin") {
          await adminService.registerStaff(
            {
              email: values.email,
              fullName: values.fullName,
              departmentId: values.departmentId,
              role: values.role,
            },
            token
          );
        } else if (values.role === "Mentor") {
          await adminService.registerMentor(
            {
              email: values.email,
              fullName: values.fullName,
              departmentId: values.departmentId,
            },
            token
          );
        } else if (values.role === "ClubCoordinator") {
          // Note: This needs clubId, not departmentId
          message.warning(
            "Tạo Club Coordinator cần chọn CLB. Vui lòng dùng trang quản lý CLB."
          );
          return;
        }
        message.success("Thêm người dùng thành công!");
      }

      setIsModalOpen(false);
      form.resetFields();
      fetchUsers();
    } catch (error: any) {
      console.error("Error saving user:", error);
      message.error(
        error.response?.data?.message || "Không thể lưu người dùng"
      );
    }
  };

  const handleToggleActive = async (userId: string, isActive: boolean) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("Vui lòng đăng nhập lại");
        return;
      }

      if (isActive) {
        await adminService.deactivateUser(userId, token);
        message.success("Đã vô hiệu hóa người dùng");
      } else {
        await adminService.activateUser(userId, token);
        message.success("Đã kích hoạt người dùng");
      }

      fetchUsers();
    } catch (error: any) {
      console.error("Error toggling user status:", error);
      message.error(
        error.response?.data?.message || "Không thể thay đổi trạng thái"
      );
    }
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-screen-2xl mx-auto space-y-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Quản lý người dùng</h1>
            <p className="text-gray-600">
              Quản lý tài khoản và phân quyền người dùng
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm người dùng..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-orange-500 w-80"
              onChange={(e) => handleSearch(e.target.value)}
              value={searchQuery}
            />
          </div>

          <button
            onClick={handleAddUser}
            className="bg-orange-500 text-white px-6 py-2.5 rounded-lg hover:bg-orange-600 transition font-semibold inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Thêm người dùng
          </button>
        </div>

        <Card
          className="shadow-md"
          title={
            <span className="text-lg font-semibold">
              Danh sách người dùng ({total} người dùng)
            </span>
          }
        >
          <div className="p-6">
            {loading ? (
              <div className="text-center py-12">
                <Loader2 className="w-12 h-12 animate-spin text-orange-500 mx-auto mb-4" />
                <p className="text-gray-500">
                  Đang tải danh sách người dùng...
                </p>
              </div>
            ) : users.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Không tìm thấy người dùng nào</p>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div
                      key={user.userProfileId}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                          {user.fullName?.charAt(0) || "U"}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">
                            {user.fullName}
                          </p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          {user.studentId && (
                            <p className="text-xs text-gray-500">
                              MSSV: {user.studentId}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                          {user.role}
                        </span>

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
                          <button
                            onClick={() => handleEditUser(user)}
                            className="p-2 hover:bg-blue-50 rounded-lg transition"
                            title="Chỉnh sửa"
                          >
                            <Edit className="w-4 h-4 text-blue-600" />
                          </button>

                          <Popconfirm
                            title={
                              user.isActive
                                ? "Vô hiệu hóa người dùng?"
                                : "Kích hoạt người dùng?"
                            }
                            description={
                              user.isActive
                                ? "Người dùng sẽ không thể đăng nhập"
                                : "Người dùng sẽ có thể đăng nhập lại"
                            }
                            onConfirm={() =>
                              handleToggleActive(user.userId, user.isActive)
                            }
                            okText="Xác nhận"
                            cancelText="Hủy"
                          >
                            <button
                              className="p-2 hover:bg-purple-50 rounded-lg transition"
                              title={
                                user.isActive ? "Vô hiệu hóa" : "Kích hoạt"
                              }
                            >
                              <Shield
                                className={`w-4 h-4 ${
                                  user.isActive
                                    ? "text-purple-600"
                                    : "text-gray-400"
                                }`}
                              />
                            </button>
                          </Popconfirm>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="mt-6 flex justify-center">
                  <Pagination
                    current={page}
                    pageSize={pageSize}
                    total={total}
                    onChange={(newPage) => setPage(newPage)}
                    showSizeChanger={false}
                    showTotal={(total) => `Tổng ${total} người dùng`}
                  />
                </div>
              </>
            )}
          </div>
        </Card>

        {/* Add/Edit User Modal */}
        <Modal
          title={editingUser ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}
          open={isModalOpen}
          onOk={handleModalOk}
          onCancel={() => {
            setIsModalOpen(false);
            form.resetFields();
          }}
          okText={editingUser ? "Cập nhật" : "Thêm"}
          cancelText="Hủy"
          width={600}
        >
          <Form form={form} layout="vertical" className="mt-4">
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Vui lòng nhập email" },
                { type: "email", message: "Email không hợp lệ" },
              ]}
            >
              <Input
                placeholder="example@fpt.edu.vn"
                disabled={!!editingUser}
              />
            </Form.Item>

            <Form.Item
              name="fullName"
              label="Họ và tên"
              rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
            >
              <Input placeholder="Nguyễn Văn A" />
            </Form.Item>

            <Form.Item
              name="role"
              label="Vai trò"
              rules={[{ required: true, message: "Vui lòng chọn vai trò" }]}
            >
              <Select placeholder="Chọn vai trò" disabled={!!editingUser}>
                <Option value="Student">Student</Option>
                <Option value="Mentor">Mentor</Option>
                <Option value="AcademicStaff">Academic Staff</Option>
                <Option value="StudentAffairs">Student Affairs</Option>
                <Option value="ClubCoordinator">Club Coordinator</Option>
                <Option value="Admin">Admin</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="departmentId"
              label="Khoa/Phòng ban"
              rules={[
                { required: true, message: "Vui lòng chọn khoa/phòng ban" },
              ]}
            >
              <Select
                placeholder="Chọn khoa/phòng ban"
                showSearch
                optionFilterProp="children"
              >
                {departments.map((dept) => (
                  <Option key={dept.id} value={dept.id}>
                    {dept.name} ({dept.code})
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
