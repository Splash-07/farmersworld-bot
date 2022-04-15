import { filterDailyLimits } from "../utils/timers";
import { AnimalsResponse, AssetsInStash, MbsResponse } from "./../types/data.types";
export const mbsMultiMap = new Map([
  [260636, 1],
  [260638, 2],
  [260639, 3],
  [260628, 1],
  [260629, 2],
  [260631, 3],
  [260642, 1],
  [260644, 2],
  [260647, 3],
]);
export const itemsClaimRequiredMap = new Map([
  [298595, 42],
  [298596, 42],
  [298612, 9],
  [298613, 9],
  [298614, 9],
  [298597, 6],
  [298599, 9],
  [298600, 9],
  [298607, 9],
  [298611, 9],
]);
export const animalsDailyClaimLimitMap = new Map([
  [298612, 3],
  [298613, 42],
  [298614, 9],
  [298597, 2],
  [298599, 9],
  [298600, 6],
  [298607, 9],
  [298611, 9],
]);
export const assetMap = new Map([
  [318606, { name: "Barley", type: "Crops" }],
  [318607, { name: "Corn", type: "Crops" }],
  [298595, { name: "Barley Seed", type: "Crops" }],
  [298596, { name: "Corn Seed", type: "Crops" }],
  [298593, { name: "Milk", type: "Breedings" }],
  [378691, { name: "Ancient Stone Axe", type: "Wood" }],
  [260763, { name: "Stone Axe", type: "Wood" }],
  [203881, { name: "Axe", type: "Wood" }],
  [203883, { name: "Saw", type: "Wood" }],
  [203886, { name: "Chainsaw", type: "Wood" }],
  [203887, { name: "Fishing Rod", type: "Food" }],
  [203888, { name: "Fishing Net", type: "Food" }],
  [203889, { name: "Boat", type: "Food" }],
  [203891, { name: "Mining Excavator", type: "Gold" }],
  [298592, { name: "Farm Plot", type: "Building" }],
  [298591, { name: "Coop", type: "Building" }],
  [298590, { name: "Cowshed", type: "Building" }],
  [298612, { name: "Chicken Egg", type: "Animals" }],
  [298613, { name: "Chick", type: "Animals" }],
  [298614, { name: "Chicken", type: "Animals" }],
  [298597, { name: "Baby Calf", type: "Animals" }],
  [298599, { name: "Female Calf", type: "Animals" }],
  [298600, { name: "Male Calf", type: "Animals" }],
  [298607, { name: "Dairy Cow", type: "Animals" }],
  [298611, { name: "Bull", type: "Animals" }],
  [260676, { name: "Farmers Coin", type: "Coin" }],
  [260636, { name: "Food Membership Bronze", type: "Food" }],
  [260638, { name: "Food Membership Silver", type: "Food" }],
  [260639, { name: "Food Membership Gold", type: "Food" }],
  [260628, { name: "Wood Membership Bronze", type: "Wood" }],
  [260629, { name: "Wood Membership Silver", type: "Wood" }],
  [260631, { name: "Wood Membership Gold", type: "Wood" }],
  [260642, { name: "Gold Membership Bronze", type: "Gold" }],
  [260644, { name: "Gold Membership Silver", type: "Gold" }],
  [260647, { name: "Gold Membership Gold", type: "Gold" }],
]);

export const colorsMap = new Map([
  ["Wood", "#4299E1"],
  ["Gold", "#DD6B20"],
  ["Food", "#319795"],
  ["Crops", "#ECC94B"],
  ["Animals", "#FFFFF0"],
]);

export function filterMbsByType(mbs: MbsResponse[], type: string) {
  return mbs.filter((mbs) => mbs.type === type);
}

export function filterAnimalList(
  animals: AnimalsResponse[],
  assetsInStash: AssetsInStash,
  feedChickenIsDisabled: boolean,
  feedDairyCowIsDisabled: boolean
) {
  const filteredList = animals.filter((animal) => {
    // if (settings.feedDairyCowIsDisabled) return false;
    const { template_id, day_claims_at } = animal;
    const dailyLimit = animalsDailyClaimLimitMap.get(template_id);
    const filteredDailyLimit = filterDailyLimits(day_claims_at);
    // if chicken egg
    if (template_id === 298612) {
      if (dailyLimit && filteredDailyLimit.length === dailyLimit) return false;
    }
    // if chick or chicken
    if (template_id === 298613 || template_id === 298614) {
      // Dont feed chiken if disabled
      if (template_id === 298614 && feedChickenIsDisabled) return false;
      if (assetsInStash.barley.length === 0) return false;
      if (dailyLimit && filteredDailyLimit.length === dailyLimit) return false;
    }
    // if Baby Calf
    if (template_id === 298597) {
      if (assetsInStash.milk.length === 0) return false;
      if (dailyLimit && filteredDailyLimit.length === dailyLimit) return false;
    }
    // if Female Calf, Male Calf, Dairy Cow, Bull
    if (template_id === 298599 || template_id === 298600 || template_id === 298607 || template_id === 298611) {
      // Dont feed Dairy Cow
      if (template_id === 298607 && feedDairyCowIsDisabled) return false;
      if (assetsInStash.barley.length === 0) return false;
      if (dailyLimit && filteredDailyLimit.length === dailyLimit) return false;
    }
    return true;
  });
  return filteredList;
}
