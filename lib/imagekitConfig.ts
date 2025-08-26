// src/lib/imagekitConfig.ts
export const imagekitConfig = {
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
  authenticationEndpoint: "/api/auth/imagekit-auth",
};