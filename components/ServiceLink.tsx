type Prop = {
  urlIcon: string;
  shortDescription: string;
};
const ServiceLink = ({ urlIcon, shortDescription }: Prop) => {
  return (
    <div className="h-full w-full justify-evenly flex flex-wrap flex-col bg-gray-200 shadow-sm border-2 border-solid border-black p-2 items-center gap-2 rounded-md cursor-pointer">
      <img src={urlIcon} className="h-[60px]" />
      <p className="font-bold text-center">{shortDescription}</p>
    </div>
  );
};

export default ServiceLink;
