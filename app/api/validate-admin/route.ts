import { authOption } from "@/app/authOption";
import { getServerSession } from "next-auth/next";

import { NextRequest, NextResponse } from "next/server";
import { validateIfAdmin } from "../flood-risk-index/route";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import firebaseApp from "@/firebase/firebaseApp";
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
  return NextResponse.json({ isAdmin: isAdmin });
}

export async function POST(req: any) {
  const session = await getServerSession(authOption);
  const isAdmin = await validateIfAdmin(session?.user?.email);
  if (!isAdmin) {
    return { message: "Unauthorized" };
  }

  const body = await req.json();
  const newEmail = body["newEmail"];

  try {
    const db = getFirestore(firebaseApp);
    const docRef = await addDoc(collection(db, "admins"), {
      emailAddress: newEmail,
    });

    console.log("Document written with ID: ", docRef);
  } catch (e: any) {
    return NextResponse.json({
      success: false,
      message: "Email not added: " + e.message,
    });
  }
  return NextResponse.json({
    success: true,
    message: "Email added: " + newEmail,
  });
}
