export type Indicator = {
  indicatorCategory: "HAZARD" | "EXPOSURE" | "VULNERABILITY" | "CAPACITY";
  indicatorValue: IndicatorValue;
};

export type IndicatorValue = {
  valueName: string;
  value: number;
};
