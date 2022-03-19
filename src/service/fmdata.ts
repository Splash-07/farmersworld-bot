import { TableRowEnums } from "./../types/data.types";
import { rpc } from "./wax";

export async function getAllTableRows(userAccount: string) {
  // const tables: TableRowEnums[] = ["accounts", "tools", "mbs", "buildings", "crops", "animals", "breedings", "account2fa"];
  //   const result = await Promise.all(tables.map((table, index) => getTableRow(userAccount, table, index)));
  // const account = await getTableRow(userAccount, tables[0]);
  // const assets = await getTableRow(userAccount, tables[1]);
  //   const mbs = await getTableRow(userAccount, tables[2]);
  //   const building = await getTableRow(userAccount, tables[3], 4);
  //   const crops = await getTableRow(userAccount, tables[4], 5);
  //   const animals = await getTableRow(userAccount, tables[5], 6);
  //   const breedings = await getTableRow(userAccount, tables[6], 7);
  //   const account2fa = await getTableRow(userAccount, tables[7], 8);
}

export async function getTableRow(userAccount: string, table: TableRowEnums) {
  const index = {
    accounts: 1,
    tools: 2,
    mbs: 3,
    buildings: 4,
    crops: 5,
    animals: 6,
    breedings: 7,
    account2fa: 8,
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
    console.log(`"ОШИБКА при получении списка ${table}: ${error.message}`);
    return false;
  }
}
