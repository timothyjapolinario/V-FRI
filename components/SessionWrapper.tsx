"use client";
import { SessionProvider } from "next-auth/react";
type Prop = {
  children: JSX.Element;
};
export const SessionWrapper = ({ children }: Prop) => {
  return <SessionProvider>{children}</SessionProvider>;
};
