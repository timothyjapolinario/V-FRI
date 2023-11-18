import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "V-FRI",
  description: "Thesis app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-200">
        <h1 className="w-full bg-white text-black p-1 text-sm font-bold">
          V-FRI
        </h1>
        {children}
      </body>
    </html>
  );
}
