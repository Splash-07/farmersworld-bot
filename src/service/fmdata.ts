import { setAccount, setMbs, setTools } from "../store/slices/user.slice";
import { store } from "../store/store";
import { AccountResponse, TableRowEnums, ToolsResponse } from "./../types/data.types";
import { rpc } from "./wax";

export async function getAccountData(username: string) {
  const accountList = await getTableRow<AccountResponse>(username, TableRowEnums.accounts);
  if (accountList) store.dispatch(setAccount(accountList));
}
export async function getToolsData(username: string) {
  const tools = await getTableRow<ToolsResponse>(username, TableRowEnums.tools);
  if (tools) {
    store.dispatch(setTools(tools));
  }
}
export async function getMbsData(username: string) {
  const mbs = await getTableRow<ToolsResponse>(username, TableRowEnums.mbs);
  if (mbs) {
    store.dispatch(setMbs(mbs));
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
    console.log(`"ОШИБКА при получении списка ${table}: ${error.message}`);
    return false;
  }
}
