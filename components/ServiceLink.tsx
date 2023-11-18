type Prop = {
  urlIcon: string;
  shortDescription: string;
};
const ServiceLink = ({ urlIcon, shortDescription }: Prop) => {
  return (
    <div className="bg-gray-200 shadow-sm border-2 border-solid border-black flex w-full p-2 items-center gap-5 rounded-md cursor-pointer">
      <img src={urlIcon} className="h-[70px]" />
      <p className="font-bold">{shortDescription}</p>
      <button className="text-blue-500 justify-self-end">{">"}</button>
    </div>
  );
};

export default ServiceLink;
