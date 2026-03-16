import { connectToDatabase } from "@/lib/db";
import Video, { IVideo } from "@/models/Video";
import { imagekitConfig } from "@/lib/imagekitConfig";
import { notFound } from "next/navigation";

interface VideoPageProps {
  params: Promise<{ id: string }>;
}

async function getVideo(id: string) {
  await connectToDatabase();
  const video = await Video.findById(id).lean();

  if (!video) {
    return null;
  }

  return JSON.parse(JSON.stringify(video)) as IVideo & { _id: string };
}

export default async function VideoPage({ params }: VideoPageProps) {
  const { id } = await params;
  const video = await getVideo(id);

  if (!video) {
    notFound();
  }

  const videoSrc = `${imagekitConfig.urlEndpoint}/${video.videoUrl}`;

  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <div className="overflow-hidden rounded-2xl bg-black shadow-lg">
        <video
          src={videoSrc}
          controls={video.controls ?? true}
          className="aspect-[9/16] w-full object-contain"
        />
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{video.title}</h1>
        <p className="text-base-content/70">
          {video.description || "No description provided."}
        </p>
      </div>
    </section>
  );
}
