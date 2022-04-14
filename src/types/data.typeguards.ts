import { AnimalsResponse, CropsResponse, MbsResponse, ToolsResponse } from "./data.types";

export const isTool = (item: ToolsResponse | MbsResponse | AnimalsResponse | CropsResponse): item is ToolsResponse => {
  return "durability" in item;
};

export const isMbs = (item: ToolsResponse | MbsResponse | AnimalsResponse | CropsResponse): item is MbsResponse => {
  return "unstaking_time" in item;
};

export const isCrops = (item: ToolsResponse | MbsResponse | AnimalsResponse | CropsResponse): item is CropsResponse => {
  return "durability" in item;
};

export const isAnimal = (
  item: ToolsResponse | MbsResponse | AnimalsResponse | CropsResponse
): item is AnimalsResponse => {
  return "gender" in item;
};
