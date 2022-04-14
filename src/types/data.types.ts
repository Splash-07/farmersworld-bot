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
export interface MbsResponse {
  asset_id: string;
  next_availability: number;
  owner: string;
  template_id: number;
  type: string;
  unstaking_time: number;
}

export interface CropsResponse {
  asset_id: string;
  building_id: string;
  last_claimed: number;
  name: string;
  next_availability: number;
  owner: string;
  template_id: number;
  times_claimed: number;
}
export interface AnimalsResponse {
  asset_id: string;
  building_id: string;
  day_claims_at: number[];
  gender: number;
  last_claimed: number;
  name: string;
  next_availability: number;
  owner: string;
  partner_id: number;
  template_id: number;
  times_claimed: number;
}
export interface AssetsInStashResponse {
  asset_id: string;
  backed_tokens: any[];
  collection_name: string;
  immutable_serialized_data: any[];
  mutable_serialized_data: any[];
  ram_payer: string;
  schema_name: string;
  template_id: number;
}
export interface AssetsInStash {
  milk: string[];
  barley: string[];
  corn: string[];
  eggs: string[];
  coins: string[];
}

export interface NextToolItem extends ToolsResponse {
  timer_to_action: number;
}
export interface NextMbsItem extends MbsResponse {
  timer_to_action: number;
}
export interface NextCropsItem extends CropsResponse {
  timer_to_action: number;
}
export interface NextAnimalItem extends CropsResponse {
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
