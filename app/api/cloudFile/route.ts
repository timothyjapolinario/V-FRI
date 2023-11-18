import { getAllCloudFiles } from "@/services/cloudFileService";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

type ResponseData = {
  message: string;
};

export async function GET(req: NextRequest) {
  const cloudFiles = await getAllCloudFiles();
  return NextResponse.json({ cloudFiles: cloudFiles });
}
export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.formData();
  const fileToUpload = data.get("fileToUpload") as File;
  let success = false;
  if (fileToUpload) {
    const storage = getStorage();
    console.log(fileToUpload);
    const storageRef = ref(storage, fileToUpload.name);
    const arrBuffer = await fileToUpload.arrayBuffer();
    await uploadBytes(storageRef, arrBuffer).then((snapshot) => {
      console.log(snapshot);
      success = true;
    });
  }

  return NextResponse.json({ isSucccess: success });
}
