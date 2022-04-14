import {
  Account,
  AccountResourcesResponse,
  AccountResponse,
  AnimalsResponse,
  AssetsInStash,
  AssetsInStashResponse,
  CropsResponse,
  MbsResponse,
  NextAnimalItem,
  NextCropsItem,
  NextMbsItem,
  NextToolItem,
  Resources,
  ToolsResponse,
} from "./../../types/data.types";
import { createSlice } from "@reduxjs/toolkit";
import { findLowestCD } from "../../utils/timers";
import { filterAnimalsList, parseStringToNumber } from "../../utils/utils";
import { animalsDailyClaimLimitMap } from "../data";

export interface UserState {
  username: string | null;
  account?: Account;
  resources?: Resources;
  items: {
    toolsList: ToolsResponse[];
    mbsList: MbsResponse[];
    cropsList: CropsResponse[];
    breedingsList: any[];
    animalsList: AnimalsResponse[];
    assetsInStash: AssetsInStash;
    next?: NextToolItem | NextMbsItem | NextCropsItem | NextAnimalItem;
  };
}

const initialState: UserState = {
  username: null,
  account: undefined,
  resources: undefined,
  items: {
    toolsList: [],
    cropsList: [],
    mbsList: [],
    breedingsList: [],
    animalsList: [],
    assetsInStash: {
      milk: [],
      barley: [],
      corn: [],
      eggs: [],
      coins: [],
    },
    next: undefined,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleLogin: (state, { payload }) => {
      state.username = payload;
    },
    setAccount: (state, { payload }: { payload: AccountResponse }) => {
      const object = {
        cpuUsed: payload.cpu_limit.used,
        cpuMax: payload.cpu_limit.max,
        cpuAvailable: payload.cpu_limit.available,
        waxBalance: parseStringToNumber(payload.core_liquid_balance),
        waxStackedOnCpu: parseStringToNumber(payload.total_resources.cpu_weight),
        waxSelfStackedOnCpu: parseStringToNumber(payload.self_delegated_bandwidth.cpu_weight),
      };
      state.account = object;
    },
    setResources: (state, { payload }: { payload: AccountResourcesResponse[] }) => {
      const firstObj = payload[0];
      const wood = parseInt(firstObj.balances.filter((item) => item.includes("WOOD"))[0].split(" ")[0]);
      const gold = parseInt(firstObj.balances.filter((item) => item.includes("GOLD"))[0].split(" ")[0]);
      const food = parseInt(firstObj.balances.filter((item) => item.includes("FOOD"))[0].split(" ")[0]);
      state.resources = {
        account: firstObj.account,
        balances: {
          wood,
          gold,
          food,
        },
        energy: firstObj.energy,
        last_mine_tx: firstObj.last_mine_tx,
        max_energy: firstObj.max_energy,
      };
    },
    setTools: (state, { payload }) => {
      state.items.toolsList = payload;
    },
    setMbs: (state, { payload }) => {
      state.items.mbsList = payload;
    },
    setCrops: (state, { payload }) => {
      state.items.cropsList = payload;
    },
    setBreedings: (state, { payload }) => {
      state.items.breedingsList = payload;
    },
    setAnimals: (state, { payload }) => {
      state.items.animalsList = payload;
    },
    setAssetsInStash: (state, { payload }: { payload: AssetsInStashResponse[] }) => {
      const assetsInStash: AssetsInStash = {
        milk: [],
        barley: [],
        corn: [],
        eggs: [],
        coins: [],
      };
      payload.forEach((asset) => {
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
      state.items.assetsInStash = assetsInStash;
    },
    setNextAction: (state) => {
      const filteredAnimalList = filterAnimalsList(state.items.animalsList, state.items.assetsInStash);
      const lowCdItem = findLowestCD(
        state.items.toolsList,
        state.items.mbsList,
        state.items.cropsList,
        filteredAnimalList
      );
      state.items.next = {
        ...lowCdItem.item,
        timer_to_action: lowCdItem.timer,
      };
    },
  },
});

export const {
  handleLogin,
  setResources,
  setTools,
  setMbs,
  setCrops,
  setNextAction,
  setAccount,
  setBreedings,
  setAnimals,
  setAssetsInStash,
} = userSlice.actions;

export default userSlice.reducer;
