export interface Account {
  account: string;
  balances: {
    wood: number;
    gold: number;
    food: number;
  };
  energy: number;
  last_mine_tx: string;
  max_energy: number;
}
export interface AccountResponse {
  account: string;
  balances: string[];
  energy: number;
  last_mine_tx: string;
  max_energy: number;
}
export interface ToolsResponse {
  asset_id: string;
  current_durability: number;
  durability: number;
  next_availability: number;
  owner: string;
  template_id: number;
  type: string;
}
export interface MbsResponse extends Omit<ToolsResponse, "current_durability" | "durability"> {
  unstaking_time: number;
}

export interface DataInfoInterface {
  name: string;
  template_id: string;
  gold: number;
  wood: number;
  schema_name: string;
}
export interface AssetInfoInterface extends DataInfoInterface {
  gradeMulti?: number;
  type?: "Wood" | "Food" | "Gold";
  cost: { gold: number; wood: number; food: number; fc: number };
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
