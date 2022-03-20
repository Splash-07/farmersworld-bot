import { ToolsResponse } from "./../types/data.types";
import { getAssetInfo } from "../store/data";
import { toggleUpdateFarm } from "../store/slices/settings.slice";
import { store } from "./../store/store";
import { wax } from "./wax";

const { user, settings } = store.getState();
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
): Promise<{
  status: boolean;
  result: any;
}> {
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

export async function handleNextAction(nextItem: ToolsResponse) {
  // If item is tool
  if (nextItem.asset_id) {
    // handle recourses
    await handleToolRepair(nextItem);
    await handleEnergyRestore();
    const response = await actionClaim(user.items.next!.asset_id, user.username!);
    if (response.status === true) {
      console.log("Claim action SUCCESS", response.result);
      store.dispatch(toggleUpdateFarm(true));
    } else {
      console.log("Claim action FAILED", response.result);
    }
  }
  // If item is mbs
}

export async function handleToolRepair(tool: ToolsResponse) {
  if ((tool.current_durability / tool.durability) * 100 <= settings.minDurability) {
    const res = await actionRepair(tool.asset_id, user.username!);
    if (res.status === true) {
      console.log(`Repaired ${getAssetInfo(tool.template_id.toString())?.name}`, res.result);
      store.dispatch(toggleUpdateFarm(true));
    } else {
      console.log(`Failed to repair ${getAssetInfo(tool.template_id.toString())?.name}`, res.result);
    }
  }
}
export async function handleEnergyRestore() {
  const acc = user.account;
  if (acc && acc.energy < settings.minEnergy) {
    let energyToRecover = acc.max_energy - acc.energy;
    if (acc.balances.food * 5 < energyToRecover) {
      energyToRecover = Math.floor(acc.balances.food * 5);
      if (energyToRecover > 0) {
        const res = await actionEnergyRecovery(energyToRecover, user.username!);
        if (res.status === true) {
          console.log(`Refilled energy ${energyToRecover}`, res.result);
          store.dispatch(toggleUpdateFarm(true));
        } else {
          console.log(`Failed to refill energy ${energyToRecover}`, res.result);
        }
      } else {
        console.log(`Dont enough food to restore energy`);
      }
    }
  }
}
