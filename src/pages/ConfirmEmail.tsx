import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, Button, Space, Typography, Spin, Result } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { authService } from "@/services/api/auth.service";

const { Title, Text } = Typography;

const ConfirmEmail: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        // Get userId and token from URL query params
        const userId = searchParams.get("userId");
        const encodedToken = searchParams.get("token");

        console.log("🔍 Confirming email with:", {
          userId,
          token: encodedToken?.substring(0, 20) + "...",
        });

        if (!userId || !encodedToken) {
          throw new Error(
            "Thiếu thông tin xác nhận. Vui lòng kiểm tra lại liên kết."
          );
        }

        // Decode the token (it's URL-encoded in the email link)
        const token = decodeURIComponent(encodedToken);
        console.log("🔓 Decoded token:", token.substring(0, 20) + "...");

        // Call backend to confirm email
        await authService.confirmEmail(userId, token);

        console.log("✅ Email confirmed successfully");
        setStatus("success");
        setMessage("Email đã được xác nhận thành công!");

        // Auto redirect to login after 3 seconds
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (error: any) {
        console.error("❌ Email confirmation error:", error);
        setStatus("error");
        setMessage(
          error.response?.data?.message ||
            error.message ||
            "Xác nhận email thất bại. Vui lòng thử lại."
        );
      }
    };

    confirmEmail();
  }, [searchParams, navigate]);

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
        bodyStyle={{ padding: "48px 32px" }}
      >
        {/* Loading State */}
        {status === "loading" && (
          <Space
            direction="vertical"
            size="large"
            style={{ width: "100%", textAlign: "center" }}
          >
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
                <LoadingOutlined style={{ fontSize: 40, color: "#f97316" }} />
              </div>
            </div>
            <div>
              <Title
                level={3}
                style={{
                  marginBottom: 8,
                  fontFamily: "SVN-Product Sans, sans-serif",
                }}
              >
                Đang xác nhận email...
              </Title>
              <Text type="secondary">Vui lòng đợi trong giây lát</Text>
            </div>
          </Space>
        )}

        {/* Success State */}
        {status === "success" && (
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
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
                <CheckCircleOutlined
                  style={{ fontSize: 40, color: "#f97316" }}
                />
              </div>
            </div>

            <div style={{ textAlign: "center" }}>
              <Title
                level={3}
                style={{
                  marginBottom: 8,
                  fontFamily: "SVN-Product Sans, sans-serif",
                }}
              >
                Xác nhận thành công!
              </Title>
              <Text type="secondary">{message}</Text>
            </div>

            <Card
              style={{
                background: "#fff7ed",
                border: "1px solid #fed7aa",
                borderRadius: 8,
              }}
              bodyStyle={{ padding: "16px", textAlign: "center" }}
            >
              <Text style={{ color: "#ea580c" }}>
                ✅ Bạn giờ có thể đăng nhập vào hệ thống
              </Text>
            </Card>

            <div style={{ textAlign: "center" }}>
              <Text
                type="secondary"
                style={{ display: "block", marginBottom: 8 }}
              >
                Đang chuyển hướng đến trang đăng nhập...
              </Text>
              <LoadingOutlined style={{ fontSize: 16, color: "#f97316" }} />
            </div>

            <Button
              type="primary"
              size="large"
              block
              icon={<RightOutlined />}
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
              Đi đến Đăng nhập
            </Button>
          </Space>
        )}

        {/* Error State */}
        {status === "error" && (
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
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
                <CloseCircleOutlined
                  style={{ fontSize: 40, color: "#dc2626" }}
                />
              </div>
            </div>

            <div style={{ textAlign: "center" }}>
              <Title
                level={3}
                style={{
                  marginBottom: 8,
                  fontFamily: "SVN-Product Sans, sans-serif",
                }}
              >
                Xác nhận thất bại
              </Title>
              <Text type="secondary">{message}</Text>
            </div>

            <Card
              style={{
                background: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: 8,
              }}
              bodyStyle={{ padding: "16px", textAlign: "center" }}
            >
              <Text style={{ color: "#dc2626" }}>
                ❌ Không thể xác nhận email của bạn
              </Text>
            </Card>

            <Button
              type="primary"
              size="large"
              block
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
              Quay lại Đăng nhập
            </Button>
          </Space>
        )}
      </Card>
    </div>
  );
};

export default ConfirmEmail;
