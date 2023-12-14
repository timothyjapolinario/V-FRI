import { appDomain } from "@/helpers/config";

export const calculateRiskIndexBackend = async (
  toCalculate: {
    [key: string]: number[];
  },
  barangay: string,
  shouldSave?: boolean
) => {
  const result = fetch(`${appDomain}/api/flood-risk-index`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ toCalculate, shouldSave, barangay }),
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
