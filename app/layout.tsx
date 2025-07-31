import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StoryNavigation } from "@/components/story-navigation";
import { StoryFooter } from "@/components/story-footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "故事驅動商店 | 每個商品都有故事",
  description: "歡迎來到故事驅動商店，這裡每個商品都有獨特的背景故事等您發現。開始您的故事購物之旅！",
  keywords: "故事商店, 創意購物, 商品故事, 沉浸式購物體驗",
  openGraph: {
    title: "故事驅動商店",
    description: "每個商品都有故事，每次購物都是冒險",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoryNavigation />
        <main>
          {children}
        </main>
        <StoryFooter />
      </body>
    </html>
  );
}
