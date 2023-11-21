import { Indicator, IndicatorValue } from "@/custom_types/Indicator";
import { useState } from "react";
type Prop = {
  indicatorType: "HAZARD" | "EXPOSURE" | "VULNERABILITY" | "CAPACITY";
  indicatorValueOptions: string[];
};
const IndicatorInput = ({ indicatorType, indicatorValueOptions }: Prop) => {
  const [indicatorList, setIndicatorList] = useState<Indicator[]>([]);

  return (
    <div className="w-full">
      <h1 className="text-center font-bold border-b-2 border-solid border-black">
        {indicatorType}
      </h1>
      <div className="py-2">
        {indicatorList.map((indicator, index) => {
          return (
            <div>
              <select
                onChange={(e) => {
                  const updatedList = indicatorList.map(
                    (indicator, selIndex) => {
                      if (selIndex === index) {
                        indicator.indicatorValue.valueName =
                          indicatorValueOptions[parseInt(e.target.value)];
                      }
                      return indicator;
                    }
                  );
                  setIndicatorList([...updatedList]);
                }}
              >
                {indicatorValueOptions.map((indicatorOption, index) => {
                  return <option value={index}>{indicatorOption}</option>;
                })}
              </select>{" "}
              :{" "}
              <input
                type="number"
                className="w-[100px]"
                value={indicator.indicatorValue.value}
                onChange={(e) => {
                  const updatedList = indicatorList.map(
                    (indicator, selIndex) => {
                      if (selIndex === index) {
                        indicator.indicatorValue.value = parseInt(
                          e.target.value
                        );
                      }
                      return indicator;
                    }
                  );
                  setIndicatorList([...updatedList]);
                }}
              />
            </div>
          );
        })}
        <button
          className="bg-green-500 text-white rounded-md p-1"
          onClick={() => {
            const newHazardValue: IndicatorValue = {
              value: 0,
              valueName: indicatorValueOptions[0],
            };
            const newIndicator: Indicator = {
              indicatorCategory: "HAZARD",
              indicatorValue: newHazardValue,
            };
            setIndicatorList([...indicatorList, newIndicator]);
          }}
        >
          + Add {indicatorType}
        </button>
      </div>
    </div>
  );
};
export default IndicatorInput;
