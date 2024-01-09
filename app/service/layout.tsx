"use client";
import { Inter } from "next/font/google";

import { SessionProvider, useSession } from "next-auth/react";
import Link from "next/link";
import { appDomain } from "@/helpers/config";
import SideServiceLink from "./SideServiceLink";
import { useEffect, useState } from "react";
import { validateAdminClient } from "@/clientApi/user";
import SideMenuNavigator from "./SideNavigator";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex w-full max-h-screen overflow-hidden">
        <div className="w-[20%] h-screen bg-[#848484] overflow-hidden">
          <Link href={`${appDomain}/`}>
            <h1 className="m-4 mb-20 ">
              <span className="text-[#791212] font-extrabold text-5xl">V</span>
              <span className="text-white font-bold text-4xl">FRI</span>
            </h1>
          </Link>
          <SessionProvider>
            <SideMenuNavigator />
          </SessionProvider>
        </div>
        <div className="w-[80%] h-full p-4 flex items-center justify-center">
          <div className="w-full gap-10 border-t-8 border-solid border-[#990000] flex flex-col items-center pt-10 ">
            <div className="w-full overflow-y-scroll min-h-[70vh] max-h-[90vh]">
              <SessionProvider>{children}</SessionProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
