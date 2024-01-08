import Image from "next/image";
import Link from "next/link";

type Prop = {
  url: string;
  iconLink: string;
  linkName: string;
  isActive?: boolean;
};
const SideServiceLink = ({ url, iconLink, linkName, isActive }: Prop) => {
  return (
    <div
      className="flex"
      style={{ backgroundColor: isActive ? "#990000" : "" }}
    >
      <Link
        className="w-full flex text-white items-center px-4 py-2 gap-4"
        href={url}
      >
        <Image alt="link" width={40} src={iconLink} height={40} />
        <span>{linkName}</span>
      </Link>
    </div>
  );
};

export default SideServiceLink;
