import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { SessionWrapper } from "@/components/SessionWrapper";

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
        <SessionWrapper>
          <Header />
        </SessionWrapper>
        {children}
      </body>
    </html>
  );
}
