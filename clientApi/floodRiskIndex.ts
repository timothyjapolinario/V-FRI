import { FloodRiskIndex } from "@/custom_types/FloodRiskIndex";
import { appDomain } from "@/helpers/config";
import { useEffect, useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
export const uploadFloodRiskIndex = async (floodRiskIndexValue: number) => {
  const body = {
    floodRiskIndexValue,
  };
  const response = await fetch(`${appDomain}/api/flood-risk-index`, {
    method: "POST",
    body: JSON.stringify(body),
  }).then((res) => {
    return res.json();
  });
  console.log("RESPONSE!!: ", response);
  return response;
};

export const getAllFloodRiskIndex = () => {
  const [indexList, setIndexList] = useState<FloodRiskIndex[]>([]);

  const fetcher = async (url: string) => {
    return fetch(url).then(async (res) => {
      try {
        const data = await res.json();
        console.log("grrr", data);
        if (data && data["data"]) {
          const newIndexList = data["data"].map((index: any) => {
            const floodRiskIndex: FloodRiskIndex = {
              value: index["value"],
              interpretation: index["interpretation"],
            };
            return floodRiskIndex;
          }) as FloodRiskIndex[];
          setIndexList(newIndexList);
        }
      } catch (error) {
        console.log(error);
        return { error: error };
      }
    });
  };

  const { data, error, isLoading } = useSWR(
    `${appDomain}/api/flood-risk-index`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    }
  );
  const { trigger, isMutating } = useSWRMutation(
    `${appDomain}/api/flood-risk-index`,
    fetcher
  );

  return { indexList, trigger, isLoading };
};
