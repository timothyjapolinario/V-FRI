import { apiDomain } from "@/helpers/config";
import { useEffect, useState } from "react";
import useSWR from "swr";
export const getAllCloudFiles = () => {
  const [cloudFiles, setCloudFiles] = useState<any[]>([]);
  const fetcher = async (url: string) => {
    return fetch(url).then((res) => res.json());
  };
  const { data, error, isLoading } = useSWR(`${apiDomain}/cloudFile`, fetcher);

  useEffect(() => {
    if (data && data["cf"]) {
      const dummyCf = data["cf"] as any[];
      setCloudFiles(dummyCf);
    }
  }, [data]);
  return { cloudFiles };
};
