import * as data from "../store/data";
import * as waxjs from "@waxio/waxjs/dist";
import { JsonRpc } from "eosjs";

const endpointNum = Math.floor(Math.random() * data.endpoints.length);
const defaultEndpoint = data.endpoints[endpointNum];
export let rpc = new JsonRpc(defaultEndpoint);

export let wax = new waxjs.WaxJS({
  rpcEndpoint: defaultEndpoint,
  tryAutoLogin: false,
});

export function selectEndpoint(newEndpoint: string): void {
  const endpoint = newEndpoint;
  rpc = new JsonRpc(endpoint);
  wax = new waxjs.WaxJS({
    rpcEndpoint: endpoint,

    tryAutoLogin: false,
  });
  localStorage.endpoint = endpoint;
  console.log(`Connected to new endpoint - ${endpoint}`);
}

export function changeEndpoint() {}
