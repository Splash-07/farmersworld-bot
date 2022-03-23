export interface Resources {
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
export interface Account {
  cpuUsed: number;
  cpuMax: number;
  cpuAvailable: number;
  waxBalance: number;
  waxStackedOnCpu: number;
  waxSelfStackedOnCpu: number;
}
export interface AccountResponse {
  cpu_limit: {
    available: number;
    max: number;
    used: number;
  };
  core_liquid_balance: string;
  total_resources: {
    cpu_weight: string;
    net_weight: string;
    owner: string;
    ram_bytes: number;
  };
  self_delegated_bandwidth: {
    cpu_weight: string;
    from: string;
    net_weight: string;
    to: string;
  };
}
export interface AccountResourcesResponse {
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
export interface NextToolItem extends ToolsResponse {
  timer_to_action: number;
}
export interface MbsResponse extends Omit<ToolsResponse, "current_durability" | "durability"> {
  unstaking_time: number;
}
export interface NextMbsItem extends MbsResponse {
  timer_to_action: number;
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
