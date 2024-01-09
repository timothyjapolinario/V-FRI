import { validateAdminClient } from "@/clientApi/user";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import SideServiceLink from "./SideServiceLink";
import { appDomain } from "@/helpers/config";

const SideMenuNavigator = () => {
  const session = useSession();
  const [isAdmin, setIsAdmin] = useState<boolean>();
  useEffect(() => {
    validateAdminClient().then((res: any) => {
      setIsAdmin(res["isAdmin"]);
    });
  }, [session]);
  const [activeLinkIndex, setActiveLinkIndex] = useState(1);
  return (
    <div className="flex flex-col gap-4">
      <div
        onClick={() => {
          setActiveLinkIndex(1);
        }}
      >
        <SideServiceLink
          url={`${appDomain}/service`}
          iconLink="/icons/home-flood.png"
          linkName="Home"
          isActive={activeLinkIndex === 1}
        />
      </div>
      <div
        onClick={() => {
          setActiveLinkIndex(2);
        }}
        style={{
          display: isAdmin ? "" : "none",
        }}
      >
        <SideServiceLink
          url={`${appDomain}/service/files`}
          iconLink="/icons/document-icon.png"
          linkName="File Manager"
          isActive={activeLinkIndex === 2}
        />
      </div>
      <div
        onClick={() => {
          setActiveLinkIndex(3);
        }}
      >
        <SideServiceLink
          url={`${appDomain}/service/flood-risk-index`}
          iconLink="/icons/flood-icon.png"
          linkName="Flood Risk Index"
          isActive={activeLinkIndex === 3}
        />
      </div>
      <div
        onClick={() => {
          setActiveLinkIndex(4);
        }}
        style={{
          display: isAdmin ? "" : "none",
        }}
      >
        <SideServiceLink
          url={`${appDomain}/service/flood-risk-index-calculator`}
          iconLink="/icons/calculator-icon.png"
          linkName="Flood Risk Index Calculator"
          isActive={activeLinkIndex === 4}
        />
      </div>
    </div>
  );
};
export default SideMenuNavigator;
