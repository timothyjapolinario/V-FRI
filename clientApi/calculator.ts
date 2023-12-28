import { appDomain } from "@/helpers/config";
import moment from "moment";

export const calculateRiskIndexBackend = async (
  toCalculate: {
    [key: string]: number[];
  },
  barangay: string,
  shouldSave?: boolean
) => {
  const dateToday = moment().format("MMMM Do YYYY, h:mm:ss a");
  const result = fetch(`${appDomain}/api/flood-risk-index`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ toCalculate, shouldSave, barangay, dateToday }),
  }).then((res) => {
    let returnVal = undefined;
    try {
      returnVal = res.json();
    } catch (error) {
      console.log(error);
    }
    return returnVal;
  });
  return result;
};
