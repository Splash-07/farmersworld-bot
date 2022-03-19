import { Tools, Account } from "./../../types/data.types";
import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  username: string | null;
  account?: Account;
  tools: {
    list?: Tools[];
    next?: Tools;
    timer_to_action?: number;
  };
}

const initialState: UserState = {
  username: null,
  account: undefined,
  tools: {
    list: undefined,
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
    getAccount: (state, { payload }) => {
      state.account = payload[0];
    },
    getTools: (state, { payload }) => {
      state.tools.list = payload;
    },
    getMbs: (state, { payload }) => {
      state.tools.list = payload;
    },
    getNextTool: (state, { payload }) => {
      state.tools.next = payload.item;
      state.tools.timer_to_action = payload.timer;
    },
  },
});

export const { login, getAccount, getTools, getNextTool } = userSlice.actions;

export default userSlice.reducer;
