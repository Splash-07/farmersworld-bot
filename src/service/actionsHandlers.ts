import { Resources } from "./../types/data.types";
import { isAnimal, isMbs, isTool } from "../types/data.typeguards";
import { assetMap } from "../store/data";
import { pushLog, SettingsState } from "../store/slices/settings.slice";
import { store } from "../store/store";
import { handleEndpointManipulations, wax } from "./wax";
import { UserState } from "../store/slices/user.slice";
import { sleep } from "../utils/timers";
import { AnimalsResponse, ToolsResponse } from "../types/data.types";
import { swapEndpoint } from "../store/slices/endpoint.slice";

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
    const response = await wax.api.transact(
      { actions: [payload] },
      { blocksBehind: 3, expireSeconds: 1200 }
    );
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
    const response = await wax.api.transact(
      { actions: [payload] },
      { blocksBehind: 3, expireSeconds: 1200 }
    );
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
    const response = await wax.api.transact(
      { actions: [payload] },
      { blocksBehind: 3, expireSeconds: 1200 }
    );
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
    const response = await wax.api.transact(
      { actions: [payload] },
      { blocksBehind: 3, expireSeconds: 1200 }
    );
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
    const response = await wax.api.transact(
      { actions: [payload] },
      { blocksBehind: 3, expireSeconds: 1200 }
    );
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
    const response = await wax.api.transact(
      { actions: [payload] },
      { blocksBehind: 3, expireSeconds: 1200 }
    );
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
    const response = await wax.api.transact(
      { actions: [payload] },
      { blocksBehind: 3, expireSeconds: 1200 }
    );
    if (response) return { status: true, result: response };
    else return { status: false, result: response };
  } catch (error: any) {
    return { status: false, result: error.message };
  }
}
export async function handleAnimals(
  nextItem: AnimalsResponse,
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
export async function handleNextAction(
  user: UserState,
  settings: SettingsState
) {
  const username = user.username!;
  const nextItem = user.items.next!;
  const accountResources = user.resources!;

  if ("current_durability" in nextItem) {
    await handleToolRepair(username, nextItem, settings);
  }
  await handleEnergyRestore(username, accountResources, settings);

  let response;
  if (isTool(nextItem))
    response = await actionClaimTool(nextItem.asset_id, username);
  else if (isMbs(nextItem))
    response = await actionClaimMembership(nextItem.asset_id, username);
  else if (isAnimal(nextItem)) response = await handleAnimals(nextItem, user);
  else response = await actionClaimCrop(nextItem.asset_id, username);

  if (response?.status === true) {
    const log = `<span style="color: #38A169;">Successfully</span> claimed <span style="color: #feebc8;"><strong>${
      assetMap.get(nextItem!.template_id)?.name
    }</strong></span>.`;
    store.dispatch(pushLog(log));
  } else {
    const log = `<span style="color: #E53E3E;">Failed</span> to claim <span style="color: #feebc8;"><strong>${
      assetMap.get(nextItem!.template_id)?.name
    }</strong></span>. (${response?.result})`;
    store.dispatch(pushLog(log));

    if (response.result.includes("Failed to fetch")) {
      await handleEndpointManipulations(swapEndpoint, "SWAP");
    }

    console.log("Claim action FAILED", response?.result);
  }
}

export async function handleToolRepair(
  username: string,
  nextTool: ToolsResponse,
  settings: SettingsState
) {
  if (
    !settings.repairIsDisabled &&
    (nextTool.current_durability / nextTool.durability) * 100 <=
      settings.minRepair
  ) {
    const res = await actionRepair(nextTool.asset_id, username!);
    if (res.status === true) {
      const log = `<span style="color: #38A169;">Successfully</span> repaired <span style="color: #feebc8;"><strong>${
        assetMap.get(nextTool.template_id)?.name
      }</strong></span>.`;
      store.dispatch(pushLog(log));
      await sleep(2000);
    } else {
      const log = `<span style="color: #E53E3E;">Failed</span> to repair <span style="color: #feebc8;"><strong>${
        assetMap.get(nextTool.template_id)?.name
      }</strong></span>. (${res.result})`;
      store.dispatch(pushLog(log));
      console.log(
        `Failed to repair ${assetMap.get(nextTool.template_id)?.name}`,
        res.result
      );
    }
  }
}
export async function handleEnergyRestore(
  username: string,
  resources: Resources,
  settings: SettingsState
) {
  if (
    resources &&
    !settings.energyIsDisabled &&
    resources.energy <= settings.minEnergy
  ) {
    let energyToRecover = resources.max_energy - resources.energy;
    if (resources.balances.food * 5 < energyToRecover) {
      energyToRecover = Math.floor(resources.balances.food * 5);
    }
    if (energyToRecover > 0) {
      const res = await actionEnergyRecovery(energyToRecover, username);
      if (res.status === true) {
        const log = `<span style="color: #38A169;">Successfully</span> recovered <span style="color: #feebc8;"><strong>${energyToRecover}</strong></span> amount of <span style="color: #feebc8;"><strong>energy</strong></span>.`;
        store.dispatch(pushLog(log));
        await sleep(2000);
      } else {
        const log = `<span style="color: #E53E3E;">Failed</span> to recover <span style="color: #feebc8;"><strong>energy</strong></span>. (${res.result})`;
        console.log(`Failed to refill energy ${energyToRecover}`, res.result);
        store.dispatch(pushLog(log));
      }
    } else {
      const log = `<span style="color: #E53E3E;">Failed</span> to recover <span style="color: #feebc8;"><strong>energy</strong></span>. Dont have enough food.`;
      store.dispatch(pushLog(log));
    }
  }
}
