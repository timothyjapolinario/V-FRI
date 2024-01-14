import { validateAdminClient } from "@/clientApi/user";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import SideServiceLink from "./SideServiceLink";
import { appDomain } from "@/helpers/config";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

const SideMenuNavigator = () => {
  const session = useSession();
  const pathName = usePathname();
  const [isAdmin, setIsAdmin] = useState<boolean>();
  useEffect(() => {
    validateAdminClient().then((res: any) => {
      setIsAdmin(res["isAdmin"]);
    });
  }, [session]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <SideServiceLink
          url={`${appDomain}/service`}
          iconLink="/icons/home-flood.png"
          linkName="Home"
          isActive={pathName === "/service"}
        />
      </div>
      <div
        style={{
          display: isAdmin ? "" : "none",
        }}
      >
        <SideServiceLink
          url={`${appDomain}/service/files`}
          iconLink="/icons/document-white.png"
          linkName="File Manager"
          isActive={pathName === "/service/files"}
        />
      </div>
      <div>
        <SideServiceLink
          url={`${appDomain}/service/flood-risk-index`}
          iconLink="/icons/flood-white.png"
          linkName="Flood Risk Index"
          isActive={pathName === "/service/flood-risk-index"}
        />
      </div>
      <div
        style={{
          display: isAdmin ? "" : "none",
        }}
      >
        <SideServiceLink
          url={`${appDomain}/service/flood-risk-index-calculator`}
          iconLink="/icons/calculator-icon-white.png"
          linkName="Flood Risk Index Calculator"
          isActive={pathName === "service/flood-risk-index-calculator"}
        />
      </div>
    </div>
  );
};
export default SideMenuNavigator;
