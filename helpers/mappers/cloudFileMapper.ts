import { CloudFile } from "@/custom_types/CloudFile";

export const mapCloudFileFromFirebase = (rawData: any) => {
  const cloudFile: CloudFile = {
    fileName: rawData["fileName"],
    downloadUrl: rawData["downloadUrl"],
    iconUrl: rawData["iconUrl"],
    contentType: rawData["contentType"],
  };
  return cloudFile;
};
