import * as waxjs from "@waxio/waxjs/dist";
import { JsonRpc } from "eosjs";
import { store } from "../store/store";
import { pushLog } from "../store/slices/settings.slice";
import { setUsername } from "../store/slices/user.slice";

const { currentEndpoint } = store.getState().endpoint;

const log = `Current RPC endpoint - <span style="color: #FEB2B2;"><strong>${currentEndpoint.url}</strong></span>`;
store.dispatch(pushLog(log));

export let rpc = new JsonRpc(currentEndpoint.url);
export let wax = new waxjs.WaxJS({
  rpcEndpoint: currentEndpoint.url,
  tryAutoLogin: false,
});

export async function handleEndpointManipulations(dispatchedAction: any) {
  store.dispatch(dispatchedAction);
  const { currentEndpoint } = store.getState().endpoint;

  rpc = new JsonRpc(currentEndpoint.url);
  wax = new waxjs.WaxJS({
    rpcEndpoint: currentEndpoint.url,
    tryAutoLogin: true,
  });
  await autoLogin();
  const log = `Endpoint has been changed to new one - <span style="color: #FEB2B2;"><strong>${currentEndpoint.url}</strong></span>`;
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
