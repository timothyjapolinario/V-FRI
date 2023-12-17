"use client";
import { SessionProvider, useSession } from "next-auth/react";
import AdminPage from "./AdminPage";

const Admin = () => {
  return (
    <SessionProvider>
      <AdminPage />
    </SessionProvider>
  );
};
export default Admin;
