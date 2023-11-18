import { getAllCloudFiles } from "@/services/cloudFileService";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

type ResponseData = {
  message: string;
};

export async function GET(req: NextRequest) {
  const cloudFiles = await getAllCloudFiles();
  return NextResponse.json({ cloudFiles: cloudFiles });
}
