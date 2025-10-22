import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Hoosier Weekend Helper - Central Indiana Weekend Planner",
  description: "Find weekend events, check porch weather, and plan your perfect weekend in Carmel, Fishers, Noblesville, Zionsville, Westfield, and Indianapolis. Your Central Indiana weekend companion.",
  keywords: "Central Indiana events, Carmel events, Fishers events, Noblesville weekend, Zionsville activities, Indianapolis things to do, Indiana weather, weekend planner",
  openGraph: {
    title: "Hoosier Weekend Helper",
    description: "Your Central Indiana Weekend Companion",
    url: "https://weekend.introindianapolis.com",
    siteName: "Hoosier Weekend Helper",
    images: [
      {
        url: "/og-image.jpg", // You'll need to create this
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hoosier Weekend Helper",
    description: "Your Central Indiana Weekend Companion",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
