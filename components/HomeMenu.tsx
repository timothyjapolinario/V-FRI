import { validateAdminClient } from "@/clientApi/user";
import { appDomain } from "@/helpers/config";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const HomeMenu = () => {
  const { data: session } = useSession();
  const [isAdmin, setIsAdmin] = useState<boolean>();
  useEffect(() => {
    validateAdminClient().then((res: any) => {
      setIsAdmin(res["isAdmin"]);
    });
  }, [session]);
  return (
    <div className="flex gap-10 flex-col">
      <h1>
        <span className="text-[#791212] font-extrabold text-5xl">V</span>
        <span className="text-gray-600 font-bold text-4xl">FRI</span>
      </h1>
      <div>
        <p className="text-[#791212] font-extrabold text-7xl">VALUENZA</p>
        <p className="text-gray-600 font-bold text-5xl">FLOOD RISK</p>
        <p className="text-gray-600 font-bold text-5xl">INDEX</p>
      </div>
      <div className="flex gap-2">
        <Link
          href={`${appDomain}/api/auth/${session?.user ? "signout" : "signin"}`}
        >
          <button
            className="bg-[#791212] px-5 py-2 rounded-lg text-white text-2xl"
            style={{
              display: session?.user ? "none" : "",
            }}
          >
            Login
          </button>
        </Link>
        <Link href={`${appDomain}/service`}>
          <button
            className="bg-[#791212] px-5 py-2 rounded-lg text-white text-2xl"
            style={{
              display: session?.user ? "" : "none",
            }}
          >
            Services
          </button>
        </Link>
        <button className="bg-gray-600 px-5 py-2 rounded-lg text-white text-2xl">
          <Link href={`${appDomain}/service/flood-risk-index`}>
            Flood Risk Index
          </Link>
        </button>
      </div>
    </div>
  );
};
export default HomeMenu;
