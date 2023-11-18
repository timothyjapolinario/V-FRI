"use client";

import { getAllCloudFiles } from "@/clientApi/cloudFile";
import ServiceTable from "@/components/ServiceTable";
import { apiDomain } from "@/helpers/config";
import { useEffect } from "react";
import useSWR from "swr";
const MainContent = () => {
  const { cloudFiles } = getAllCloudFiles();
  useEffect(() => {
    console.log(cloudFiles);
  }, [cloudFiles]);
  return (
    <div className="relative h-screen">
      <h1 className="w-full bg-white text-black p-1 text-sm font-bold">
        V-FRI
      </h1>
      <div className="max-h-[55vh] h-[55vh] overflow-y-hidden relative bg-blue-500">
        <div className="absolute w-full h-full bottom-[30vh]">
          <img className="w-full h-[90vh]" src="/images/valenzuela.jpg" />
        </div>
      </div>
      <div
        className="absolute h-[80%] w-[60%] p-2"
        style={{
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          margin: "auto",
        }}
      >
        <div className="h-[30%]">
          <h1 className="text-white text-3xl backdrop-blur-md w-fit rounded-xl ">
            V-FRI: A Web-based Flood Risk Index Platform
          </h1>
        </div>
        <div className="h-[70%] bg-gray-100 shadow-2xl p-5">
          <h2 className="font-bold text-2xl mb-4">Services</h2>
          <ServiceTable />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
