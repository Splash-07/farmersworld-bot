import * as waxjs from "@waxio/waxjs/dist";
import { JsonRpc } from "eosjs";
import { store } from "../store/store";
import { pushLog, setCurrentServer } from "../store/slices/settings.slice";
import { handleLogin } from "../store/slices/user.slice";

const endpoints: string[] = [
  "https://chain.wax.io",
  // "https://wax.pink.gg",
  // "https://api.waxsweden.org",
  "https://wax.eosphere.io",
  // "https://wax.cryptolions.io",
  // "https://wax.dapplica.io",
];

let endpointNum = Math.floor(Math.random() * endpoints.length);
const defaultEndpoint = endpoints[endpointNum];
const log = `Current RPC endpoint - <span style="color: #FEB2B2;"><strong>${defaultEndpoint}</strong></span>`;
store.dispatch(setCurrentServer(defaultEndpoint));
store.dispatch(pushLog(log));

export let rpc = new JsonRpc(defaultEndpoint);
export let wax = new waxjs.WaxJS({
  rpcEndpoint: defaultEndpoint,
  tryAutoLogin: false,
});

export async function changeEndpoint() {
  endpointNum = endpointNum + 1 >= endpoints.length ? 0 : endpointNum + 1;
  const newEndpoint = endpoints[endpointNum];
  const endpoint = newEndpoint;
  rpc = new JsonRpc(endpoint);
  wax = new waxjs.WaxJS({
    rpcEndpoint: endpoint,
    tryAutoLogin: true,
  });
  await autoLogin();
  const log = `Failed to fetch some data. Endpoint has been changed to new one - <span style="color: #FEB2B2;"><strong>${endpoint}</strong></span>`;
  store.dispatch(setCurrentServer(endpoint));
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
    store.dispatch(handleLogin(username));
  } catch (error) {}
}
