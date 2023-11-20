"use client";
import {
  getAllFloodRiskIndex,
  uploadFloodRiskIndex,
} from "@/clientApi/floodRiskIndex";
import { FloodRiskIndex } from "@/custom_types/FloodRiskIndex";
import { useState, useEffect } from "react";
const Calculator = () => {
  const [xValue, setXValue] = useState(0);
  const [yValue, setYValue] = useState(0);
  const [output, setOutput] = useState(0);
  const { indexList, trigger } = getAllFloodRiskIndex();
  useEffect(() => {
    uploadFloodRiskIndex(output).then(() => {
      trigger();
    });
  }, [output]);
  return (
    <div className="flex flex-col">
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
      <h1 className="p-4 font-bold text-xl">Index List</h1>
      {indexList.map((index, ind) => {
        return (
          <div key={"floodriskindex" + ind}>
            {index.value} : {index.interpretation}
          </div>
        );
      })}
    </div>
  );
};

export default Calculator;
