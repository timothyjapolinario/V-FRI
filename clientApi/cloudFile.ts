import { CloudFile } from "@/custom_types/CloudFile";
import { apiDomain, appDomain } from "@/helpers/config";
import { mapCloudFileFromFirebase } from "@/helpers/mappers/cloudFileMapper";
import { useEffect, useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
export const getAllCloudFiles = () => {
  const [cloudFiles, setCloudFiles] = useState<CloudFile[]>([]);
  const fetcher = async (url: string) => {
    return fetch(url).then((res) => res.json());
  };

  const { data, error, isLoading } = useSWR(
    `${appDomain}/api/cloudFile`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnMount: false,
    }
  );
  const { trigger, isMutating } = useSWRMutation(
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
  const refreshCloudFiles = (callback?: () => void) => {
    trigger().then(() => {
      if (callback) {
        callback();
      }
    });
  };
  const isRefreshing = () => isMutating;
  return { cloudFiles, refreshCloudFiles, isMutating };
};

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("fileToUpload", file);
  const response = await fetch(`${appDomain}/api/cloudFile`, {
    method: "POST",
    body: formData,
  }).then((res) => {
    return res.json();
  });
  console.log(response);
};
