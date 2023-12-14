"use client";
import { getAllFloodRiskIndex } from "@/clientApi/floodRiskIndex";
import { Suspense } from "react";
import Loading from "./loading";
import FloodRiskTable from "./FloodRiskTable";
const FloodRiskIndex = () => {
  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-center p-5">
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
