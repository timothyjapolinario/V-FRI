import { appDomain } from "@/helpers/config";

export const calculateRiskIndexBackend = async (toCalculate: {
  [key: string]: number[];
}) => {
  const result = fetch(`${appDomain}/api/flood-risk-index`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toCalculate),
  }).then((res) => {
    return res.json();
  });
  return result;
};
