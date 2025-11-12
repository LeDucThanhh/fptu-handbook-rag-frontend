import React, { useState, useEffect } from "react";
import { useAuthStore } from "@/contexts/AuthContext";
import { Form, Input, Button, Card, Divider, Row, Col, message } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { ImageUpload } from "@/components/ImageUpload";
import { userService } from "@/services/api";

const Profile: React.FC = () => {
  const { user } = useAuthStore();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(
    user?.avatarUrl
  );

  // Sync avatarUrl with user from store
  useEffect(() => {
    console.log("👤 User from store:", user);
    console.log("🖼️ Avatar URL:", user?.avatarUrl);

    if (user?.avatarUrl) {
      setAvatarUrl(user.avatarUrl);
    }
  }, [user?.avatarUrl]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600">
            Vui lòng đăng nhập để xem thông tin cá nhân
          </p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("Vui lòng đăng nhập lại");
        return;
      }

      // Call API to update profile
      const updatedProfile = await userService.updateMyProfile(
        { ...values, avatarUrl },
        token
      );

      // Update user in Zustand store
      useAuthStore.setState({ user: updatedProfile });

      message.success("Cập nhật thông tin thành công!");
    } catch (error: any) {
      console.error("Error updating profile:", error);
      message.error(
        error.response?.data?.message || "Cập nhật thông tin thất bại!"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (url: string) => {
    setAvatarUrl(url);

    // Update user in Zustand store
    if (user) {
      const updatedUser = {
        ...user,
        avatarUrl: url,
        updatedAt: new Date().toISOString(),
      };

      // Update store
      useAuthStore.setState({ user: updatedUser });

      // Save to localStorage (persist across sessions)
      const customAvatarKey = `avatar_${user.id}`;
      localStorage.setItem(customAvatarKey, url);

      console.log("✅ Avatar saved to localStorage:", url);

      // Call API to save to backend
      try {
        const token = localStorage.getItem("token");
        if (token) {
          await userService.updateMyProfile({ avatarUrl: url }, token);
          message.success("Cập nhật avatar thành công!");
        }
      } catch (error) {
        console.error("Error updating avatar:", error);
        message.warning("Avatar đã lưu local nhưng chưa đồng bộ với server");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Hồ sơ cá nhân
          </h1>
          <p className="text-lg text-gray-600">
            Quản lý thông tin cá nhân của bạn
          </p>
        </div>

        <Card>
          {/* Avatar Section */}
          <div className="text-center mb-8">
            <ImageUpload
              folder="avatars"
              currentImageUrl={avatarUrl}
              onUploadSuccess={handleAvatarUpload}
              maxSizeMB={5}
              shape="circle"
              size={120}
            />
            <h2 className="text-2xl font-bold text-gray-900 mt-4">
              {user.fullName}
            </h2>
            <p className="text-gray-500">{user.studentId}</p>
          </div>

          <Divider />

          {/* Profile Form */}
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              fullName: user.fullName,
              email: user.email,
              studentId: user.studentId,
              phone: "",
              address: "",
            }}
            onFinish={handleSubmit}
          >
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Họ và tên"
                  name="fullName"
                  rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Nguyễn Văn A"
                    size="large"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Mã sinh viên" name="studentId">
                  <Input prefix={<UserOutlined />} disabled size="large" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Vui lòng nhập email!" },
                    { type: "email", message: "Email không hợp lệ!" },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined />}
                    placeholder="example@fpt.edu.vn"
                    size="large"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  rules={[
                    {
                      pattern: /^[0-9]{10}$/,
                      message: "Số điện thoại không hợp lệ!",
                    },
                  ]}
                >
                  <Input
                    prefix={<PhoneOutlined />}
                    placeholder="0123456789"
                    size="large"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="Địa chỉ" name="address">
              <Input.TextArea
                placeholder="Nhập địa chỉ của bạn"
                rows={3}
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SaveOutlined />}
                loading={loading}
                size="large"
                block
              >
                Cập nhật thông tin
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
