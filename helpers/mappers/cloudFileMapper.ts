import { CloudFile } from "@/custom_types/CloudFile";

export const mapCloudFileFromFirebase = (rawData: any) => {
  const cloudFile: CloudFile = {
    fileName: rawData["fileName"],
    downloadUrl: rawData["downloadUrl"],
  };
  return cloudFile;
};
