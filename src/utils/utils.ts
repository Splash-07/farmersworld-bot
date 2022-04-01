import { colorsMap } from "../store/data";

export function parseStringToNumber(string: string) {
  const splitted = string.split(" ");
  const number = +parseFloat(splitted[0]).toFixed(2);
  return number;
}

export function getTextColor(type: string) {
  return colorsMap.get(type);
}
