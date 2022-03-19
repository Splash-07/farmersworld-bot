import { Tools, Account } from "./../../types/data.types";
import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  minDurability: number;
  minEnergy: number;
  minFood: number;
}

const initialState: UserState = {
  minDurability: 50,
  minEnergy: 200,
  minFood: 100,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    changeDurability: (state, { payload }) => {
      state.minDurability = payload;
    },
    changeEnergy: (state, { payload }) => {
      state.minEnergy = payload;
    },
    changeFood: (state, { payload }) => {
      state.minFood = payload;
    },
  },
});

export const { changeDurability, changeEnergy, changeFood } = settingsSlice.actions;

export default settingsSlice.reducer;
