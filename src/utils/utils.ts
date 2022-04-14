import { animalsDailyClaimLimitMap, colorsMap } from "../store/data";
import { AnimalsResponse, AssetsInStash } from "../types/data.types";

// const { user, settings } = store.getState();

export function parseStringToNumber(string: string) {
  const splitted = string.split(" ");
  const number = +parseFloat(splitted[0]).toFixed(2);
  return number;
}

export function getTextColor(type: string) {
  return colorsMap.get(type);
}

export function filterAnimalsList(animals: AnimalsResponse[], assetsInStash: AssetsInStash) {
  const filteredList = animals.filter((animal) => {
    // if (settings.feedDairyCowIsDisabled) return false;
    const { template_id, day_claims_at } = animal;
    const dailyLimit = animalsDailyClaimLimitMap.get(template_id);

    // if chicken egg
    if (template_id === 298612) {
      if (dailyLimit && day_claims_at.length === dailyLimit) return false;
    }
    // if chick or chicken
    if (template_id === 298613 || template_id === 298614) {
      // Dont feed chiken if disabled
      // if (template_id === 298614 && settings.feedChickenIsDisabled) return false;
      if (assetsInStash.barley.length === 0) return false;
      if (dailyLimit && day_claims_at.length === dailyLimit) return false;
    }
    // if Baby Calf
    if (template_id === 298597) {
      if (assetsInStash.milk.length === 0) return false;
      if (dailyLimit && day_claims_at.length === dailyLimit) return false;
    }
    // if Female Calf, Male Calf, Dairy Cow, Bull
    if (template_id === 298599 || template_id === 298600 || template_id === 298607 || template_id === 298611) {
      // Dont feed Dairy Cow
      // if (template_id === 298607 && settings.feedDairyCowIsDisabled) return false;
      if (assetsInStash.barley.length === 0) return false;
      if (dailyLimit && day_claims_at.length === dailyLimit) return false;
    }
    return true;
  });
  return filteredList;
}
