import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, Button, Space, Typography, Steps } from "antd";
import {
  MailOutlined,
  LeftOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

const CheckEmail: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get email from navigation state
  const email = location.state?.email || "email của bạn";

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #fff5f0 0%, #ffffff 50%, #fff5f0 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "SVN-Product Sans, sans-serif",
      }}
    >
      <Card
        style={{
          maxWidth: 500,
          width: "100%",
          borderRadius: 16,
          boxShadow: "0 8px 24px rgba(249, 115, 22, 0.12)",
        }}
        bodyStyle={{ padding: "32px" }}
      >
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {/* Icon */}
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "#fff7ed",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MailOutlined style={{ fontSize: 40, color: "#f97316" }} />
            </div>
          </div>

          {/* Title */}
          <div style={{ textAlign: "center" }}>
            <Title
              level={3}
              style={{
                marginBottom: 8,
                fontFamily: "SVN-Product Sans, sans-serif",
              }}
            >
              Yêu cầu xác nhận Email
            </Title>
            <Text type="secondary">Vui lòng kiểm tra hộp thư đến của bạn</Text>
          </div>

          {/* Email Display */}
          <Card
            style={{
              background: "#fff7ed",
              border: "1px solid #fed7aa",
              borderRadius: 8,
            }}
            bodyStyle={{ padding: "16px", textAlign: "center" }}
          >
            <Text
              type="secondary"
              style={{ display: "block", marginBottom: 4 }}
            >
              Email đã được gửi đến:
            </Text>
            <Text strong style={{ color: "#f97316", fontSize: 16 }}>
              {email}
            </Text>
          </Card>

          {/* Instructions */}
          <div>
            <Title
              level={5}
              style={{
                marginBottom: 16,
                fontFamily: "SVN-Product Sans, sans-serif",
              }}
            >
              Các bước tiếp theo:
            </Title>
            <Steps
              direction="vertical"
              size="small"
              current={-1}
              items={[
                {
                  title: "Kiểm tra hộp thư đến email của bạn",
                  icon: (
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        background: "#fff7ed",
                        color: "#f97316",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        fontSize: 12,
                      }}
                    >
                      1
                    </div>
                  ),
                },
                {
                  title: "Mở email từ FPTU Handbook",
                  icon: (
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        background: "#fff7ed",
                        color: "#f97316",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        fontSize: 12,
                      }}
                    >
                      2
                    </div>
                  ),
                },
                {
                  title: "Nhấn vào liên kết xác nhận trong email",
                  icon: (
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        background: "#fff7ed",
                        color: "#f97316",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        fontSize: 12,
                      }}
                    >
                      3
                    </div>
                  ),
                },
                {
                  title: "Quay lại ứng dụng này và đăng nhập lại",
                  icon: (
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        background: "#fff7ed",
                        color: "#f97316",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        fontSize: 12,
                      }}
                    >
                      4
                    </div>
                  ),
                },
              ]}
            />
          </div>

          {/* Info Box */}
          <Card
            style={{
              background: "#fff7ed",
              border: "1px solid #fed7aa",
              borderRadius: 8,
            }}
            bodyStyle={{ padding: "16px" }}
          >
            <Space align="start" size="middle">
              <InfoCircleOutlined style={{ fontSize: 20, color: "#f97316" }} />
              <div>
                <Paragraph strong style={{ marginBottom: 8, color: "#ea580c" }}>
                  Không nhận được email?
                </Paragraph>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: 20,
                    color: "#9a3412",
                    fontSize: 13,
                  }}
                >
                  <li>Kiểm tra thư mục spam/junk</li>
                  <li>Đợi vài phút và kiểm tra lại</li>
                  <li>Liên hệ hỗ trợ nếu cần giúp đỡ</li>
                </ul>
              </div>
            </Space>
          </Card>

          {/* Back to Login Button */}
          <Button
            type="primary"
            size="large"
            block
            icon={<LeftOutlined />}
            onClick={() => navigate("/login")}
            style={{
              height: 48,
              borderRadius: 8,
              background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
              border: "none",
              fontWeight: 600,
              fontSize: 16,
              fontFamily: "SVN-Product Sans, sans-serif",
            }}
          >
            Quay lại đăng nhập
          </Button>

          {/* Footer */}
          <div style={{ textAlign: "center", marginTop: 8 }}>
            <Text type="secondary" style={{ fontSize: 14 }}>
              Cần hỗ trợ?{" "}
              <a
                href="mailto:support@fptu.edu.vn"
                style={{ color: "#f97316", fontWeight: 600 }}
              >
                Liên hệ chúng tôi
              </a>
            </Text>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default CheckEmail;
