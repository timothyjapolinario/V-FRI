"use client";
import { appDomain } from "@/helpers/config";
import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { SessionWrapper } from "./SessionWrapper";

const Header = () => {
  const { data: session } = useSession();
  //`${appDomain}/api/auth/${session?.user ? "signout" : "signin"}`
  return (
    <div className="w-full bg-white flex justify-between">
      <Link href={"/"}>
        <h1 className="text-black p-1 text-sm font-bold  w-fit">V-FRI</h1>
      </Link>
      <Link href={"/admin"}>
        <h1 className="text-black p-1 text-sm font-bold w-fit">
          <img src="/icons/profile-icon.png" className="h-[20px]" />
        </h1>
      </Link>
    </div>
  );
};

export default Header;
