import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "你的朋友圈隐藏人设测试",
  description: "12道题，测出你在朋友圈里最像哪种隐藏人设。你以为你只是随便发发，别人可能早就给你立好了人设。",
  keywords: ["朋友圈", "人设", "测试", "心理测试", "性格测试", "MBTI", "微信"],
  authors: [{ name: "mybookstores" }],
  openGraph: {
    type: "website",
    url: "https://mybookstores.github.io/quiz-site",
    title: "你的朋友圈隐藏人设测试",
    description: "12道题，测出你在朋友圈里最像哪种隐藏人设",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "朋友圈隐藏人设测试",
      },
    ],
    siteName: "朋友圈人设测试",
  },
  twitter: {
    card: "summary_large_image",
    title: "你的朋友圈隐藏人设测试",
    description: "12道题，测出你在朋友圈里最像哪种隐藏人设",
    images: ["/og-image.svg"],
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  themeColor: "#E11D48",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "人设测试",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        {/* PWA */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192.svg" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
        {/* Favicon */}
        <link rel="icon" href="/icon-192.svg" type="image/svg+xml" />
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}