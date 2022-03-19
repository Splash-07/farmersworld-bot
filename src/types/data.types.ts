// export interface DataResponse{
//   rows: AssetsResponseInterface[] | AccountInfoResponseInterface[];
//   next_ley: string;
//   more: boolean;
// }
export interface Account {
  account: string;
  balances: string[];
  energy: number;
  last_mine_tx: string;
  max_energy: number;
}
export interface Tools {
  asset_id: string;
  current_durability: number;
  durability: number;
  next_availability: number;
  owner: string;
  template_id: number;
  type: string;
}

export interface DataInfoInterface {
  name: string;
  template_id: string;
  gold: number;
  wood: number;
  schema_name: string;
}
export interface AssetInfoInterface extends DataInfoInterface {
  cost: { gold: number; wood: number; food: number; fc: number };
  exchange: boolean;
  energy?: number;
  repair?: number;
  building?: boolean;
  claim?: { energy: number };
  max_claim?: number;
  daily_claim_limit?: number;
}

export enum TableRowEnums {
  accounts = "accounts",
  tools = "tools",
  mbs = "mbs",
  buildings = "buildings",
  crops = "crops",
  animals = "animals",
  breedings = "breedings",
  account2fa = "account2fa",
}
// export interface ToolInfoInterface extends DataInfoInterface {
//   type: "Wood" | "Food" | "Gold";
//   reward: number;
//   hourly_reward_wood: number;
//   hourly_reward_gold: number;
//   hourly_reward_food: number;
//   energy: number;
//   durability: number;
//   gold: number;
//   wood: number;
//   counter: number;
//   hourly_durability_cost: number;
// }
