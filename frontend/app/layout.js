import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
  import { ToastContainer, toast } from 'react-toastify';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Notes Keeper - Organize Your Thoughts",
  description: "A simple and efficient notes application to create, edit, and manage your personal notes",
  keywords: ["notes app", "note taking", "personal notes", "digital notebook"],
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "Notes Keeper - Organize Your Thoughts",
    description: "Create, edit, and manage your personal notes with ease",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Notes Keeper - Organize Your Thoughts",
    description: "Create, edit, and manage your personal notes with ease",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-orange-50`}>
        {children}
        <ToastContainer/>
      </body>
    </html>
  );
}
