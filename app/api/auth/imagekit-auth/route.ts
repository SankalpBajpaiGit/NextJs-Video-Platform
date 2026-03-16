import { NextResponse } from "next/server";
import { getUploadAuthParams } from "@imagekit/next/server";

export async function GET() {
  try {
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

    if (!privateKey || !publicKey) {
      console.error(
        "ImageKit private or public key is not set in environment variables."
      );
      throw new Error("Server configuration error for image uploads.");
    }

    const authenticationParameters = getUploadAuthParams({
      privateKey,
      publicKey,
    });

    return NextResponse.json(authenticationParameters);
  } catch (error) {
    console.error("Authentication for Imagekit failed", error);
    return NextResponse.json(
      {
        error: "Failed to authenticate with image service.",
      },
      { status: 500 }
    );
  }
}
