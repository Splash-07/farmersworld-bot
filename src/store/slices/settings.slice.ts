import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  minDurability: number;
  minEnergy: number;
  minFood: number;
  updateFarm: boolean;
}

const initialState: UserState = {
  minDurability: 50,
  minEnergy: 200,
  minFood: 100,
  updateFarm: false,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setDurability: (state, { payload }) => {
      state.minDurability = payload;
    },
    setEnergy: (state, { payload }) => {
      state.minEnergy = payload;
    },
    setFood: (state, { payload }) => {
      state.minFood = payload;
    },
    toggleUpdateFarm: (state, { payload }) => {
      state.updateFarm = payload;
    },
  },
});

export const { setDurability, setEnergy, setFood, toggleUpdateFarm } = settingsSlice.actions;

export default settingsSlice.reducer;
