import { getAllCloudFiles } from "@/services/cloudFileService";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

type ResponseData = {
  message: string;
};

export async function GET(req: NextApiRequest) {
  const cloudFiles = await getAllCloudFiles();
  return NextResponse.json({ cloudFiles: cloudFiles });
}
