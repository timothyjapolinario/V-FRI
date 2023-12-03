"use client";
import { getAllFloodRiskIndex } from "@/clientApi/floodRiskIndex";
import { Suspense } from "react";
import Loading from "./loading";
import FloodRiskTable from "./FloodRiskTable";
const FloodRiskIndex = () => {
  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-center">
        Flood Risk Index Values
      </h1>
      <Suspense fallback={<Loading />}>
        <FloodRiskTable />
      </Suspense>
    </div>
  );
};

export default FloodRiskIndex;
