import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simple AuthX - Secure & Lightweight Auth for Node.js",
  description: "JWT authentication, bcrypt password hashing, and refresh token support with zero hassle. Plug it into your Express app and secure your routes in minutes.",
  keywords: ["authentication", "jwt", "nodejs", "express", "bcrypt", "security"],
  authors: [{ name: "Antony Mwangi" }],
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: "Simple AuthX - Secure Authentication for Node.js",
    description: "Lightweight, secure, and easy-to-use authentication library",
    type: "website",
    images: ['/icon.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}