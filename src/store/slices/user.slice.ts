import { Account, AccountResponse, MbsResponse, ToolsResponse } from "./../../types/data.types";
import { createSlice } from "@reduxjs/toolkit";
import { findLowestCD } from "../../utils/timers";

export interface UserState {
  username: string | null;
  account?: Account;
  items: {
    toolsList: ToolsResponse[];
    mbsList: MbsResponse[];
    next?: ToolsResponse | MbsResponse;
    timer_to_action?: number;
  };
}

const initialState: UserState = {
  username: null,
  account: undefined,
  items: {
    toolsList: [],
    mbsList: [],
    next: undefined,
    timer_to_action: undefined,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.username = payload;
    },
    setAccount: (state, { payload }: { payload: AccountResponse[] }) => {
      const firstObj = payload[0];
      state.account = {
        account: firstObj.account,
        balances: {
          wood: parseFloat(firstObj.balances[0].split(" ")[0]),
          gold: parseFloat(firstObj.balances[1].split(" ")[0]),
          food: parseFloat(firstObj.balances[2].split(" ")[0]),
        },
        energy: firstObj.energy,
        last_mine_tx: firstObj.last_mine_tx,
        max_energy: firstObj.max_energy,
      };
    },
    setTools: (state, { payload }) => {
      state.items.toolsList = payload;
    },
    setMbs: (state, { payload }) => {
      state.items.mbsList = payload;
    },
    setNextAction: (state) => {
      const lowCdItem = findLowestCD(state.items.toolsList, state.items.mbsList);
      state.items.next = lowCdItem.item;
      state.items.timer_to_action = lowCdItem.timer;
    },
  },
});

export const { login, setAccount, setTools, setMbs, setNextAction } = userSlice.actions;

export default userSlice.reducer;
