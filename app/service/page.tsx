"use client";
import ServiceTable from "@/components/ServiceTable";
import { SessionProvider } from "next-auth/react";

export default function Service() {
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-[#791212] font-extrabold text-4xl">Services</h1>
      <SessionProvider>
        <ServiceTable />
      </SessionProvider>
    </div>
  );
}
