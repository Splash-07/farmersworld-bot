import * as waxjs from "@waxio/waxjs/dist";
import { JsonRpc } from "eosjs";
import { store } from "../store/store";
import { pushLog } from "../store/slices/settings.slice";
import { setUsername } from "../store/slices/data.slice";
import { Endpoint } from "../store/slices/endpoint.slice";

export let rpc = new JsonRpc("");
export let wax = new waxjs.WaxJS({
  rpcEndpoint: "",
  tryAutoLogin: false,
});

export async function waxInit(endpoint: Endpoint) {
  rpc = new JsonRpc(endpoint.url);
  wax = new waxjs.WaxJS({
    rpcEndpoint: endpoint.url,
    tryAutoLogin: false,
  });

  await login();

  const log = `Current RPC endpoint - <span style="color: #FEB2B2;"><strong>${endpoint.url}</strong></span>`;
  store.dispatch(pushLog(log));
}

export async function handleEndpointManipulations(
  dispatchedAction: any,
  actionType: "SWAP" | "CHANGE" | "ADD" | "DELETE" | "TOGGLE",
  target?: {
    endpoint: Endpoint;
    index: number;
  }
) {
  const endpointsArray = store.getState().endpoint.endpointsArray;
  const selectedRPCEndpoint = store.getState().endpoint.currentEndpoint;
  const activeServersQuantity = endpointsArray.filter(
    (endpoint) => endpoint.status === true
  ).length;

  if (
    target?.endpoint.url === selectedRPCEndpoint.url &&
    activeServersQuantity === 1
  ) {
    return alert(
      "You cant perform status TOGGLE or DELETE action on last active endpoint"
    );
  }

  switch (actionType) {
    case "CHANGE":
      store.dispatch(dispatchedAction(target));
      await signinNewRPCServerAndWaxLogin();
      break;
    case "SWAP":
      store.dispatch(dispatchedAction());
      await signinNewRPCServerAndWaxLogin();
      break;
    case "ADD":
      store.dispatch(dispatchedAction(target));
      break;
    case "DELETE":
      store.dispatch(dispatchedAction(target));
      if (target?.endpoint.url === selectedRPCEndpoint.url) {
        await signinNewRPCServerAndWaxLogin();
      }
      break;
    case "TOGGLE":
      store.dispatch(dispatchedAction(target));
      if (target?.endpoint.url === selectedRPCEndpoint.url) {
        await signinNewRPCServerAndWaxLogin();
      }
      break;
  }
}

export async function signinNewRPCServerAndWaxLogin() {
  const newEndpoint = store.getState().endpoint.currentEndpoint;
  rpc = new JsonRpc(newEndpoint.url);
  wax = new waxjs.WaxJS({
    rpcEndpoint: newEndpoint.url,
    tryAutoLogin: true,
  });

  await autoLogin();
  const log = `Endpoint has been changed to new one - <span style="color: #FEB2B2;"><strong>${newEndpoint.url}</strong></span>`;
  store.dispatch(pushLog(log));
}

export async function autoLogin() {
  let isAutoLoginAvailable = await wax.isAutoLoginAvailable();
  if (isAutoLoginAvailable) {
    await login();
  }
}
export async function login() {
  try {
    const username = await wax.login();
    store.dispatch(setUsername(username));
  } catch (error) {}
}
