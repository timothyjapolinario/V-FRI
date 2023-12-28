import { appDomain } from "@/helpers/config";

export const validateAdminClient = async () => {
  return await fetch(`${appDomain}/api/validate-admin`).then((res) => {
    try {
      return res.json();
    } catch (error) {
      console.log(error);
    }
  });
};

export const addAdminClient = async (newEmail: string) => {
  const body = {
    newEmail: newEmail,
  };
  const response = await fetch(`${appDomain}/api/validate-admin`, {
    method: "POST",
    body: JSON.stringify(body),
  }).then((res) => {
    try {
      res.json();
    } catch (error) {
      console.log(error);
    }
    return res;
  });
  console.log("RESPONSE!!: ", response);
  return response;
};
