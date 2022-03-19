import { RootState, store } from "./../store/store";
import { useSelector } from "react-redux";
import { Tools } from "./../types/data.types";
import { wax } from "./wax";

const { user, settings } = store.getState();
console.log(settings);
export async function actionClaim(
  asset_id: string,
  username: string
): Promise<{
  status: boolean;
  result: any;
}> {
  try {
    const payload = {
      account: "farmersworld",
      name: "claim",
      authorization: [{ actor: username, permission: "active" }],
      data: {
        asset_id: asset_id,
        owner: username,
      },
    };
    const response = await wax.api.transact({ actions: [payload] }, { blocksBehind: 3, expireSeconds: 1200 });
    if (response) return { status: true, result: response };
    else return { status: false, result: response };
  } catch (error: any) {
    return { status: false, result: error.message };
  }
}

export async function actionClaimMembership(
  member_id: string,
  username: string
): Promise<{
  status: boolean;
  result: any;
}> {
  try {
    const payload = {
      account: "farmersworld",
      name: "mbsclaim",
      authorization: [{ actor: username, permission: "active" }],
      data: {
        asset_id: member_id,
        owner: username,
      },
    };
    const response = await wax.api.transact({ actions: [payload] }, { blocksBehind: 3, expireSeconds: 1200 });
    if (response) return { status: true, result: response };
    else return { status: false, result: response };
  } catch (error: any) {
    return { status: false, result: error.message };
  }
}
export async function actionEnergyRecovery(
  totalEnergyRecovering: number,
  username: string
): Promise<
  | {
      status: boolean;
      result: any;
    }
  | undefined
> {
  if (totalEnergyRecovering > 0) {
    try {
      const payload = {
        account: "farmersworld",
        name: "recover",
        authorization: [{ actor: username, permission: "active" }],
        data: {
          energy_recovered: totalEnergyRecovering,
          owner: username,
        },
      };
      const response = await wax.api.transact({ actions: [payload] }, { blocksBehind: 3, expireSeconds: 1200 });
      if (response) return { status: true, result: response };
      else return { status: false, result: response };
    } catch (error: any) {
      return { status: false, result: error.message };
    }
  }
}

export async function actionRepair(
  asset_id: string,
  username: string
): Promise<{
  status: boolean;
  result: any;
}> {
  try {
    const payload = {
      account: "farmersworld",
      name: "repair",
      authorization: [{ actor: username, permission: "active" }],
      data: {
        asset_id: asset_id,
        owner: username,
      },
    };
    const response = await wax.api.transact({ actions: [payload] }, { blocksBehind: 3, expireSeconds: 1200 });
    if (response) return { status: true, result: response };
    else return { status: false, result: response };
  } catch (error: any) {
    return { status: false, result: error.message };
  }
}

export async function handleToolRepair(tool: Tools) {
  if ((tool.current_durability / tool.durability) * 100 <= settings.minDurability) {
    const res = await actionRepair(tool.asset_id, user.username!);
  }
}
