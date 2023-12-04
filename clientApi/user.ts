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
