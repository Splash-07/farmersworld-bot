import { createSlice } from "@reduxjs/toolkit";
import { logger } from "../../utils/logger";

export interface SettingsState {
  minRepair: number;
  minEnergy: number;
  minFood: number;
  updateData: boolean;
  additionalTimer: number;
  repairIsDisabled: boolean;
  energyIsDisabled: boolean;
  loggerArray: string[];
  soundIsDisabled: boolean;
}
const initialState: SettingsState = {
  minRepair: 50,
  minEnergy: 200,
  minFood: 100,
  additionalTimer: 10000,
  repairIsDisabled: false,
  energyIsDisabled: false,
  loggerArray: [],
  soundIsDisabled: true,
  updateData: false,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleUpdateData: (state, { payload }) => {
      state.updateData = payload;
    },
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
    toggleSoundNotification: (state) => {
      const log = logger(
        `Sound notification has been <span style="color: #feebc8;"><strong>${
          !state.soundIsDisabled ? "disabled" : "enabled"
        }</strong></span>.`
      );
      state.soundIsDisabled = !state.soundIsDisabled;
      state.loggerArray.push(log);
    },
    pushLog: (state, { payload }) => {
      const log = logger(payload);
      state.loggerArray.push(log);
    },
  },
});

export const {
  toggleSoundNotification,
  setMinRepair,
  setMinEnergy,
  setMinFood,
  toggleUpdateData,
  toggleRepair,
  toggleEnergy,
  pushLog,
} = settingsSlice.actions;

export default settingsSlice.reducer;
