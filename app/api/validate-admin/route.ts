import { authOption } from "@/app/authOption";
import { getServerSession } from "next-auth/next";

import { NextRequest, NextResponse } from "next/server";
export async function GET() {
  const session = await getServerSession(authOption);
  const adminEmails = ["vcsms.vfri2023@gmail.com"];
  if (
    session === null ||
    session === undefined ||
    session.user === undefined ||
    session.user === null ||
    !session.user.email
  ) {
    return NextResponse.json({
      error: "No user",
    });
  }

  const isAdmin = adminEmails.includes(session.user.email);
  return NextResponse.json({ isAdmin });
}
