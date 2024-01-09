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
  const [interpretation, setInterpretation] = useState<string>("");
  const [barangay, setBarangay] = useState<string>("Arkong Bato");
  const [toCalculateValues, setToCalculateValues] = useState<{
    [key: string]: number[];
  }>({
    HAZARD: [],
    EXPOSURE: [],
    VULNERABILITY: [],
    CAPACITY: [],
  });

  const barangayList = [
    "Arkong Bato",
    "Bagbaguin",
    "Balangkas",
    "Bignay",
    "Bisig",
    "Canumay East",
    "Canumay West",
    "Coloong",
    "Dalandanan",
    "Gen. T. de Leon",
    "Isla",
    "Karuhatan",
    "Lawang Bato",
    "Lingunan",
    "Mabolo",
    "Malanday",
    "Malinta",
  ];
  return (
    <div className="flex flex-col w-full h-full gap-2">
      <div className="flex justify-between">
        <div>
          <p>
            <span className="font-bold">Barangay: </span>
            <select
              onChange={(e) => {
                setBarangay(e.target.value);
              }}
            >
              {barangayList.map((barangay, index) => (
                <option key={"barangay-option" + index}>{barangay}</option>
              ))}
            </select>
          </p>

          <button
            className="bg-[#990000] px-2 rounded-lg text-white ml-2"
            onClick={() => {
              calculateRiskIndexBackend(toCalculateValues, barangay, true).then(
                (res) => {
                  setOutput(res["floodRiskIndex"]);
                  setInterpretation(res["interpretation"]);
                }
              );
            }}
          >
            Save
          </button>
        </div>
        <div className="flex gap-4">
          <div>
            <span className="font-bold">Flood Risk Value: </span>
            <p className="underline">{output}</p>
          </div>
          <div>
            <span className="font-bold">Interpretation</span>
            <p>{interpretation}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full lg:grid lg:grid-cols-2 gap-2">
        <div className="border-2 border-black border-solid border-collapse h-[40vh] p-2 overflow-y-scroll">
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
        <div className="border-2 border-black border-solid border-collapse h-[40vh] p-2 overflow-y-scroll">
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
        <div className="border-2 border-black border-solid border-collapse h-[40vh] p-2 overflow-y-scroll">
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
        <div className="border-2 border-black border-solid border-collapse h-[40vh] p-2 overflow-y-scroll">
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
        className="bg-[#791212] text-white p-5"
        onClick={() => {
          calculateRiskIndexBackend(toCalculateValues, barangay, false).then(
            (res) => {
              console.log("wtfffff", res);
              setOutput(res["floodRiskIndex"]);
              setInterpretation(res["interpretation"]);
            }
          );
        }}
      >
        Calculate
      </button>
    </div>
  );
};

export default Calculator;
