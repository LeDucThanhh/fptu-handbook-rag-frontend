import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  uploadBytesResumable,
  type UploadTaskSnapshot,
} from "firebase/storage";
import { storage } from "@/config/firebase.config";

/**
 * Folder types for organizing files in Firebase Storage
 */
export type StorageFolder =
  | "avatars" // User profile pictures
  | "clubs" // Club logos and banners
  | "documents" // PDF, Word files, etc.
  | "posts" // Images in posts/articles
  | "handbook"; // Handbook images

/**
 * Upload a file to Firebase Storage
 * @param file - File to upload
 * @param folder - Folder to store the file
 * @param customFileName - Optional custom file name (without extension)
 * @returns Download URL of the uploaded file
 */
export const uploadFile = async (
  file: File,
  folder: StorageFolder,
  customFileName?: string
): Promise<string> => {
  try {
    // Validate file
    if (!file) {
      throw new Error("No file provided");
    }

    // Generate file name
    const timestamp = Date.now();
    const fileExtension = file.name.split(".").pop();
    const fileName = customFileName
      ? `${customFileName}.${fileExtension}`
      : `${timestamp}_${file.name}`;

    // Create storage reference
    const storageRef = ref(storage, `${folder}/${fileName}`);

    // Upload file
    const snapshot = await uploadBytes(storageRef, file);

    // Get download URL
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

/**
 * Upload file with progress tracking
 * @param file - File to upload
 * @param folder - Folder to store the file
 * @param onProgress - Callback for upload progress (0-100)
 * @param customFileName - Optional custom file name
 * @returns Download URL of the uploaded file
 */
export const uploadFileWithProgress = (
  file: File,
  folder: StorageFolder,
  onProgress?: (progress: number) => void,
  customFileName?: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      // Validate file
      if (!file) {
        reject(new Error("No file provided"));
        return;
      }

      // Generate file name
      const timestamp = Date.now();
      const fileExtension = file.name.split(".").pop();
      const fileName = customFileName
        ? `${customFileName}.${fileExtension}`
        : `${timestamp}_${file.name}`;

      // Create storage reference
      const storageRef = ref(storage, `${folder}/${fileName}`);

      // Upload with progress tracking
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot: UploadTaskSnapshot) => {
          // Calculate progress percentage
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) {
            onProgress(Math.round(progress));
          }
        },
        (error) => {
          console.error("Error uploading file:", error);
          reject(error);
        },
        async () => {
          // Upload completed successfully
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (error) {
            reject(error);
          }
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Delete a file from Firebase Storage
 * @param fileUrl - Full download URL of the file
 */
export const deleteFile = async (fileUrl: string): Promise<void> => {
  try {
    // Extract file path from URL
    const url = new URL(fileUrl);
    const pathMatch = url.pathname.match(/\/o\/(.+)\?/);

    if (!pathMatch) {
      throw new Error("Invalid file URL");
    }

    const filePath = decodeURIComponent(pathMatch[1]);
    const fileRef = ref(storage, filePath);

    // Delete file
    await deleteObject(fileRef);
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
};

/**
 * Validate image file
 * @param file - File to validate
 * @param maxSizeMB - Maximum file size in MB (default: 5MB)
 * @returns true if valid, throws error if invalid
 */
export const validateImageFile = (
  file: File,
  maxSizeMB: number = 5
): boolean => {
  // Check file type
  const validTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
  ];
  if (!validTypes.includes(file.type)) {
    throw new Error("Chỉ chấp nhận file ảnh (JPG, PNG, GIF, WebP)");
  }

  // Check file size
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    throw new Error(`Kích thước file không được vượt quá ${maxSizeMB}MB`);
  }

  return true;
};

/**
 * Validate document file
 * @param file - File to validate
 * @param maxSizeMB - Maximum file size in MB (default: 10MB)
 * @returns true if valid, throws error if invalid
 */
export const validateDocumentFile = (
  file: File,
  maxSizeMB: number = 10
): boolean => {
  // Check file type
  const validTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];
  if (!validTypes.includes(file.type)) {
    throw new Error("Chỉ chấp nhận file PDF, Word, Excel");
  }

  // Check file size
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    throw new Error(`Kích thước file không được vượt quá ${maxSizeMB}MB`);
  }

  return true;
};

/**
 * Get file name from URL
 * @param fileUrl - Full download URL
 * @returns File name
 */
export const getFileNameFromUrl = (fileUrl: string): string => {
  try {
    const url = new URL(fileUrl);
    const pathMatch = url.pathname.match(/\/o\/(.+)\?/);
    if (!pathMatch) return "";

    const filePath = decodeURIComponent(pathMatch[1]);
    return filePath.split("/").pop() || "";
  } catch (error) {
    console.error("Error getting file name:", error);
    return "";
  }
};
