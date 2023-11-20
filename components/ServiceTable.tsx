import Link from "next/link";
import ServiceLink from "./ServiceLink";

const ServiceTable = () => {
  return (
    <div className="flex flex-wrap gap-4 w-full sm:grid sm:grid-cols-2 lg:grid-cols-3">
      <Link href={"/files"}>
        <div className="w-[100%] max-w-[300px] h-[150px]">
          <ServiceLink
            urlIcon="/icons/document-icon.png"
            shortDescription="Manage your files here."
          />
        </div>
      </Link>

      <div className="w-[100%] max-w-[300px]">
        <Link href={"/flood-risk-index-calculator"}>
          <div className="w-[100%] max-w-[300px] h-[150px]">
            <ServiceLink
              urlIcon="/icons/flood-icon.png"
              shortDescription="Calculate flood risk index here."
            />
          </div>
        </Link>
      </div>
    </div>
  );
};
export default ServiceTable;
