"use client";
import {
  getAllFloodRiskIndex,
  uploadFloodRiskIndex,
} from "@/clientApi/floodRiskIndex";
import { Indicator, IndicatorValue } from "@/custom_types/Indicator";

import { useState, useEffect } from "react";
import IndicatorInput from "./IndicatorInput";
import { calculateRiskIndexBackend } from "@/clientApi/calculator";

const Calculator = () => {
  const [output, setOutput] = useState(0);
  const { trigger } = getAllFloodRiskIndex();
  useEffect(() => {
    uploadFloodRiskIndex(output).then(() => {
      trigger();
    });
  }, [output]);
  const [toCalculateValues, setToCalculateValues] = useState<{
    [key: string]: number[];
  }>({
    HAZARD: [],
    EXPOSURE: [],
    VULNERABILITY: [],
    CAPACITY: [],
  });

  return (
    <div className="flex flex-col w-full h-full gap-2">
      <div className="flex flex-col w-full lg:grid lg:grid-cols-2 gap-2">
        <div className="border-2 border-black border-solid border-collapse h-[40vh] p-2">
          <IndicatorInput
            indicatorType="HAZARD"
            indicatorValueOptions={[
              "Number of water body / waterway in barangay",
            ]}
            onAddIndicator={(indicatorList) => {
              const values = indicatorList.map(
                (indicator) => indicator.indicatorValue.value
              );
              setToCalculateValues({ ...toCalculateValues, HAZARD: values });
            }}
          />
        </div>
        <div className="border-2 border-black border-solid border-collapse h-[40vh] p-2">
          <IndicatorInput
            indicatorType="EXPOSURE"
            indicatorValueOptions={["Population Density"]}
            onAddIndicator={(indicatorList) => {
              const values = indicatorList.map(
                (indicator) => indicator.indicatorValue.value
              );
              setToCalculateValues({ ...toCalculateValues, EXPOSURE: values });
            }}
          />
        </div>
        <div className="border-2 border-black border-solid border-collapse h-[40vh] p-2">
          <IndicatorInput
            indicatorType="VULNERABILITY"
            indicatorValueOptions={["Elevation level of barangay"]}
            onAddIndicator={(indicatorList) => {
              const values = indicatorList.map(
                (indicator) => indicator.indicatorValue.value
              );
              setToCalculateValues({
                ...toCalculateValues,
                VULNERABILITY: values,
              });
            }}
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
            onAddIndicator={(indicatorList) => {
              const values = indicatorList.map(
                (indicator) => indicator.indicatorValue.value
              );
              setToCalculateValues({ ...toCalculateValues, CAPACITY: values });
            }}
          />
        </div>
      </div>
      <button
        className="bg-green-500 text-white p-5"
        onClick={() => {
          calculateRiskIndexBackend(toCalculateValues);
        }}
      >
        Calculate
      </button>
      <div>
        <span className="font-bold">Still no calculation</span>
        <p>0</p>
      </div>
    </div>
  );
};

export default Calculator;
