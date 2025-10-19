import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Button } from "./button";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: "danger" | "warning" | "info";
  isLoading?: boolean;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Xác nhận",
  cancelText = "Hủy",
  type = "danger",
  isLoading = false,
}) => {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case "danger":
        return {
          icon: <AlertTriangle className="w-8 h-8 text-red-500" />,
          confirmButton: "bg-red-500 hover:bg-red-600 text-white",
          border: "border-red-200",
        };
      case "warning":
        return {
          icon: <AlertTriangle className="w-8 h-8 text-orange-500" />,
          confirmButton: "bg-orange-500 hover:bg-orange-600 text-white",
          border: "border-orange-200",
        };
      case "info":
        return {
          icon: <AlertTriangle className="w-8 h-8 text-blue-500" />,
          confirmButton: "bg-blue-500 hover:bg-blue-600 text-white",
          border: "border-blue-200",
        };
      default:
        return {
          icon: <AlertTriangle className="w-8 h-8 text-red-500" />,
          confirmButton: "bg-red-500 hover:bg-red-600 text-white",
          border: "border-red-200",
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className={`w-full max-w-md ${styles.border}`}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900">
              {title}
            </CardTitle>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-lg transition"
              disabled={isLoading}
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            {styles.icon}
            <p className="text-gray-700 leading-relaxed">{message}</p>
          </div>
          
          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2"
            >
              {cancelText}
            </Button>
            <Button
              onClick={onConfirm}
              disabled={isLoading}
              className={`px-4 py-2 ${styles.confirmButton}`}
            >
              {isLoading ? "Đang xử lý..." : confirmText}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfirmationDialog;
