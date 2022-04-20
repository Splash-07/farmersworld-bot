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
} from "../types/data.types";
import { rpc } from "./wax";

export async function getBreedingsData(username: string) {
  const { status, response } = await getTableRow<CropsResponse[]>(
    username,
    TableRowEnums.breedings
  );

  if (status === true) {
    store.dispatch(setBreedings(response));
    return response;
  } else {
    console.log(`Failed to breedings data: ${response}`);
    return Promise.reject();
  }
}
export async function getAnimalsData(username: string) {
  const { status, response } = await getTableRow<CropsResponse[]>(
    username,
    TableRowEnums.animals
  );
  if (status === true) {
    store.dispatch(setAnimals(response));
    return response;
  } else {
    console.log(`Failed to fetch animals data: ${response}`);
    return Promise.reject();
  }
}

export async function getCropsData(username: string) {
  const { status, response } = await getTableRow<CropsResponse[]>(
    username,
    TableRowEnums.crops
  );
  if (status === true) {
    store.dispatch(setCrops(response));
    return response;
  } else {
    console.log(`Failed to fetch crops data: ${response}`);
    return Promise.reject();
  }
}

export async function getResourcesData(username: string) {
  const { status, response } = await getTableRow<AccountResourcesResponse>(
    username,
    TableRowEnums.accounts
  );
  if (status === true) {
    store.dispatch(setResources(response));
    return response;
  } else {
    console.log(`Failed to fetch account recourses data: ${response}`);
    return Promise.reject();
  }
}
export async function getToolsData(username: string) {
  const { status, response } = await getTableRow<ToolsResponse>(
    username,
    TableRowEnums.tools
  );
  if (status === true) {
    store.dispatch(setTools(response));
    return response;
  } else {
    console.log(`Failed to fetch tools data: ${response}`);
    return Promise.reject();
  }
}
export async function getMbsData(username: string) {
  const mbs = await getTableRow<ToolsResponse>(username, TableRowEnums.mbs);
  if (mbs.status === true) {
    store.dispatch(setMbs(mbs.response));
    return mbs;
  } else {
    console.log(`Failed to fetch mbs data: ${mbs.response}`);
    return Promise.reject();
  }
}

export async function getTableRow<Type>(
  userAccount: string,
  table: TableRowEnums
): Promise<
  { status: boolean; response: any } | { status: boolean; response: Type[] }
> {
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
    return { status: true, response: data.rows };
  } catch (error: any) {
    return { status: false, response: error };
  }
}
export async function getAccountData(username: string) {
  try {
    const accountData = await rpc.get_account(username);
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
  const payload = {
    json: true,
    code: "atomicassets",
    scope: username,
    table: "assets",
    limit: 1000,
    reverse: false,
    show_payer: false,
  };
  try {
    const { rows } = await rpc.get_table_rows(payload);
    if (rows) {
      const assetsInStashList: AssetsInStashResponse[] = rows;
      store.dispatch(setAssetsInStash(assetsInStashList));
      return assetsInStashList;
    }
  } catch (error: any) {
    console.log(`Failed to fetch stash data: ${error.message}`);
    return Promise.reject();
  }
}
