"use client";
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
          <th className="bg-[#791212] text-white">Barangay</th>
          <th className="bg-[#791212] text-white">Hazard</th>
          <th className="bg-[#791212] text-white">Exposure</th>
          <th className="bg-[#791212] text-white">Vulnerability</th>
          <th className="bg-[#791212] text-white">Capacity</th>
          <th className="bg-[#791212] text-white">Index Value</th>
          <th className="bg-[#791212] text-white">Interpretation</th>
          <th className="bg-[#791212] text-white">Last Update</th>
        </tr>
        {indexList.map((index, ind) => {
          return (
            <tr key={"indexandinter" + ind}>
              <td className="border-solid border-collapse border-2 border-black px-2">
                {index.location}
              </td>
              <td className="border-solid border-collapse border-2 border-black px-2">
                {index.hazard.toFixed(3)}
              </td>
              <td className="border-solid border-collapse border-2 border-black px-2">
                {index.exposure.toFixed(3)}
              </td>
              <td className="border-solid border-collapse border-2 border-black px-2">
                {index.vulnerability.toFixed(3)}
              </td>
              <td className="border-solid border-collapse border-2 border-black px-2">
                {index.capacity.toFixed(3)}
              </td>
              <td className="border-solid border-collapse border-2 border-black px-2">
                {index.value.toFixed(3)}
              </td>
              <td className="border-solid border-collapse border-2 border-black px-2">
                {index.interpretation}
              </td>
              <td className="border-solid border-collapse border-2 border-black px-2">
                {index.lastUpdate ? index.lastUpdate : "No date"}
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};
export default FloodRiskTable;
