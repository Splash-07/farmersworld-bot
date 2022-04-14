import {
  Account,
  AccountResourcesResponse,
  AccountResponse,
  AnimalsResponse,
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
import { parseStringToNumber } from "../../utils/utils";

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
    setNextAction: (state) => {
      const lowCdItem = findLowestCD(
        state.items.toolsList,
        state.items.mbsList,
        state.items.cropsList,
        state.items.animalsList
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
} = userSlice.actions;

export default userSlice.reducer;
