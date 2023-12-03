import { getAllFloodRiskIndex } from "@/clientApi/floodRiskIndex";
import Loading from "./loading";
import Image from "next/image";

const FloodRiskTable = () => {
  const { indexList, isLoading } = getAllFloodRiskIndex();
  return (
    <div>
      {isLoading && (
        <Image
          src="/icons/loading-spinner.svg"
          alt="loading-spinner"
          width={300}
          height={300}
          className="absolute top-[0] bottom-0 right-0 left-0 m-auto"
        />
      )}
      <table
        className="border-solid border-collapse border-2 border-black w-full"
        style={{
          display: isLoading ? "none" : "",
        }}
      >
        <tr className="border-solid border-collapse border-2 border-black">
          <th>Index Value</th>
          <th>Interpretation</th>
        </tr>
        {indexList.map((index, ind) => {
          return (
            <tr key={"indexandinter" + ind}>
              <td>{index.value}</td>
              <td>{index.interpretation}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};
export default FloodRiskTable;
