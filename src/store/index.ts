import { CONFIGURATION_API } from "./../API/index";

const getConfiguration = async () => await CONFIGURATION_API.GET();

export const getConfig = async () => {
  if (!localStorage.getItem("config")) {
    const config = await getConfiguration();
    localStorage.setItem("config", JSON.stringify(config));
    return config;
  }

  return JSON.parse(localStorage.getItem("config") as string);
};
