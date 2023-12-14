import { authOption } from "@/app/authOption";
import { getServerSession } from "next-auth/next";

import { NextRequest, NextResponse } from "next/server";
import { validateIfAdmin } from "../flood-risk-index/route";
export async function GET() {
  const session = await getServerSession(authOption);

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

  const isAdmin = await validateIfAdmin(session.user.email);
  console.log(isAdmin, session.user.email);
  return NextResponse.json({ isAdmin });
}
