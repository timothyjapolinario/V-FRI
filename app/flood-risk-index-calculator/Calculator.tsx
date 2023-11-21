"use client";
import {
  getAllFloodRiskIndex,
  uploadFloodRiskIndex,
} from "@/clientApi/floodRiskIndex";

import { useState, useEffect } from "react";
const Calculator = () => {
  const [xValue, setXValue] = useState(0);
  const [yValue, setYValue] = useState(0);
  const [output, setOutput] = useState(0);
  const { trigger } = getAllFloodRiskIndex();
  useEffect(() => {
    uploadFloodRiskIndex(output).then(() => {
      trigger();
    });
  }, [output]);
  return (
    <div className="flex flex-col w-full h-full">
      <span className="font-bold">Input x: </span>{" "}
      <input
        type="number"
        className="w-[300px]"
        value={xValue}
        onChange={(e) => {
          setXValue(parseInt(e.target.value));
        }}
      ></input>
      <span className="font-bold">Input y: </span>
      <input
        type="number"
        className="w-[300px]"
        value={yValue}
        onChange={(e) => {
          setYValue(parseInt(e.target.value));
        }}
      ></input>
      <button
        className="bg-green-500 text-white p-5"
        onClick={() => {
          setOutput(xValue * yValue);
        }}
      >
        Calculate
      </button>
      <div>
        <span className="font-bold">Your Rectangle Area is!: </span>
        <p>Value: {output}</p>
      </div>
    </div>
  );
};

export default Calculator;
