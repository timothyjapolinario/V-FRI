"use client";
import { getAllFloodRiskIndex } from "@/clientApi/floodRiskIndex";
import { Suspense } from "react";
import Loading from "./loading";
import FloodRiskTable from "./FloodRiskTable";
const FloodRiskIndex = () => {
  return (
    <div className="w-full">
      <h1 className="text-[#791212] font-extrabold text-4xl text-center">
        Flood Risk Index Values
      </h1>
      <div className="p-4">
        <Suspense fallback={<Loading />}>
          <FloodRiskTable />
        </Suspense>
      </div>
    </div>
  );
};

export default FloodRiskIndex;
