import {
  Account,
  AccountInfoResponse,
  AccountResourcesResponse,
  Animal,
  AnimalsResponse,
  AssetsInStash,
  AssetsInStashResponse,
  Crop,
  CropsResponse,
  GetAllDataResponse,
  Mbs,
  MbsResponse,
  Resources,
  TableRowEnums,
  Tool,
  ToolsResponse,
} from "../../types/data.types";

import { createAsyncThunk, createSlice, Dispatch } from "@reduxjs/toolkit";
import { pushLog, SettingsState } from "./settings.slice";

import { findLowestCD } from "../../utils/timers";
import {
  filterAnimalList,
  parseAccountInfo,
  parseAccountResources,
  parseAssetsInStash,
} from "../../utils/utils";
import { JsonRpc } from "eosjs";

export interface DataState {
  username?: string;
  accountInfo?: Account;
  resources?: Resources;
  toolsList?: ToolsResponse;
  mbsList?: MbsResponse;
  cropsList?: CropsResponse;
  breedingsList?: any;
  animalsList?: AnimalsResponse;
  assetsInStash?: AssetsInStash;
  next?: Tool | Mbs | Crop | Animal;
}

export const getAllData = createAsyncThunk<
  GetAllDataResponse,
  { rpc: JsonRpc; username: string },
  { rejectValue: any; dispatch: Dispatch }
>("data/fetchData", async ({ rpc, username }, thunkAPI) => {
  try {
    const accountInfo = (await rpc.get_account(
      username
    )) as AccountInfoResponse;
    const resources = await getTableRow<AccountResourcesResponse>(
      rpc,
      username,
      TableRowEnums.accounts
    );
    const tools = await getTableRow<ToolsResponse>(
      rpc,
      username,
      TableRowEnums.tools
    );
    const mbs = await getTableRow<MbsResponse>(
      rpc,
      username,
      TableRowEnums.mbs
    );
    const crops = await getTableRow<CropsResponse>(
      rpc,
      username,
      TableRowEnums.crops
    );
    const breedings = await getTableRow<any>(
      rpc,
      username,
      TableRowEnums.breedings
    );
    const animals = await getTableRow<AnimalsResponse>(
      rpc,
      username,
      TableRowEnums.animals
    );
    const assetsInStash = await getTableRow<AssetsInStashResponse>(
      rpc,
      username,
      TableRowEnums.assetsInStash
    );

    const response = {
      accountInfo,
      resources: resources[0],
      tools,
      mbs,
      crops,
      breedings,
      animals,
      assetsInStash,
    };
    console.log(response);
    return response;
  } catch (error: any) {
    console.log(error);
    thunkAPI.dispatch(pushLog(`${error}`));
    return thunkAPI.rejectWithValue(error);
  }
});

async function getTableRow<Type>(
  rpc: JsonRpc,
  username: string,
  table: TableRowEnums
): Promise<Type[] | any> {
  const index = table === "accounts" ? 1 : 2;
  let options;

  if (table === "assetsInStash") {
    options = {
      json: true,
      code: "atomicassets",
      scope: username,
      table: "assets",
      limit: 1000,
      reverse: false,
      show_payer: false,
    };
  } else {
    options = {
      json: true,
      code: "farmersworld",
      scope: "farmersworld",
      table: table,
      lower_bound: username,
      upper_bound: username,
      index_position: index,
      limit: 100,
      key_type: "i64",
      reverse: false,
      show_payer: false,
    };
  }
  try {
    const data = await rpc.get_table_rows(options);
    return data.rows;
  } catch (error: any) {
    return Promise.reject(`Failed to fetch ${table}`);
  }
}

const initialState: DataState = {
  username: undefined,
  accountInfo: undefined,
  resources: undefined,
  toolsList: undefined,
  cropsList: undefined,
  mbsList: undefined,
  breedingsList: undefined,
  animalsList: undefined,
  assetsInStash: undefined,
  next: undefined,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setUsername: (state, { payload }: { payload: string }) => {
      state.username = payload;
    },

    setNextAction: (state, { payload }: { payload: SettingsState }) => {
      const { animalsList, assetsInStash, toolsList, mbsList, cropsList } =
        state;

      const {
        feedChickenIsDisabled,
        feedDairyCowIsDisabled,
        mbsStoreIsDisabled,
      } = payload;

      const filteredAnimalList = filterAnimalList(
        animalsList!,
        assetsInStash!,
        feedChickenIsDisabled,
        feedDairyCowIsDisabled
      );

      const lowCdItem = findLowestCD(
        toolsList!,
        mbsList!,
        cropsList!,
        filteredAnimalList,
        mbsStoreIsDisabled
      );

      state.next = lowCdItem;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllData.fulfilled, (state, { payload }) => {
      const {
        accountInfo,
        resources,
        tools,
        mbs,
        crops,
        breedings,
        animals,
        assetsInStash,
      } = payload;

      state.accountInfo = parseAccountInfo(accountInfo);
      state.resources = parseAccountResources(resources);
      state.toolsList = tools;
      state.animalsList = animals;
      state.mbsList = mbs;
      state.cropsList = crops;
      state.breedingsList = breedings;
      state.assetsInStash = parseAssetsInStash(assetsInStash);
    });
  },
});

export const { setUsername, setNextAction } = dataSlice.actions;

export default dataSlice.reducer;
