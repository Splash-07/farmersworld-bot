import { Animal, Crop, Mbs, Tool } from "./data.types";

export const isTool = (item: Tool | Mbs | Animal | Crop): item is Tool => {
  return "durability" in item;
};

export const isMbs = (item: Tool | Mbs | Animal | Crop): item is Mbs => {
  return "unstaking_time" in item;
};

export const isCrops = (item: Tool | Mbs | Animal | Crop): item is Crop => {
  return "durability" in item;
};

export const isAnimal = (item: Tool | Mbs | Animal | Crop): item is Animal => {
  return "gender" in item;
};
