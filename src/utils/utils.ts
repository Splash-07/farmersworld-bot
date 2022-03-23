export function parseStringToNumber(string: string) {
  const splitted = string.split(" ");
  const number = +parseFloat(splitted[0]).toFixed(2);
  return number;
}

export function getTextColor(type: string) {
  return type === "Wood" ? "#4299E1" : type === "Gold" ? "#DD6B20" : "#319795";
}
