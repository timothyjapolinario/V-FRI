import { authOption } from "@/app/authOption";
import NextAuth from "next-auth/next";

export const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
