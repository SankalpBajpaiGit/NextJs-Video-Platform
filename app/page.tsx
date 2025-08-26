import VideoFeed from "./components/VideoFeed";
import { connectToDatabase } from "@/lib/db";
import Video from "@/models/Video";
import { IVideo } from "@/models/Video";

// This function fetches video data from the server
async function getVideos() {
  try {
    await connectToDatabase();
    // Fetch all videos and sort by the newest first
    const videos = await Video.find({}).sort({ createdAt: -1 }).lean();
    // Important: Convert MongoDB ObjectId to a plain string for serialization
    return JSON.parse(JSON.stringify(videos)) as IVideo[];
  } catch (error) {
    console.error("Failed to fetch videos:", error);
    return []; // Return an empty array on error
  }
}

export default async function HomePage() {
  const videos = await getVideos();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Latest Videos</h1>
      <VideoFeed videos={videos} />
    </div>
  );
}
