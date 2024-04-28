import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChAIn Sight",
  description:
    "A Data aggregator that uses google generative AI and Iexec to predict election results and other data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <Toaster position="top-center" expand={true} richColors />
        <div className="max-w-[1500px] mx-auto">{children}</div>
      </body>
    </html>
  );
}
