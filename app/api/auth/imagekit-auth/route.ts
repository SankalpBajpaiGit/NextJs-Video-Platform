import { NextResponse } from "next/server";
import { getUploadAuthParams } from "@imagekit/next/server";

export async function GET() {
  try {
    // These environment variables MUST be set in your .env.local file
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

    if (!privateKey || !publicKey) {
      console.error("ImageKit private or public key is not set in environment variables.");
      throw new Error("Server configuration error for image uploads.");
    }

    // **THE FIX**: Corrected the typo in the function name.
    const authenticationParameters = getUploadAuthParams({
      privateKey: privateKey,
      publicKey: publicKey,
    });

    // Return the flat object { token, expire, signature } directly.
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
