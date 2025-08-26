"use client";
import { ImageKitProvider } from "@imagekit/next";
import { SessionProvider } from "next-auth/react";
import { imagekitConfig } from "@/lib/imagekitConfig"; // Import the config

export default function Providers({ children }: { children: React.ReactNode }) {
  // **THE FIX**: This safeguard prevents the app from rendering until the environment
  // variable is loaded. This stops the "Missing urlEndpoint" crash.
  if (!imagekitConfig.urlEndpoint) {
    // You can return a loading spinner here, but returning null is sufficient
    // to prevent the crash.
    return null;
  }

  return (
    <SessionProvider refetchInterval={5 * 60}>
      <ImageKitProvider urlEndpoint={imagekitConfig.urlEndpoint}>
        {children}
      </ImageKitProvider>
    </SessionProvider>
  );
}
