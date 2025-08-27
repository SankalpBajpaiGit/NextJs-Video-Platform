import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Video from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache"; // <--- 1. IMPORT THIS

// This function handles GET requests to fetch all videos
export async function GET() {
  try {
    await connectToDatabase();
    const videos = await Video.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(videos);
  } catch (error) {
    console.error("Failed to fetch videos:", error);
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}

// This function handles POST requests to create a new video
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const body = await request.json();

    // Basic validation
    if (!body.title || !body.videoUrl) {
      return NextResponse.json(
        { error: "Missing required fields: title and videoUrl" },
        { status: 400 }
      );
    }

    const thumbnailUrl = `${body.videoUrl}/tr:n-thumbnail`;

    // Create the new video with all required fields
    const newVideo = await Video.create({
      title: body.title,
      description: body.description || "",
      videoUrl: body.videoUrl,
      thumbnailUrl: thumbnailUrl,
    });
    
    revalidatePath('/'); // <--- 2. ADD THIS LINE AFTER CREATING THE VIDEO

    return NextResponse.json(newVideo, { status: 201 });
  } catch (error) {
    console.error("Failed to create video:", error);
    return NextResponse.json(
      { error: "Failed to create video" },
      { status: 500 }
    );
  }
}