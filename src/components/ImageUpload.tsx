import React, { useState } from "react";
import { Upload, Button, Progress, Avatar, message } from "antd";
import { UploadOutlined, UserOutlined, DeleteOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd";
import { useImageUpload } from "@/hooks/useImageUpload";
import type { StorageFolder } from "@/services/storage.service";

interface ImageUploadProps {
  folder: StorageFolder;
  currentImageUrl?: string;
  onUploadSuccess?: (url: string) => void;
  maxSizeMB?: number;
  shape?: "circle" | "square";
  size?: number;
  showPreview?: boolean;
}

/**
 * Image Upload Component with Firebase Storage
 * Supports avatar upload, club logo upload, etc.
 */
export const ImageUpload: React.FC<ImageUploadProps> = ({
  folder,
  currentImageUrl,
  onUploadSuccess,
  maxSizeMB = 5,
  shape = "circle",
  size = 100,
  showPreview = true,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(currentImageUrl);

  const { uploading, progress, uploadImage } = useImageUpload({
    folder,
    maxSizeMB,
    onSuccess: (url) => {
      setPreviewUrl(url);
      if (onUploadSuccess) {
        onUploadSuccess(url);
      }
    },
  });

  const handleBeforeUpload = (file: File) => {
    // Validate file type
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Chỉ chấp nhận file ảnh!");
      return false;
    }

    // Validate file size
    const isLt5M = file.size / 1024 / 1024 < maxSizeMB;
    if (!isLt5M) {
      message.error(`Kích thước ảnh phải nhỏ hơn ${maxSizeMB}MB!`);
      return false;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to Firebase
    uploadImage(file);

    // Prevent default upload behavior
    return false;
  };

  const handleRemove = () => {
    setPreviewUrl(undefined);
    setFileList([]);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Preview */}
      {showPreview && (
        <div className="relative">
          <Avatar
            src={previewUrl}
            icon={!previewUrl && <UserOutlined />}
            size={size}
            shape={shape}
            style={{
              backgroundColor: !previewUrl ? "#f97316" : undefined,
            }}
          />
          {previewUrl && !uploading && (
            <Button
              type="text"
              danger
              size="small"
              icon={<DeleteOutlined />}
              onClick={handleRemove}
              className="absolute -top-2 -right-2 bg-white shadow-md rounded-full"
            />
          )}
        </div>
      )}

      {/* Upload Button */}
      <Upload
        fileList={fileList}
        beforeUpload={handleBeforeUpload}
        showUploadList={false}
        accept="image/*"
        disabled={uploading}
      >
        <Button
          icon={<UploadOutlined />}
          loading={uploading}
          style={{
            background: uploading ? undefined : "linear-gradient(135deg, #f97316, #ea580c)",
            color: uploading ? undefined : "white",
            border: "none",
          }}
        >
          {uploading ? "Đang tải lên..." : "Chọn ảnh"}
        </Button>
      </Upload>

      {/* Progress Bar */}
      {uploading && (
        <div className="w-full max-w-xs">
          <Progress percent={progress} status="active" strokeColor="#f97316" />
        </div>
      )}

      {/* Helper Text */}
      <p className="text-xs text-gray-500 text-center">
        Chấp nhận: JPG, PNG, GIF, WebP
        <br />
        Kích thước tối đa: {maxSizeMB}MB
      </p>
    </div>
  );
};

export default ImageUpload;

