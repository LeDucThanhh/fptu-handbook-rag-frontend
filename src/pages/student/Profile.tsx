import React, { useState } from "react";
import { useAuthStore } from "@/contexts/AuthContext";
import {
  Form,
  Input,
  Button,
  Avatar,
  Upload,
  Card,
  Divider,
  Row,
  Col,
  message,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  CameraOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import type { UploadProps } from "antd";

const Profile: React.FC = () => {
  const { user } = useAuthStore();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

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
      // TODO: Call API to update profile
      console.log("Profile update:", values);
      message.success("Cập nhật thông tin thành công!");
    } catch (error) {
      message.error("Cập nhật thông tin thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const uploadProps: UploadProps = {
    name: "avatar",
    listType: "picture-circle",
    showUploadList: false,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("Chỉ được upload file ảnh!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Ảnh phải nhỏ hơn 2MB!");
      }
      return isImage && isLt2M;
    },
    onChange: (info) => {
      if (info.file.status === "done") {
        message.success("Upload ảnh thành công!");
      } else if (info.file.status === "error") {
        message.error("Upload ảnh thất bại!");
      }
    },
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
            <Upload {...uploadProps}>
              <div className="relative inline-block cursor-pointer group">
                <Avatar
                  size={120}
                  src={
                    user.avatarUrl ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.fullName
                    )}&background=f97316&color=fff&size=120`
                  }
                  icon={<UserOutlined />}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <CameraOutlined style={{ fontSize: 32, color: "white" }} />
                </div>
              </div>
            </Upload>
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
              phone: user.phone || "",
              address: user.address || "",
            }}
            onFinish={handleSubmit}
          >
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Họ và tên"
                  name="fullName"
                  rules={[
                    { required: true, message: "Vui lòng nhập họ tên!" },
                  ]}
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
                  <Input
                    prefix={<UserOutlined />}
                    disabled
                    size="large"
                  />
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
                    { pattern: /^[0-9]{10}$/, message: "Số điện thoại không hợp lệ!" },
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
                prefix={<HomeOutlined />}
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
