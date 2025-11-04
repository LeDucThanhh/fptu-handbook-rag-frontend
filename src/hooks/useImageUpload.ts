import { useState } from "react";
import { message as antMessage } from "antd";
import {
  uploadFile,
  uploadFileWithProgress,
  validateImageFile,
  type StorageFolder,
} from "@/services/storage.service";

interface UseImageUploadOptions {
  folder: StorageFolder;
  maxSizeMB?: number;
  onSuccess?: (url: string) => void;
  onError?: (error: Error) => void;
}

interface UseImageUploadReturn {
  uploading: boolean;
  progress: number;
  imageUrl: string | null;
  error: string | null;
  uploadImage: (file: File) => Promise<string | null>;
  resetUpload: () => void;
}

/**
 * Custom hook for uploading images to Firebase Storage
 * @param options - Upload options
 * @returns Upload state and functions
 */
export const useImageUpload = (
  options: UseImageUploadOptions
): UseImageUploadReturn => {
  const { folder, maxSizeMB = 5, onSuccess, onError } = options;

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      // Reset state
      setError(null);
      setProgress(0);
      setUploading(true);

      // Validate file
      validateImageFile(file, maxSizeMB);

      // Upload with progress
      const url = await uploadFileWithProgress(
        file,
        folder,
        (progressValue) => {
          setProgress(progressValue);
        }
      );

      // Success
      setImageUrl(url);
      setUploading(false);
      antMessage.success("Upload ảnh thành công!");

      if (onSuccess) {
        onSuccess(url);
      }

      return url;
    } catch (err: any) {
      // Error
      const errorMessage = err.message || "Upload ảnh thất bại";
      setError(errorMessage);
      setUploading(false);
      setProgress(0);
      antMessage.error(errorMessage);

      if (onError) {
        onError(err);
      }

      return null;
    }
  };

  const resetUpload = () => {
    setUploading(false);
    setProgress(0);
    setImageUrl(null);
    setError(null);
  };

  return {
    uploading,
    progress,
    imageUrl,
    error,
    uploadImage,
    resetUpload,
  };
};

