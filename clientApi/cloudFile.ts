import { CloudFile } from "@/custom_types/CloudFile";
import { apiDomain, appDomain } from "@/helpers/config";
import { mapCloudFileFromFirebase } from "@/helpers/mappers/cloudFileMapper";
import { useEffect, useState } from "react";
import { json } from "stream/consumers";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
export const getAllCloudFiles = () => {
  const [cloudFiles, setCloudFiles] = useState<CloudFile[]>([]);
  const fetcher = async (url: string) => {
    return fetch(url).then(async (res) => {
      try {
        const data = await res.json();

        if (data && data["cloudFiles"]) {
          const newCloudFiles = data["cloudFiles"].map((cloudFileRaw: any) => {
            return mapCloudFileFromFirebase(cloudFileRaw);
          }) as CloudFile[];
          setCloudFiles(newCloudFiles);
        }
      } catch (error) {
        console.log(error);
        return { error: error };
      }
    });
  };

  const { data, error, isLoading } = useSWR(
    `${appDomain}/api/cloudFile`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    }
  );
  const { trigger, isMutating } = useSWRMutation(
    `${appDomain}/api/cloudFile`,
    fetcher
  );

  const isRefreshing = () => isMutating;
  return { cloudFiles, isMutating, isLoading, trigger };
};

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("fileToUpload", file);
  const response = await fetch(`${appDomain}/api/cloudFile`, {
    method: "POST",
    body: formData,
  }).then((res) => {
    console.log("tapos na");
    return res.json();
  });
};

export const deleteFile = async (fileName: string) => {
  const response = await fetch(`${appDomain}/api/cloudFile`, {
    method: "DELETE",
    body: JSON.stringify({ fileName: fileName }),
  }).then((res) => {
    console.log("tapos na delete");
    return res.json();
  });
  console.log(response);
  return response;
};
