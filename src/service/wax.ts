import * as data from "../store/data";
import * as waxjs from "@waxio/waxjs/dist";
import { JsonRpc } from "eosjs";
import { store } from "../store/store";
import { pushLog } from "../store/slices/settings.slice";
import { handleLogin } from "../store/slices/user.slice";

let endpointNum = Math.floor(Math.random() * data.endpoints.length);
const defaultEndpoint = data.endpoints[endpointNum];
export let rpc = new JsonRpc(defaultEndpoint);
export let wax = new waxjs.WaxJS({
  rpcEndpoint: defaultEndpoint,
  tryAutoLogin: false,
});
// export function selectEndpoint(newEndpoint: string): void {
//   const endpoint = newEndpoint;
//   rpc = new JsonRpc(endpoint);
//   wax = new waxjs.WaxJS({
//     rpcEndpoint: endpoint,
//     tryAutoLogin: false,
//   });
//   localStorage.endpoint = endpoint;
//   console.log(`Connected to new endpoint - ${endpoint}`);
// }

export async function changeEndpoint() {
  const newEndpointNum = endpointNum + 1 > data.endpoints.length - 1 ? 0 : endpointNum++;
  const newEndpoint = data.endpoints[newEndpointNum];
  const endpoint = newEndpoint;
  rpc = new JsonRpc(endpoint);
  wax = new waxjs.WaxJS({
    rpcEndpoint: endpoint,
    tryAutoLogin: true,
  });
  await autoLogin();
  const log = `Failed to fetch some data. Endpoint has been changed to new one - ${endpoint}. Refetch in 4 seconds.`;
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
