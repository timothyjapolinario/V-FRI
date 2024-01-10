"use client";
import { getAllFloodRiskIndex } from "@/clientApi/floodRiskIndex";
import Loading from "./loading";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FloodRiskIndex } from "@/custom_types/FloodRiskIndex";
type SortType =
  | "alphabetical"
  | "hazard"
  | "exposure"
  | "vulnerability"
  | "capacity"
  | "index";
const FloodRiskTable = () => {
  const { indexList, isLoading } = getAllFloodRiskIndex();
  const [filteredIndexList, setFilteredIndexList] = useState([...indexList]);
  const [searchValue, setSearchValue] = useState("");
  const sortTable = (sortType: SortType) => {
    let sorted: FloodRiskIndex[] = [];
    if (sortType === "alphabetical") {
      sorted = indexList.sort((a, b) => {
        return b.location > a.location ? -1 : 1;
      });
    }

    if (sortType === "capacity") {
      sorted = indexList.sort((a, b) => {
        return b.hazard - a.hazard;
      });
    }

    if (sortType === "exposure") {
      sorted = indexList.sort((a, b) => {
        return b.exposure - a.exposure;
      });
    }

    if (sortType === "hazard") {
      sorted = indexList.sort((a, b) => {
        return b.hazard - a.hazard;
      });
    }

    if (sortType === "vulnerability") {
      sorted = indexList.sort((a, b) => {
        return b.vulnerability - a.vulnerability;
      });
    }

    if (sortType === "index") {
      sorted = indexList.sort((a, b) => {
        return b.value - a.value;
      });
    }
    setFilteredIndexList([...sorted]);
  };
  useEffect(() => {
    setFilteredIndexList([...indexList]);
  }, [indexList]);
  useEffect(() => {
    if (searchValue === "") {
      setFilteredIndexList([...indexList]);
    } else {
      const filtered = indexList.filter((index) =>
        index.location.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredIndexList([...filtered]);
    }
  }, [searchValue]);
  return (
    <div className="relative min-h-[50vh]">
      {isLoading && (
        <Image
          src="/icons/loading-spinner.svg"
          alt="loading-spinner"
          width={300}
          height={300}
          className="absolute top-0 bottom-0 right-0 left-0 m-auto"
        />
      )}
      <div className="w-full flex justify-between">
        <div className="py-2">
          <input
            placeholder="Search Barangay"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
        </div>
        <div className="mb-2 w-fit">
          <h1 className="text-center bg-[#791212] text-white flex items-center justify-center">
            Sort By:
          </h1>
          <select
            onChange={(e) => {
              const sortType = e.target.value as SortType;
              sortTable(sortType);
            }}
          >
            <option
              value={"index"}
              onSelect={() => {
                sortTable("index");
              }}
            >
              <button className="hover:bg-[#a83a3a]" onClick={() => {}}>
                Index
              </button>
            </option>
            <option value={"alphabetical"}>Alphabetical</option>
            <option value={"hazard"}>Hazard</option>
            <option value={"exposure"}>Exposure</option>
            <option value={"vulnerability"}>Vulnerability</option>
            <option value={"capacity"}>Capacity</option>
          </select>
          <div className="flex flex-col bg-[#9c9c9c] w-fit  "></div>
        </div>
      </div>

      <table
        className="border-solid border-collapse border-2 border-black w-full"
        style={{
          display: isLoading ? "none" : "",
        }}
      >
        <tr className="border-solid border-collapse border-2 border-black">
          <th className="bg-[#791212] text-white">Barangay</th>
          <th className="bg-[#791212] text-white">Hazard</th>
          <th className="bg-[#791212] text-white">Exposure</th>
          <th className="bg-[#791212] text-white">Vulnerability</th>
          <th className="bg-[#791212] text-white">Capacity</th>
          <th className="bg-[#791212] text-white">Index Value</th>
          <th className="bg-[#791212] text-white">Interpretation</th>
          <th className="bg-[#791212] text-white">Last Update</th>
        </tr>
        {filteredIndexList.map((index, ind) => {
          return (
            <tr key={"indexandinter" + ind}>
              <td className="border-solid border-collapse border-2 border-black px-2">
                {index.location}
              </td>
              <td className="border-solid border-collapse border-2 border-black px-2">
                {index.hazard.toFixed(3)}
              </td>
              <td className="border-solid border-collapse border-2 border-black px-2">
                {index.exposure.toFixed(3)}
              </td>
              <td className="border-solid border-collapse border-2 border-black px-2">
                {index.vulnerability.toFixed(3)}
              </td>
              <td className="border-solid border-collapse border-2 border-black px-2">
                {index.capacity.toFixed(3)}
              </td>
              <td className="border-solid border-collapse border-2 border-black px-2">
                {index.value.toFixed(3)}
              </td>
              <td className="border-solid border-collapse border-2 border-black px-2">
                {index.interpretation}
              </td>
              <td className="border-solid border-collapse border-2 border-black px-2">
                {index.lastUpdate ? index.lastUpdate : "No date"}
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};
export default FloodRiskTable;
