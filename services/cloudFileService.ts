import {
  getStorage,
  ref,
  listAll,
  list,
  getDownloadURL,
  getMetadata,
} from "firebase/storage";
import firebaseApp from "../firebase/firebaseApp";
import { CloudFile, extensionMapper } from "@/custom_types/CloudFile";
export const getAllCloudFiles = async () => {
  const storage = getStorage(firebaseApp);
  const storageRef = ref(storage);
  const files = await listAll(storageRef);
  const arr: CloudFile[] = [];
  console.log("hoyy");
  for (const cfRef of files.items) {
    //console.log("RAW: ", cfRef);
    const downloadUrl = await getDownloadURL(ref(storage, `${cfRef.name}`));
    const extension = getExtension(cfRef.name);

    const cloudFile: CloudFile = {
      fileName: cfRef.name,
      downloadUrl: downloadUrl,
      iconUrl: "",
      contentType: getContentType(extension),
    };
    arr.push(cloudFile);
  }
  return arr;
};

const getExtension = (fileName: string) => {
  return fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2);
};
export const getContentType = (extension: string) => {
  return extensionMapper[extension]
    ? extensionMapper[extension]
    : extensionMapper["unknown"];
};
