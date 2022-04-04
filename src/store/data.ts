import { MbsResponse } from "./../types/data.types";
export const mbsMultiMap = new Map([
  ["260636", 1],
  ["260638", 2],
  ["260639", 3],
  ["260628", 1],
  ["260629", 2],
  ["260631", 3],
  ["260642", 1],
  ["260644", 2],
  ["260647", 3],
]);
export const cornsRequiredClaimMap = new Map([
  ["298595", 42],
  ["298596", 42],
]);
export const assetNameMap = new Map([
  ["318606", "Barley"],
  ["318607", "Corn"],
  ["298595", "Barley Seed"],
  ["298596", "Corn Seed"],
  ["298593", "Milk"],
  ["378691", "Ancient Stone Axe"],
  ["260763", "Stone Axe"],
  ["203881", "Axe"],
  ["203883", "Saw"],
  ["203886", "Chainsaw"],
  ["203887", "Fishing Rod"],
  ["203888", "Fishing Net"],
  ["203889", "Boat"],
  ["203891", "Mining Excavator"],
  ["298592", "Farm Plot"],
  ["298591", "Coop"],
  ["298590", "Cowshed"],
  ["298612", "Chicken Egg"],
  ["298613", "Chick"],
  ["298614", "Chicken"],
  ["298597", "Baby Calf"],
  ["298599", "Female Calf"],
  ["298600", "Male Calf"],
  ["298607", "Dairy Cow"],
  ["298611", "Bull"],
  ["260676", "Farmers Coin"],
  ["260636", "Food Membership Bronze"],
  ["260638", "Food Membership Silver"],
  ["260639", "Food Membership Gold"],
  ["260628", "Wood Membership Bronze"],
  ["260629", "Wood Membership Silver"],
  ["260631", "Wood Membership Gold"],
  ["260642", "Gold Membership Bronze"],
  ["260644", "Gold Membership Silver"],
  ["260647", "Gold Membership Gold"],
]);
export const colorsMap = new Map([
  ["Wood", "#4299E1"],
  ["Gold", "#DD6B20"],
  ["Food", "#319795"],
  ["Crops", "#48BB78"],
]);

export function filterMbsByType(mbs: MbsResponse[], type: string) {
  return mbs.filter((mbs) => mbs.type === type);
}
