import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./components/Providers";
import Header from "./components/Header";
import { NotificationProvider } from "./components/Notification";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Video with AI",
  description: "A video sharing platform with AI features.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body className={inter.className}>
        <Providers>
          <NotificationProvider>
            <Header />
            <main className="container mx-auto p-4">{children}</main>
          </NotificationProvider>
        </Providers>
      </body>
    </html>
  );
}