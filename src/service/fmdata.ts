import { setAccount, setMbs, setResources, setTools } from "../store/slices/user.slice";
import { store } from "../store/store";
import { AccountResourcesResponse, AccountResponse, TableRowEnums, ToolsResponse } from "./../types/data.types";
import { rpc } from "./wax";

export async function getResourcesData(username: string) {
  try {
    const accountResourcesList = await getTableRow<AccountResourcesResponse>(username, TableRowEnums.accounts);
    if (accountResourcesList) {
      store.dispatch(setResources(accountResourcesList));
      return accountResourcesList;
    }
  } catch (error: any) {
    console.log(`Failed to fetch account recourses data: ${error.message}`);
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
    return false;
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
    return data.rows as Type[];
  } catch (error: any) {
    console.log(`Failed to fetch ${table} data: ${error.message}`);
    return false;
  }
}
