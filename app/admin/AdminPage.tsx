"use client";
import { addAdminClient } from "@/clientApi/user";
import { appDomain } from "@/helpers/config";
import { SessionProvider, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const AdminPage = () => {
  const { data: session } = useSession();
  const [newEmail, setNewEmail] = useState("");
  return (
    <div>
      {session?.user ? (
        <div className="p-4 flex flex-col gap-4">
          <h1 className="text-xl font-bold">Hi {session?.user?.name}</h1>
          <div>
            <label>Add Authorize Email: </label>
            <input
              className="mx-2 border border-solid border-black"
              value={newEmail}
              onChange={(e) => {
                setNewEmail(e.target.value);
              }}
            ></input>
            <button
              className="bg-green-500 text-white rounded-md px-2 w-fit"
              onClick={() => {
                addAdminClient(newEmail);
              }}
            >
              ✓
            </button>
          </div>

          <button className="bg-red-400 text-white rounded-md p-2 w-fit">
            <Link
              href={`${appDomain}/api/auth/${
                session?.user ? "signout" : "signin"
              }`}
            >
              Signout
            </Link>
          </button>
        </div>
      ) : (
        <div className="p-4">
          <button className="bg-green-500 text-white rounded-md p-2 w-fit">
            <Link
              href={`${appDomain}/api/auth/${
                session?.user ? "signout" : "signin"
              }`}
            >
              Signin
            </Link>
          </button>
        </div>
      )}
    </div>
  );
};
export default AdminPage;
