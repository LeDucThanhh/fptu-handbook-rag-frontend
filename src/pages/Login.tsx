import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";
import { useAuthStore } from "@/contexts/AuthContext";
import { mockUsers } from "@/services/mock/mockAuth";
import { getDashboardRoute } from "@/utils/roleUtils";
import type { User } from "@/types";
import { Chrome, Loader2 } from "lucide-react";

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [preferredLanguage, setPreferredLanguage] = useState<"vi" | "en">(
    () => {
      // Try to get from localStorage first
      const saved = localStorage.getItem("preferredLanguage");
      if (saved === "vi" || saved === "en") return saved;

      // Try to detect from browser
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith("vi")) return "vi";
      if (browserLang.startsWith("en")) return "en";

      // Default to Vietnamese
      return "vi";
    }
  );
  const navigate = useNavigate();
  const { loginWithGoogle } = useAuthStore();

  // Save language preference when changed
  const handleLanguageChange = (lang: "vi" | "en") => {
    setPreferredLanguage(lang);
    localStorage.setItem("preferredLanguage", lang);
  };

  // Handle Google OAuth success
  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    try {
      setIsLoading(true);
      console.log("🔑 Google OAuth Success");
      console.log("📦 Full credential response:", credentialResponse);

      // Get ID token from credential response
      const idToken = credentialResponse.credential;

      if (!idToken) {
        throw new Error("No ID token received from Google");
      }

      console.log(
        "🎫 ID Token (first 50 chars):",
        idToken.substring(0, 50) + "..."
      );
      console.log("🎫 ID Token length:", idToken.length);

      // Send to backend with user's preferred language
      await loginWithGoogle(idToken, preferredLanguage);

      toast.success("Đăng nhập thành công!");

      // Navigate to student dashboard
      navigate("/student");
    } catch (error: any) {
      console.error("❌ Backend login error:", error);

      // Check if email confirmation is needed
      if (error.needsEmailConfirmation) {
        toast.info("Vui lòng kiểm tra email để xác nhận tài khoản");
        navigate("/check-email", { state: { email: error.email } });
        return;
      }

      toast.error(error.message || "Đăng nhập thất bại!");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Google OAuth error
  const handleGoogleError = () => {
    console.error("❌ Google OAuth Error");
    toast.error("Đăng nhập Google thất bại!");
  };

  const handleDemoLogin = async (
    role: "mentor" | "academic" | "affairs" | "club" | "admin"
  ) => {
    try {
      setIsLoading(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Get mock user by role
      const mockUserData = mockUsers[role];
      const user: User = {
        ...mockUserData,
        avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          mockUserData.fullName
        )}&background=f97316&color=fff`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Save to store
      useAuthStore.setState({
        user,
        token: `mock-jwt-${role}-token`,
        refreshToken: `mock-refresh-${role}-token`,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      toast.success(`Chào mừng ${user.fullName}! 🎉`);

      // Redirect to appropriate dashboard based on role
      const dashboardRoute = getDashboardRoute(user);
      navigate(dashboardRoute);
    } catch (error: any) {
      toast.error("Đăng nhập thất bại. Vui lòng thử lại!");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const demoRoles = [
    {
      key: "mentor" as const,
      label: "Mentor / Cố vấn",
      description: "Quản lý câu hỏi, phân tích",
      icon: "👨‍🏫",
    },
    {
      key: "academic" as const,
      label: "Phòng Đào tạo",
      description: "Quản lý handbook, rebuild index",
      icon: "📚",
    },
    {
      key: "affairs" as const,
      label: "Phòng Công tác SV",
      description: "Quản lý thông báo, CLB",
      icon: "📢",
    },
    {
      key: "club" as const,
      label: "Điều phối viên CLB",
      description: "Quản lý câu lạc bộ, sự kiện",
      icon: "🎯",
    },
    {
      key: "admin" as const,
      label: "Quản trị viên",
      description: "Quản lý hệ thống",
      icon: "⚙️",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-200/40 via-orange-100/30 to-transparent rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-orange-200/40 via-orange-100/30 to-transparent rounded-full -ml-48 -mb-48 blur-3xl"></div>
      </div>

      {/* Login Container */}
      <div className="relative w-full max-w-6xl">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Side - Branding */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-12 flex flex-col justify-center items-center text-white relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -ml-32 -mt-32"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full -mr-48 -mb-48"></div>
              </div>

              <div className="relative z-10 text-center space-y-6">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                  <img
                    src="/images/Logo_FPT_Education.png"
                    alt="FPT Education"
                    className="h-20 w-auto filter brightness-0 invert"
                  />
                </div>

                {/* Title */}
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold">FPTU Handbook RAG</h1>
                  <p className="text-xl text-orange-100">
                    Hệ thống hỏi đáp AI thông minh
                  </p>
                  <p className="text-orange-100 max-w-md mx-auto">
                    Sử dụng công nghệ RAG (Retrieval-Augmented Generation) để
                    cung cấp câu trả lời chính xác từ Sổ tay sinh viên FPT
                  </p>
                </div>

                {/* Features */}
                <div className="mt-12 space-y-4 text-left max-w-md mx-auto">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      🤖
                    </div>
                    <div>
                      <h3 className="font-semibold">AI-Powered Q&A</h3>
                      <p className="text-sm text-orange-100">
                        Trả lời câu hỏi tự động với độ chính xác cao
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      📚
                    </div>
                    <div>
                      <h3 className="font-semibold">Knowledge Base</h3>
                      <p className="text-sm text-orange-100">
                        Dữ liệu từ Sổ tay sinh viên chính thức
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      ⚡
                    </div>
                    <div>
                      <h3 className="font-semibold">Fast & Accurate</h3>
                      <p className="text-sm text-orange-100">
                        Phản hồi nhanh chóng với nguồn tham khảo rõ ràng
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="p-12 flex flex-col justify-center">
              <div className="max-w-md mx-auto w-full space-y-8">
                {/* Header */}
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold text-gray-900">
                    Đăng nhập
                  </h2>
                  <p className="text-gray-600">
                    Chào mừng bạn đến với FPTU Handbook RAG
                  </p>
                </div>

                {/* Language Selector */}
                <div className="flex justify-center gap-2 mb-6">
                  <button
                    onClick={() => handleLanguageChange("vi")}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      preferredLanguage === "vi"
                        ? "bg-orange-500 text-white shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    🇻🇳 Tiếng Việt
                  </button>
                  <button
                    onClick={() => handleLanguageChange("en")}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      preferredLanguage === "en"
                        ? "bg-orange-500 text-white shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    🇬🇧 English
                  </button>
                </div>

                {/* Student Login - Google Sign-In */}
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      👨‍🎓{" "}
                      {preferredLanguage === "vi"
                        ? "Dành cho Sinh viên"
                        : "For Students"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {preferredLanguage === "vi"
                        ? "Đăng nhập bằng tài khoản Google"
                        : "Sign in with Google account"}
                    </p>
                  </div>

                  {/* Google Login Button */}
                  <div className="flex justify-center">
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={handleGoogleError}
                      useOneTap
                      theme="filled_blue"
                      size="large"
                      text="signin_with"
                      shape="rectangular"
                      logo_alignment="left"
                    />
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-xs text-blue-700 text-center">
                      {preferredLanguage === "vi" ? (
                        <>
                          ✅ Tự động gán vai trò <strong>Sinh viên</strong> khi
                          đăng nhập lần đầu
                        </>
                      ) : (
                        <>
                          ✅ Automatically assigned <strong>Student</strong>{" "}
                          role on first login
                        </>
                      )}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500 font-medium">
                      {preferredLanguage === "vi" ? "HOẶC" : "OR"}
                    </span>
                  </div>
                </div>

                {/* Demo Mode - Other Roles */}
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      🧪 Demo Mode
                    </h3>
                    <p className="text-sm text-gray-600">
                      {preferredLanguage === "vi"
                        ? "Dành cho testing các vai trò khác"
                        : "For testing other roles"}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {demoRoles.map((role) => (
                      <button
                        key={role.key}
                        onClick={() => handleDemoLogin(role.key)}
                        disabled={isLoading}
                        className="group relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl p-4 hover:border-orange-500 hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-left"
                      >
                        <div className="flex items-start gap-3">
                          <div className="text-2xl">{role.icon}</div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 text-sm group-hover:text-orange-600 transition-colors">
                              {role.label}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                              {role.description}
                            </p>
                          </div>
                        </div>
                        {isLoading && (
                          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                            <Loader2 className="w-5 h-5 text-orange-500 animate-spin" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-xs text-yellow-700 text-center">
                      ⚠️ Demo mode chỉ dùng cho testing, không cần Google
                      account
                    </p>
                  </div>
                </div>

                {/* Footer Note */}
                <div className="text-center text-xs text-gray-500 pt-4 border-t border-gray-200">
                  <p>
                    Đây là đồ án tốt nghiệp - Capstone Project
                    <br />
                    FPT University © 2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
