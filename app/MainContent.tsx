"use client";
import { getAllCloudFiles } from "@/api/CloudFileApi";
import { apiDomain } from "@/helpers/config";
import { useEffect } from "react";
import useSWR from "swr";
const MainContent = () => {
  const { cloudFiles } = getAllCloudFiles();
  useEffect(() => {
    console.log(cloudFiles);
  }, [cloudFiles]);
  return (
    <div>
      <h1 className="w-full bg-white text-black p-5 text-2xl">
        Valenzuela Flood Risk Index
      </h1>
      <h2>Files galing cloud storage</h2>
      <ul>
        {cloudFiles.map((res: any, index) => {
          return (
            <div>
              {index + 1}. {res.fileName}
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default MainContent;
