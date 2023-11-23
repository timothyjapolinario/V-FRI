import { Indicator, IndicatorValue } from "@/custom_types/Indicator";
import { useState, useEffect } from "react";
type Prop = {
  indicatorType: "HAZARD" | "EXPOSURE" | "VULNERABILITY" | "CAPACITY";
  indicatorValueOptions: string[];
  onAddIndicator?: (indicatorList: Indicator[]) => void;
};
const IndicatorInput = ({
  indicatorType,
  indicatorValueOptions,
  onAddIndicator,
}: Prop) => {
  const [indicatorList, setIndicatorList] = useState<Indicator[]>([]);
  const [_indicatorValueOptions, _setindicatorValueOptions] = useState([
    ...indicatorValueOptions,
  ]);

  useEffect(() => {
    if (onAddIndicator) {
      onAddIndicator(indicatorList);
    }
  }, [indicatorList]);
  return (
    <div className="w-full">
      <h1 className="text-center font-bold border-b-2 border-solid border-black">
        {indicatorType}
      </h1>
      <div className="py-2">
        {indicatorList.map((indicator, index) => {
          return (
            <div key={"indicator" + indicatorType + index}>
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
                {_indicatorValueOptions.map((indicatorOption, index) => {
                  return (
                    <option
                      value={index}
                      key={indicatorType + "option" + index}
                    >
                      {indicatorOption}
                    </option>
                  );
                })}
              </select>{" "}
              :{" "}
              <input
                type="number"
                step={"0.01"}
                className="w-[100px]"
                value={indicator.indicatorValue.value}
                onChange={(e) => {
                  const updatedList = indicatorList.map(
                    (indicator, selIndex) => {
                      if (selIndex === index) {
                        indicator.indicatorValue.value = parseFloat(
                          e.target.value
                        );
                      }
                      return indicator;
                    }
                  );
                  setIndicatorList([...updatedList]);
                }}
              />
              <button
                className=" px-2 bg-red-500 rounded-lg text-white m-2"
                onClick={() => {
                  setIndicatorList([
                    ...indicatorList.filter((_, curInd) => curInd !== index),
                  ]);
                }}
              >
                X
              </button>
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
