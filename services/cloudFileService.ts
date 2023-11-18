import {
  getStorage,
  ref,
  listAll,
  list,
  getDownloadURL,
} from "firebase/storage";
import firebaseApp from "../firebase/firebaseApp";
import { CloudFile } from "@/custom_types/CloudFile";
export const getAllCloudFiles = async () => {
  const storage = getStorage(firebaseApp);
  console.log(storage);
  const storageRef = ref(storage);
  const files = await listAll(storageRef);
  const arr: CloudFile[] = [];
  for (const cfRef of files.items) {
    const downloadUrl = await getDownloadURL(ref(storage, `${cfRef.name}`));
    const cloudFile: CloudFile = {
      fileName: cfRef.name,
      downloadUrl: downloadUrl,
    };
    arr.push(cloudFile);
  }
  return arr;
};
