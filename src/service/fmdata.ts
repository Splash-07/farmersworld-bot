import {
  setAccount,
  setAnimals,
  setAssetsInStash,
  setBreedings,
  setCrops,
  setMbs,
  setResources,
  setTools,
} from "../store/slices/user.slice";
import { store } from "../store/store";
import {
  AccountResourcesResponse,
  AccountResponse,
  AssetsInStashResponse,
  CropsResponse,
  TableRowEnums,
  ToolsResponse,
} from "./../types/data.types";
import { rpc } from "./wax";

export async function getBreedingsData(username: string) {
  try {
    const breedingsResponseList = await getTableRow<CropsResponse[]>(username, TableRowEnums.breedings);
    if (breedingsResponseList) {
      store.dispatch(setBreedings(breedingsResponseList));
      return breedingsResponseList;
    }
  } catch (error: any) {
    console.log(`Failed to breedings data: ${error.message}`);
    return Promise.reject();
  }
}
export async function getAnimalsData(username: string) {
  try {
    const animalsList = await getTableRow<CropsResponse[]>(username, TableRowEnums.animals);
    if (animalsList) {
      store.dispatch(setAnimals(animalsList));
      return animalsList;
    }
  } catch (error: any) {
    console.log(`Failed to fetch animals data: ${error.message}`);
    return Promise.reject();
  }
}

export async function getCropsData(username: string) {
  try {
    const cropsResourcesList = await getTableRow<CropsResponse[]>(username, TableRowEnums.crops);
    if (cropsResourcesList) {
      store.dispatch(setCrops(cropsResourcesList));
      return cropsResourcesList;
    }
  } catch (error: any) {
    console.log(`Failed to fetch crops data: ${error.message}`);
    return Promise.reject();
  }
}

export async function getResourcesData(username: string) {
  try {
    const accountResourcesList = await getTableRow<AccountResourcesResponse>(username, TableRowEnums.accounts);
    if (accountResourcesList) {
      store.dispatch(setResources(accountResourcesList));
      return accountResourcesList;
    }
  } catch (error: any) {
    console.log(`Failed to fetch account recourses data: ${error.message}`);
    return Promise.reject();
  }
}
export async function getToolsData(username: string) {
  try {
    const tools = await getTableRow<ToolsResponse>(username, TableRowEnums.tools);
    if (tools) {
      store.dispatch(setTools(tools));
      return tools;
    }
  } catch (error: any) {
    console.log(`Failed to fetch tools data: ${error.message}`);
    return Promise.reject();
  }
}
export async function getMbsData(username: string) {
  try {
    const mbs = await getTableRow<ToolsResponse>(username, TableRowEnums.mbs);
    if (mbs) {
      store.dispatch(setMbs(mbs));
      return mbs;
    }
  } catch (error: any) {
    console.log(`Failed to fetch mbs data: ${error.message}`);
    return Promise.reject();
  }
}

export async function getAccountData(username: string) {
  try {
    const accountData = await rpc.get_account(username);
    // console.log(accountData);
    if (accountData) {
      store.dispatch(setAccount(accountData as AccountResponse));
      return accountData;
    }
  } catch (error: any) {
    console.log(`Failed to fetch account data: ${error.message}`);
    return Promise.reject();
  }
}

export async function getAssetsInStash(username: string) {
  try {
    const assetsInStashList = await getTableRowStash<AssetsInStashResponse>(username);
    if (assetsInStashList) {
      store.dispatch(setAssetsInStash(assetsInStashList));
      return assetsInStashList;
    }
  } catch (error: any) {
    console.log(`Failed to fetch stash data: ${error.message}`);
    return Promise.reject();
  }
}
export async function getTableRow<Type>(userAccount: string, table: TableRowEnums): Promise<false | Type[]> {
  const index = {
    accounts: 1,
    tools: 2,
    mbs: 2,
    buildings: 2,
    crops: 2,
    animals: 2,
    breedings: 2,
    account2fa: 2,
  };
  try {
    const data = await rpc.get_table_rows({
      json: true,
      code: "farmersworld",
      scope: "farmersworld",
      table: table,
      lower_bound: userAccount,
      upper_bound: userAccount,
      index_position: index[table],
      limit: 100,
      key_type: "i64",
      reverse: false,
      show_payer: false,
    });
    return data.rows;
  } catch (error: any) {
    console.log(`Failed to fetch ${table} data: ${error.message}`);
    return false;
  }
}

export async function getTableRowStash<Type>(userAccount: string): Promise<false | Type[]> {
  try {
    const data = await rpc.get_table_rows({
      json: true,
      code: "atomicassets",
      scope: userAccount,
      table: "assets",
      limit: 1000,
      reverse: false,
      show_payer: false,
    });
    return data.rows;
  } catch (error: any) {
    console.log(`Failed to fetch stash data: ${error.message}`);
    return false;
  }
}
