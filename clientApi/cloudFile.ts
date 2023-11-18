import { CloudFile } from "@/custom_types/CloudFile";
import { apiDomain, appDomain } from "@/helpers/config";
import { mapCloudFileFromFirebase } from "@/helpers/mappers/cloudFileMapper";
import { useEffect, useState } from "react";
import useSWR from "swr";
export const getAllCloudFiles = () => {
  const [cloudFiles, setCloudFiles] = useState<CloudFile[]>([]);
  const fetcher = async (url: string) => {
    console.log(url, "wtf");
    return fetch(url).then((res) => res.json());
  };

  const { data, error, isLoading } = useSWR(
    `${appDomain}/api/cloudFile`,
    fetcher
  );

  useEffect(() => {
    if (data && data["cloudFiles"]) {
      const newCloudFiles = data["cloudFiles"].map((cloudFileRaw: any) => {
        return mapCloudFileFromFirebase(cloudFileRaw);
      }) as CloudFile[];
      setCloudFiles(newCloudFiles);
    }
  }, [data]);
  return { cloudFiles };
};
