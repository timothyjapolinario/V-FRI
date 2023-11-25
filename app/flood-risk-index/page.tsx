"use client";
import { getAllFloodRiskIndex } from "@/clientApi/floodRiskIndex";
const FloodRiskIndex = () => {
  const { indexList } = getAllFloodRiskIndex();
  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-center">
        Flood Risk Index Values
      </h1>
      <table className="border-solid border-collapse border-2 border-black w-full">
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

export default FloodRiskIndex;
