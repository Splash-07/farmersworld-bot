import {
  AccountInfoResponse,
  Account,
  AccountResourcesResponse,
  Resources,
  AssetsInStashResponse,
  AssetsInStash,
  MbsResponse,
  AnimalsResponse,
  ToolsResponse,
} from "./../types/data.types";
import { animalsDailyClaimLimitMap, colorsMap } from "../store/data";
import { filterDailyLimits } from "./timers";

export function parseStringToNumber(string: string) {
  const splitted = string.split(" ");
  const number = +parseFloat(splitted[0]).toFixed(2);
  return number;
}

export function getTextColor(type: string) {
  return colorsMap.get(type);
}

export function sortByType(list: ToolsResponse) {
  const array = [...list];
  const sorted = array.sort((a, b) => {
    if (a.type > b.type) return 1;
    if (b.type > a.type) return -1;
    return 0;
  });
  return sorted;
}

export function parseAccountInfo(accountInfo: AccountInfoResponse): Account {
  return {
    cpuAvailable: accountInfo.cpu_limit.available,
    cpuUsed: accountInfo.cpu_limit.used,
    cpuMax: accountInfo.cpu_limit.max,
    waxBalance: parseStringToNumber(accountInfo.core_liquid_balance),
    waxStackedOnCpu: parseStringToNumber(
      accountInfo.total_resources.cpu_weight
    ),
    waxSelfStackedOnCpu: parseStringToNumber(
      accountInfo.self_delegated_bandwidth.cpu_weight
    ),
  };
}

export function parseAccountResources(
  resources: AccountResourcesResponse
): Resources {
  const wood =
    parseInt(
      resources.balances
        .filter((item) => item.includes("WOOD"))[0]
        ?.split(" ")[0]
    ) || 0;
  const gold =
    parseInt(
      resources.balances
        .filter((item) => item.includes("GOLD"))[0]
        ?.split(" ")[0]
    ) || 0;
  const food =
    parseInt(
      resources.balances
        .filter((item) => item.includes("FOOD"))[0]
        ?.split(" ")[0]
    ) || 0;
  return {
    account: resources.account,
    balances: {
      wood,
      gold,
      food,
    },
    energy: resources.energy,
    last_mine_tx: resources.last_mine_tx,
    max_energy: resources.max_energy,
  };
}

export function parseAssetsInStash(
  assetsInStashResponse: AssetsInStashResponse
): AssetsInStash {
  const assetsInStash: AssetsInStash = {
    milk: [],
    barley: [],
    corn: [],
    eggs: [],
    coins: [],
  };
  assetsInStashResponse.forEach((asset) => {
    const { template_id, asset_id } = asset;
    switch (template_id) {
      case 298593:
        if (!assetsInStash.milk.includes(asset_id)) {
          assetsInStash.milk.push(asset_id);
        }
        break;
      case 318606:
        if (!assetsInStash.barley.includes(asset_id)) {
          assetsInStash.barley.push(asset_id);
        }
        break;
      case 318607:
        if (!assetsInStash.corn.includes(asset_id)) {
          assetsInStash.corn.push(asset_id);
        }
        break;
      case 298612:
        if (!assetsInStash.eggs.includes(asset_id)) {
          assetsInStash.eggs.push(asset_id);
        }
        break;
      case 260676:
        if (!assetsInStash.coins.includes(asset_id)) {
          assetsInStash.coins.push(asset_id);
        }
        break;
    }
  });
  return assetsInStash;
}

export function filterMbsByType(mbs: MbsResponse, type: string) {
  return mbs.filter((mbs) => mbs.type === type);
}
export function filterAnimalList(
  animals: AnimalsResponse,
  assetsInStash: AssetsInStash,
  feedChickenIsDisabled: boolean,
  feedDairyCowIsDisabled: boolean
) {
  const filteredList = animals.filter((animal) => {
    const { template_id, day_claims_at } = animal;
    const dailyLimit = animalsDailyClaimLimitMap.get(template_id);
    const filteredDailyLimit = filterDailyLimits(day_claims_at);
    // if chicken egg
    if (template_id === 298612) {
      if (
        dailyLimit &&
        day_claims_at.length === dailyLimit &&
        filteredDailyLimit.length === 0
      )
        return false;
    }
    // if chick or chicken
    if (template_id === 298613 || template_id === 298614) {
      // Dont feed chiken if disabled
      if (template_id === 298614 && feedChickenIsDisabled) return false;
      if (assetsInStash.barley.length === 0) return false;
      if (
        dailyLimit &&
        day_claims_at.length === dailyLimit &&
        filteredDailyLimit.length === 0
      )
        return false;
    }
    // if Baby Calf
    if (template_id === 298597) {
      if (assetsInStash.milk.length === 0) return false;
      if (
        dailyLimit &&
        day_claims_at.length === dailyLimit &&
        filteredDailyLimit.length === 0
      )
        return false;
    }
    // if Female Calf, Male Calf, Dairy Cow, Bull
    if (
      template_id === 298599 ||
      template_id === 298600 ||
      template_id === 298607 ||
      template_id === 298611
    ) {
      // Dont feed Dairy Cow
      if (template_id === 298607 && feedDairyCowIsDisabled) return false;
      if (assetsInStash.barley.length === 0) return false;
      if (
        dailyLimit &&
        day_claims_at.length === dailyLimit &&
        filteredDailyLimit.length === 0
      )
        return false;
    }
    return true;
  });
  return filteredList;
}
