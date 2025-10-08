import React from "react";
import { useGlareEffect } from "../hooks/useGlareEffect";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const googleButtonGlare = useGlareEffect();

  if (!isOpen) return null;

  const handleGoogleLogin = () => {
    // TODO: Integrate with Firebase/Google OAuth
    console.log("Google login clicked");
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      {/* Modal Container with slide animation */}
      <div className="bg-gradient-to-br from-white to-orange-50 rounded-3xl shadow-2xl p-12 max-w-2xl w-full animate-slideInUp relative overflow-hidden">
        {/* Beautiful Static Background Decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-orange-200/40 via-orange-100/30 to-transparent rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-orange-200/40 via-orange-100/30 to-transparent rounded-full -ml-16 -mb-16 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-r from-yellow-100/20 to-orange-100/20 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>

        {/* Close Button with Hover Effect - Smaller size */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 z-50"
          aria-label="Close"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Content */}
        <div className="text-center relative z-10">
          {/* Logo with Elegant Glow Effect */}
          <div className="mb-6 relative -mt-4">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-200/60 to-orange-300/60 rounded-2xl blur-2xl scale-110"></div>
            <div className="relative p-4">
              <img
                src="/images/Logo_FPT_Education.png"
                alt="FPT Education"
                className="h-20 w-auto mx-auto"
              />
            </div>
          </div>

          {/* Title with Gradient Text */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold px-4 py-2 rounded-lg inline-block">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Đăng nhập vào
              </span>
              <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                {" "}FPTU Handbook
              </span>
            </h1>
          </div>

          {/* Google Login Button with Enhanced Design */}
          <button
            ref={googleButtonGlare}
            onClick={handleGoogleLogin}
            className="glare-effect w-full bg-white border-2 border-gray-200 hover:border-orange-500 hover:bg-gradient-to-r hover:from-orange-50 hover:to-white rounded-2xl py-6 px-8 flex items-center justify-center gap-4 group shadow-lg hover:shadow-2xl relative overflow-hidden"
          >
            {/* Button Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:translate-x-full transform -translate-x-full"></div>

            <svg
              className="w-8 h-8 flex-shrink-0 drop-shadow-sm"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span className="font-bold text-gray-700 group-hover:text-orange-600 text-xl relative z-10">
              Đăng nhập với Google
            </span>
          </button>

          {/* Security Message */}
          <p className="text-center text-sm text-gray-500 mt-8">
            Kết nối an toàn với tài khoản Google của bạn.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
