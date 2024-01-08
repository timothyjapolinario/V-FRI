"use client";
import Link from "next/link";
import ServiceLink from "./ServiceLink";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { appDomain } from "@/helpers/config";
import { validateAdminClient } from "@/clientApi/user";

const ServiceTable = () => {
  const { data: session } = useSession();
  const [isAdmin, setIsAdmin] = useState<boolean>();
  useEffect(() => {
    validateAdminClient().then((res: any) => {
      setIsAdmin(res["isAdmin"]);
    });
  }, [session]);
  return (
    <div className="flex flex-wrap gap-4 w-full sm:grid sm:grid-cols-2 lg:grid-cols-3">
      <div
        className="w-[100%] max-w-[300px]"
        style={{
          display: isAdmin ? "" : "none",
        }}
      >
        <Link href={"/service/files"}>
          <div className="w-[100%] max-w-[300px] h-[150px]">
            <ServiceLink
              urlIcon="/icons/document-icon.png"
              shortDescription="Manage your files here."
            />
          </div>
        </Link>
      </div>

      <div className="w-[100%] max-w-[300px]">
        <Link href={"/flood-risk-index"}>
          <div className="w-[100%] max-w-[300px] h-[150px]">
            <ServiceLink
              urlIcon="/icons/flood-icon.png"
              shortDescription="See Flood Risk Index values here."
            />
          </div>
        </Link>
      </div>
      <div
        className="w-[100%] max-w-[300px]"
        style={{
          display: isAdmin ? "" : "none",
        }}
      >
        <Link href={"/flood-risk-index-calculator"}>
          <div className="w-[100%] max-w-[300px] h-[150px]">
            <ServiceLink
              urlIcon="/icons/calculator-icon.png"
              shortDescription="Calculate flood risk index here."
            />
          </div>
        </Link>
      </div>
    </div>
  );
};
export default ServiceTable;
