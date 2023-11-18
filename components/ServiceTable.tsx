import ServiceLink from "./ServiceLink";

const ServiceTable = () => {
  return (
    <div className="flex flex-wrap gap-4 w-full md:grid grid-cols-3">
      <div className="w-[100%] max-w-[300px]">
        <ServiceLink
          urlIcon="/icons/document-icon.png"
          shortDescription="Manage your files here."
        />
      </div>
      <div className="sm:w-[100%] max-w-[300px]">
        <ServiceLink
          urlIcon="/icons/document-icon.png"
          shortDescription="Calculate flood risk index."
        />
      </div>
    </div>
  );
};
export default ServiceTable;
