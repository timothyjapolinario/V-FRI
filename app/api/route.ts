import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";
import { getToken } from "next-auth/jwt";
type ResponseData = {
  message: string;
};

export async function GET(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET,
  });
  let signedToken = "no token";

  if (token !== null && process.env.JWT_SECRET) {
    signedToken = jwt.sign(token, process.env.JWT_SECRET, {
      algorithm: "HS256",
    });

    console.log(signedToken);
  }

  return NextResponse.json(
    { message: "Hello V-FRI", signedToken },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    }
  );
}
