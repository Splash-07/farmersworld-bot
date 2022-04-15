import { NextAnimalItem } from "./../types/data.types";
import { isAnimal, isMbs, isTool } from "./../types/data.typeguards";
import { assetMap } from "./../store/data";
import { pushLog, SettingsState } from "../store/slices/settings.slice";
import { store } from "./../store/store";
import { changeEndpoint, wax } from "./wax";
import { UserState } from "../store/slices/user.slice";
import { sleep } from "../utils/timers";

export async function actionClaimTool(
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
        asset_id,
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
  asset_id: string,
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

export async function actionClaimCrop(
  asset_id: string,
  username: string
): Promise<{
  status: boolean;
  result: any;
}> {
  try {
    const payload = {
      account: "farmersworld",
      name: "cropclaim",
      authorization: [{ actor: username, permission: "active" }],
      data: {
        crop_id: asset_id,
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
export async function actionFeedAnimal(
  asset_id: string,
  username: string,
  food_id: string
): Promise<{
  status: boolean;
  result: any;
}> {
  try {
    const payload = {
      account: "atomicassets",
      name: "transfer",
      authorization: [{ actor: username, permission: "active" }],
      data: {
        asset_ids: [food_id],
        from: username,
        memo: "feed_animal:" + asset_id,
        to: "farmersworld",
      },
    };
    const response = await wax.api.transact({ actions: [payload] }, { blocksBehind: 3, expireSeconds: 1200 });
    if (response) return { status: true, result: response };
    else return { status: false, result: response };
  } catch (error: any) {
    return { status: false, result: error.message };
  }
}
export async function actionHatchEggs(
  asset_id: string,
  username: string
): Promise<{
  status: boolean;
  result: any;
}> {
  try {
    const payload = {
      account: "farmersworld",
      name: "anmclaim",
      authorization: [{ actor: username, permission: "active" }],
      data: {
        animal_id: asset_id,
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
        asset_owner: username,
      },
    };
    const response = await wax.api.transact({ actions: [payload] }, { blocksBehind: 3, expireSeconds: 1200 });
    if (response) return { status: true, result: response };
    else return { status: false, result: response };
  } catch (error: any) {
    return { status: false, result: error.message };
  }
}
export async function handleAnimals(
  nextItem: NextAnimalItem,
  user: UserState
): Promise<{
  status: boolean;
  result: any;
}> {
  const { username, items } = user;
  const { assetsInStash } = items;
  const { template_id, asset_id } = nextItem;

  let response;
  //  hatch eggs
  if (template_id === 298612) {
    response = await actionHatchEggs(asset_id, username!);
  } else {
    let food_id;
    // if baby calf
    if (template_id === 298597) {
      food_id = assetsInStash.milk[0];
    } else {
      food_id = assetsInStash.barley[0];
    }
    response = await actionFeedAnimal(asset_id, username!, food_id);
  }
  return response;
}
export async function handleNextAction(user: UserState, settings: SettingsState) {
  const nextItem = user.items.next!;
  await handleToolRepair(user, settings);
  await handleEnergyRestore(user, settings);
  let response;
  console.log(nextItem.asset_id);
  if (isTool(nextItem)) response = await actionClaimTool(nextItem.asset_id, user.username!);
  else if (isMbs(nextItem)) response = await actionClaimMembership(nextItem.asset_id, user.username!);
  else if (isAnimal(nextItem)) response = await handleAnimals(nextItem, user);
  else response = await actionClaimCrop(nextItem.asset_id, user.username!);

  if (response?.status === true) {
    const log = `<span style="color: #38A169;">Successfully</span> claimed <span style="color: #feebc8;"><strong>${
      assetMap.get(nextItem!.template_id)?.name
    }</strong></span> (asset id: ${nextItem.asset_id}).`;
    store.dispatch(pushLog(log));
  } else {
    const log = `<span style="color: #E53E3E;">Failed</span> to claim <span style="color: #feebc8;"><strong>${
      assetMap.get(nextItem!.template_id)?.name
    }</strong></span> (asset id: ${nextItem.asset_id}). (${response?.result})`;
    store.dispatch(pushLog(log));

    if (response.result.includes("Failed to fetch")) changeEndpoint();

    console.log("Claim action FAILED", response?.result);
  }
}

export async function handleToolRepair(user: UserState, settings: SettingsState) {
  const tool = user.items.next!;
  if (!("current_durability" in tool)) return;
  if (!settings.repairIsDisabled && (tool.current_durability / tool.durability) * 100 <= settings.minRepair) {
    const res = await actionRepair(tool.asset_id, user.username!);
    if (res.status === true) {
      const log = `<span style="color: #38A169;">Successfully</span> repaired <span style="color: #feebc8;"><strong>${
        assetMap.get(tool.template_id)?.name
      }</strong></span> (asset id: ${tool.asset_id}).`;
      store.dispatch(pushLog(log));
      await sleep(2000);
    } else {
      const log = `<span style="color: #E53E3E;">Failed</span> to repair <span style="color: #feebc8;"><strong>${
        assetMap.get(tool.template_id)?.name
      }</strong></span> (asset id: ${tool.asset_id}). (${res.result})`;
      store.dispatch(pushLog(log));
      console.log(`Failed to repair ${assetMap.get(tool.template_id)?.name}`, res.result);
    }
  }
}
export async function handleEnergyRestore(user: UserState, settings: SettingsState) {
  const acc = user.resources;
  if (acc && !settings.energyIsDisabled && acc.energy <= settings.minEnergy) {
    let energyToRecover = acc.max_energy - acc.energy;
    if (acc.balances.food * 5 < energyToRecover) {
      energyToRecover = Math.floor(acc.balances.food * 5);
    }
    if (energyToRecover > 0) {
      const res = await actionEnergyRecovery(energyToRecover, user.username!);
      if (res.status === true) {
        const log = `<span style="color: #38A169;">Successfully</span> recovered <span style="color: #feebc8;"><strong>${energyToRecover}</strong></span> amount of <span style="color: #feebc8;"><strong>energy</strong></span>.`;
        store.dispatch(pushLog(log));
        await sleep(2000);
      } else {
        const log = `<span style="color: #E53E3E;">Failed</span> to recover <span style="color: #feebc8;"><strong>energy</strong></span>. (${res.result})`;
        store.dispatch(pushLog(log));
        console.log(`Failed to refill energy ${energyToRecover}`, res.result);
      }
    } else {
      const log = `<span style="color: #E53E3E;">Failed</span> to recover <span style="color: #feebc8;"><strong>energy</strong></span>. Dont have enough food.`;
      store.dispatch(pushLog(log));
    }
  }
}
