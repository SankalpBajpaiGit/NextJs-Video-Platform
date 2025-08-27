"use client";

import { upload } from "@imagekit/next";
import { useState } from "react";
// Import the specific type from the library for accuracy
import type { UploadResponse } from "imagekit-javascript/dist/src/interfaces";

// Define a more specific type for what your app needs from the response
interface AppUploadResponse extends UploadResponse {
  filePath: string;
}

interface FileUploadProps {
  onSuccess: (res: AppUploadResponse) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
}

const FileUpload = ({ onSuccess, onProgress, fileType }: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File) => {
    if (fileType === "video" && !file.type.startsWith("video/")) {
      setError("Please upload a valid video file");
      return false;
    }
    if (file.size > 100 * 1024 * 1024) {
      setError("File size must be less than 100 MB");
      return false;
    }
    return true;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file || !validateFile(file)) return;

    setUploading(true);
    setError(null);

    try {
      const authRes = await fetch("/api/auth/imagekit-auth");
      const auth = await authRes.json();

      const res = await upload({
        file,
        fileName: file.name,
        publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
        signature: auth.signature,
        expire: auth.expire,
        token: auth.token,
        onProgress: (event) => {
          if (event.lengthComputable && onProgress) {
            const percent = (event.loaded / event.total) * 100;
            onProgress(Math.round(percent));
          }
        },
      });
      onSuccess(res as AppUploadResponse);
    } catch (err) {
      console.error("Upload failed", err);
      setError("The file upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept={fileType === "video" ? "video/*" : "image/*"}
        onChange={handleFileChange}
        disabled={uploading}
        className="file-input file-input-bordered w-full max-w-xs"
      />
      {uploading && <span className="ml-4">Uploading....</span>}
      {/* Display the error to fix the 'unused variable' warning */}
      {error && <p className="text-error mt-2">{error}</p>}
    </div>
  );
};

export default FileUpload;