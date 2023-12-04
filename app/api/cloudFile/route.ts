import { getAllCloudFiles } from "@/services/cloudFileService";
import { deleteObject, getStorage, ref, uploadBytes } from "firebase/storage";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { validateIfAdmin } from "../flood-risk-index/route";
import { authOption } from "@/app/authOption";

type ResponseData = {
  message: string;
};

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOption);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "true", message: "forbid" });
  }
  console.log("EMAIL", session.user.email);
  const isAdmin = await validateIfAdmin(session.user.email);
  console.log("IS ADMIN", isAdmin);
  if (!isAdmin) {
    return NextResponse.json({ error: "true", message: "forbid" });
  }

  const cloudFiles = await getAllCloudFiles();
  return NextResponse.json(
    { cloudFiles: cloudFiles },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    }
  );
}
export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOption);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "true", message: "forbid" });
  }

  const isAdmin = await validateIfAdmin(session.user.email);
  console.log("IS ADMIN", isAdmin);
  if (!isAdmin) {
    return NextResponse.json({ error: "true", message: "forbid" });
  }

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

  return NextResponse.json(
    { isSucccess: success },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    }
  );
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOption);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "true", message: "forbid" });
  }
  const isAdmin = await validateIfAdmin(session.user.email);
  console.log("IS ADMIN", isAdmin);
  if (!isAdmin) {
    return NextResponse.json({ error: "true", message: "forbid" });
  }

  const body = await req.json();

  const storage = getStorage();

  const fileRef = ref(storage, body["fileName"]);

  deleteObject(fileRef)
    .then(() => {
      console.log("Success delete");
    })
    .catch((err) => {
      console.log(err);
    });
  return NextResponse.json({ message: "DELETE: " + body["fileName"] });
}
