import { IVideo } from "@/models/Video";
import VideoComponent from "./VideoComponent";
import { imagekitConfig } from "@/lib/imagekitConfig"; // Import the config

interface VideoFeedProps {
  videos: IVideo[];
}

export default function VideoFeed({ videos }: VideoFeedProps) {
  const urlEndpoint = imagekitConfig.urlEndpoint;

  // Add a safeguard here to provide a clear error message if the config is missing
  if (!urlEndpoint) {
    return (
      <div className="col-span-full text-center py-12">
        <p className="text-error">
          Configuration Error: ImageKit URL Endpoint is not defined.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {videos.map((video) => (
        <VideoComponent
          key={video._id?.toString()}
          video={video}
          // Pass the urlEndpoint down as a prop
          urlEndpoint={urlEndpoint}
        />
      ))}

      {videos.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-base-content/70">No videos found</p>
        </div>
      )}
    </div>
  );
}