import { createSlice } from "@reduxjs/toolkit";
import { logger } from "../../utils/logger";

export interface UserState {
  minRepair: number;
  minEnergy: number;
  minFood: number;
  updateFarm: boolean;
  additionalTimer: number;
  repairIsDisabled: boolean;
  energyIsDisabled: boolean;
  loggerArray: string[];
}

const initialState: UserState = {
  minRepair: 50,
  minEnergy: 200,
  minFood: 100,
  updateFarm: false,
  additionalTimer: 10000,
  repairIsDisabled: false,
  energyIsDisabled: false,
  loggerArray: [],
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setMinRepair: (state, { payload }) => {
      const log = logger(
        `Repair minimal value has been changed. New value = <span style="color: #feebc8;"><strong>${payload}%</strong></span>.`
      );
      state.minRepair = payload;
      state.loggerArray.push(log);
    },
    setMinEnergy: (state, { payload }) => {
      const log = logger(
        `Energy restore minimal value has been changed. New value = <span style="color: #feebc8;"><strong>${payload}</strong></span>.`
      );
      state.minEnergy = payload;
      state.loggerArray.push(log);
    },
    setMinFood: (state, { payload }) => {
      state.minFood = payload;
    },
    toggleUpdateFarm: (state, { payload }) => {
      state.updateFarm = payload;
    },
    toggleRepair: (state) => {
      const log = logger(
        `Repair has been <span style="color: #feebc8;"><strong>${
          !state.repairIsDisabled ? "disabled" : "enabled"
        }</strong></span>.`
      );
      state.repairIsDisabled = !state.repairIsDisabled;
      state.loggerArray.push(log);
    },
    toggleEnergy: (state) => {
      const log = logger(
        `Energy restore has been <span style="color: #feebc8;"><strong>${
          !state.repairIsDisabled ? "disabled" : "enabled"
        }</strong></span>.`
      );
      state.energyIsDisabled = !state.energyIsDisabled;
      state.loggerArray.push(log);
    },
    pushLog: (state, { payload }) => {
      const log = logger(payload);
      state.loggerArray.push(log);
    },
  },
});

export const { setMinRepair, setMinEnergy, setMinFood, toggleUpdateFarm, toggleRepair, toggleEnergy, pushLog } =
  settingsSlice.actions;

export default settingsSlice.reducer;
