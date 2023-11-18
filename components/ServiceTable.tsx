import ServiceLink from "./ServiceLink";

const ServiceTable = () => {
  return (
    <div>
      <div className="w-[250px]">
        <ServiceLink
          urlIcon="/icons/document-icon.png"
          shortDescription="Manage your files here."
        />
      </div>
    </div>
  );
};
export default ServiceTable;
