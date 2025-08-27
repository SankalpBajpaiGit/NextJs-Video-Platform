"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FileUpload from "./FileUpload";
import { useNotification } from "./Notification";

// Define the type for the upload response, matching FileUpload.tsx
interface UploadResponse {
  filePath: string;
}

export default function VideoUploadForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const { showNotification } = useNotification();

  // Use the specific type here instead of 'any'
  const handleUploadSuccess = (res: UploadResponse) => {
    setVideoUrl(res.filePath);
    setIsUploading(false);
    showNotification("Video uploaded successfully!", "success");
  };

  const handleUploadProgress = (progress: number) => {
    setUploadProgress(progress);
    if (progress > 0 && progress < 100) {
      setIsUploading(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !videoUrl) {
      showNotification("Title and video file are required.", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, videoUrl }),
      });

      if (!response.ok) {
        throw new Error("Failed to save video details.");
      }

      showNotification("Video published successfully!", "success");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
      showNotification(
        "An error occurred while publishing the video.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
      <div>
        <label htmlFor="title" className="block text-sm font-medium">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered w-full mt-1"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea textarea-bordered w-full mt-1"
          rows={4}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Video File</label>
        {!videoUrl && (
          <div className="mt-1">
            <FileUpload
              onSuccess={handleUploadSuccess}
              onProgress={handleUploadProgress}
              fileType="video"
            />
          </div>
        )}
        {isUploading && (
          <progress
            className="progress progress-primary w-full mt-2"
            value={uploadProgress}
            max="100"
          ></progress>
        )}
        {videoUrl && !isUploading && (
          <p className="text-success mt-2">Upload complete: {videoUrl}</p>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={isUploading || isSubmitting || !videoUrl}
      >
        {isSubmitting ? "Publishing..." : "Publish Video"}
      </button>
    </form>
  );
}