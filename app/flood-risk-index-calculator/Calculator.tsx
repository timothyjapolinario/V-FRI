"use client";
import {
  getAllFloodRiskIndex,
  uploadFloodRiskIndex,
} from "@/clientApi/floodRiskIndex";
import { Indicator, IndicatorValue } from "@/custom_types/Indicator";

import { useState, useEffect } from "react";
import IndicatorInput from "./IndicatorInput";
const Calculator = () => {
  const [output, setOutput] = useState(0);
  const { trigger } = getAllFloodRiskIndex();
  useEffect(() => {
    uploadFloodRiskIndex(output).then(() => {
      trigger();
    });
  }, [output]);

  return (
    <div className="flex flex-col w-full h-full gap-2">
      <div className="flex flex-col w-full lg:grid lg:grid-cols-2 gap-2">
        <div className="border-2 border-black border-solid border-collapse h-[40vh] p-2">
          <IndicatorInput
            indicatorType="HAZARD"
            indicatorValueOptions={[
              "Number of water body / waterway in barangay",
            ]}
          />
        </div>
        <div className="border-2 border-black border-solid border-collapse h-[40vh] p-2">
          <IndicatorInput
            indicatorType="EXPOSURE"
            indicatorValueOptions={["Population Density"]}
          />
        </div>
        <div className="border-2 border-black border-solid border-collapse h-[40vh] p-2">
          <IndicatorInput
            indicatorType="VULNERABILITY"
            indicatorValueOptions={["Elevation level of barangay"]}
          />
        </div>
        <div className="border-2 border-black border-solid border-collapse h-[40vh] p-2">
          <IndicatorInput
            indicatorType="CAPACITY"
            indicatorValueOptions={[
              "Number of flood gates",
              "Number of pumping stations",
              "Number of evacuation centers",
            ]}
          />
        </div>
      </div>
      <button className="bg-green-500 text-white p-5">Calculate</button>
      <div>
        <span className="font-bold">Still no calculation</span>
        <p>0</p>
      </div>
    </div>
  );
};

export default Calculator;
