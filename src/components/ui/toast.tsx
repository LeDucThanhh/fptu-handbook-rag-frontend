import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./card";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show toast with animation
    const showTimer = setTimeout(() => setIsVisible(true), 100);
    
    // Auto hide toast
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(id), 300); // Wait for animation
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [id, duration, onClose]);

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return {
          icon: <CheckCircle className="w-5 h-5 text-green-500" />,
          bg: "bg-green-50 border-green-200",
          text: "text-green-800",
        };
      case "error":
        return {
          icon: <XCircle className="w-5 h-5 text-red-500" />,
          bg: "bg-red-50 border-red-200",
          text: "text-red-800",
        };
      case "warning":
        return {
          icon: <AlertTriangle className="w-5 h-5 text-orange-500" />,
          bg: "bg-orange-50 border-orange-200",
          text: "text-orange-800",
        };
      case "info":
        return {
          icon: <Info className="w-5 h-5 text-blue-500" />,
          bg: "bg-blue-50 border-blue-200",
          text: "text-blue-800",
        };
      default:
        return {
          icon: <Info className="w-5 h-5 text-blue-500" />,
          bg: "bg-blue-50 border-blue-200",
          text: "text-blue-800",
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div
      className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <Card className={`w-80 ${styles.bg} border shadow-lg`}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            {styles.icon}
            <div className="flex-1 min-w-0">
              <h4 className={`font-semibold ${styles.text}`}>{title}</h4>
              {message && (
                <p className={`text-sm mt-1 ${styles.text} opacity-80`}>
                  {message}
                </p>
              )}
            </div>
            <button
              onClick={() => {
                setIsVisible(false);
                setTimeout(() => onClose(id), 300);
              }}
              className={`p-1 hover:bg-black/10 rounded transition ${styles.text}`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Toast Manager Hook
export const useToast = () => {
  const [toasts, setToasts] = useState<Array<{
    id: string;
    type: ToastType;
    title: string;
    message?: string;
    duration?: number;
  }>>([]);

  const addToast = (
    type: ToastType,
    title: string,
    message?: string,
    duration?: number
  ) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, type, title, message, duration }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const success = (title: string, message?: string, duration?: number) =>
    addToast("success", title, message, duration);
  const error = (title: string, message?: string, duration?: number) =>
    addToast("error", title, message, duration);
  const warning = (title: string, message?: string, duration?: number) =>
    addToast("warning", title, message, duration);
  const info = (title: string, message?: string, duration?: number) =>
    addToast("info", title, message, duration);

  const ToastContainer = () => (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={removeToast}
        />
      ))}
    </div>
  );

  return {
    success,
    error,
    warning,
    info,
    ToastContainer,
  };
};

export default Toast;
