import { assetMap, mbsMultiMap } from "./../store/data";
import {
  Animal,
  AnimalsResponse,
  Crop,
  CropsResponse,
  Mbs,
  Tool,
} from "./../types/data.types";
import { MbsResponse, ToolsResponse } from "../types/data.types";
import { isMbs, isTool } from "../types/data.typeguards";
import { filterMbsByType } from "./utils";

export function msToTime(ms: number) {
  if (ms < 0) return "00:00:00";
  let seconds = ms / 1000;
  const hours = Math.floor(seconds / 3600);
  seconds = seconds % 3600;
  const minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);
  return `${
    hours >= 10 ? hours : hours < 10 && hours > 0 ? `0${hours}` : "00"
  }:${
    minutes >= 10 ? minutes : minutes < 10 && minutes > 0 ? `0${minutes}` : "00"
  }:${
    seconds >= 10 ? seconds : seconds < 10 && seconds > 0 ? `0${seconds}` : "00"
  }`;
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export function filterDailyLimits(dayClaimList: number[]) {
  const dayInMs = 86486400; // ~=  1 day 1 min. 26 sec. 400 ms
  return dayClaimList.filter(
    (time) => new Date().getTime() - time * 1000 > dayInMs
  );
}

export function adjustTime({
  item,
  mbs,
  mbsStoreIsDisabled,
}: {
  item: Tool | Mbs | Crop | Animal;
  mbs?: MbsResponse;
  mbsStoreIsDisabled?: boolean;
}) {
  const delay = 10000;
  const itemName = assetMap.get(item.template_id)?.name;
  let timer = item.next_availability * 1000 - new Date().getTime();

  // if item is mbs card, and if storing is not disabled, store up to x4
  if (isMbs(item)) {
    const mbsClaimDelay = 30000; // 30sec
    if (mbsStoreIsDisabled) return timer + mbsClaimDelay;

    const mbsCooldown = 86400000; // 24 hours
    const mbsStoreLimit = mbsMultiMap.get(item.template_id)! + 1;

    return timer + mbsCooldown * mbsStoreLimit + mbsClaimDelay;
  }

  // if item is not Tool -> return timer
  if (!isTool(item) || !mbs) return timer + delay;

  const mbsFiltered = filterMbsByType(mbs, item.type);
  if (mbsFiltered.length === 0) return timer + delay;

  // If item is tool and we have members card, then add additional time, tyo store items (so less operation will occurs -> less CPU usage)
  const exception = ["Ancient Stone Axe", "Mining Excavator"];
  const hour = exception.includes(itemName!) ? 7200000 : 3600000;
  const additiveTime = mbsFiltered.reduce(
    (acc, cur) => (acc += mbsMultiMap.get(cur.template_id)! * hour),
    0
  );
  timer += additiveTime;
  return timer + delay;
}

export function findLowestCD(
  tools: ToolsResponse,
  mbs: MbsResponse,
  crops: CropsResponse,
  animals: AnimalsResponse,
  mbsStoreIsDisabled: boolean
) {
  const array = [...tools, ...mbs, ...crops, ...animals];
  const adjustedTimeArray = array.map((item) => {
    return {
      ...item,
      next_availability: adjustTime({ item, mbs, mbsStoreIsDisabled }),
    };
  });

  const foundedItem = adjustedTimeArray.reduce((prev, cur) => {
    return prev.next_availability < cur.next_availability ? prev : cur;
  });

  return foundedItem;
}
