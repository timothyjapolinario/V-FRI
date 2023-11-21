"use client";
import { getAllFloodRiskIndex } from "@/clientApi/floodRiskIndex";
import Image from "next/image";

export const RiskIndexInterpretationTable = () => {
  const { indexList, isLoading } = getAllFloodRiskIndex();
  return (
    <div>
      <h1 className="p-4 font-bold text-xl">Index List</h1>

      {isLoading && (
        <Image
          src="/icons/loading-spinner.svg"
          alt="loading-spinner"
          width={300}
          height={300}
          className="absolute top-[0] bottom-0 right-0 left-0 m-auto"
        />
      )}
      <table className="w-full">
        <thead>
          <tr>
            <th className="border-2 border-solid border-black border-collapse p-2">
              <h1 className="font-bold">Flood Risk Sample Value</h1>
            </th>
            <th className="border-2 border-solid border-black border-collapse p-2">
              <h1 className="font-bold">Interpretation</h1>
            </th>
          </tr>
        </thead>
        <tbody>
          {indexList.map((index, ind) => {
            return (
              <tr key={"floodriskindex" + ind}>
                <td className="border-2 border-solid border-black border-collapse">
                  {index.value}
                </td>
                <td className="border-2 border-solid border-black border-collapse">
                  {index.interpretation}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
