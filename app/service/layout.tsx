"use client";
import { Inter } from "next/font/google";

import { SessionProvider } from "next-auth/react";
import Link from "next/link";
import { appDomain } from "@/helpers/config";
import SideServiceLink from "./SideServiceLink";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeLinkIndex, setActiveLinkIndex] = useState(1);
  return (
    <div>
      <div className="flex w-full max-h-screen overflow-hidden">
        <div className="w-[20%] h-screen bg-[#848484] overflow-hidden">
          <Link href={`${appDomain}/`}>
            <h1 className="m-4 mb-20">
              <span className="text-[#791212] font-extrabold text-5xl">V</span>
              <span className="text-white font-bold text-4xl">FRI</span>
            </h1>
          </Link>

          <div className="flex flex-col gap-4">
            <div
              onClick={() => {
                setActiveLinkIndex(1);
              }}
            >
              <SideServiceLink
                url={`${appDomain}/service`}
                iconLink="/icons/home-flood.png"
                linkName="Home"
                isActive={activeLinkIndex === 1}
              />
            </div>
            <div
              onClick={() => {
                setActiveLinkIndex(2);
              }}
            >
              <SideServiceLink
                url={`${appDomain}/service/files`}
                iconLink="/icons/document-icon.png"
                linkName="File Manager"
                isActive={activeLinkIndex === 2}
              />
            </div>
            <div
              onClick={() => {
                setActiveLinkIndex(3);
              }}
            >
              <SideServiceLink
                url={`${appDomain}/service/flood-risk-index`}
                iconLink="/icons/flood-icon.png"
                linkName="Flood Risk Index"
                isActive={activeLinkIndex === 3}
              />
            </div>
            <div
              onClick={() => {
                setActiveLinkIndex(4);
              }}
            >
              <SideServiceLink
                url={`${appDomain}/service/flood-risk-index-calculator`}
                iconLink="/icons/calculator-icon.png"
                linkName="Flood Risk Index Calculator"
                isActive={activeLinkIndex === 4}
              />
            </div>
          </div>
        </div>
        <div className="w-[80%] h-full p-4 flex items-center justify-center">
          <div className="w-full gap-10 border-t-8 border-solid border-[#990000] flex flex-col items-center pt-10 ">
            <div>
              <SessionProvider>{children}</SessionProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
