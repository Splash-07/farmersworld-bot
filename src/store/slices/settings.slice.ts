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

  feedChickenIsDisabled: boolean;
  feedDairyCowIsDisabled: boolean;
}
const initialState: SettingsState = {
  minRepair: 50,
  minEnergy: 200,
  minFood: 100,
  additionalTimer: 10000,
  loggerArray: [],
  updateData: false,
  repairIsDisabled: false,
  energyIsDisabled: false,

  feedChickenIsDisabled: true,
  feedDairyCowIsDisabled: true,
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

    toggleFeedDairyCows: (state) => {
      const log = logger(
        `Dairy cow feeding has been <span style="color: #feebc8;"><strong>${
          !state.feedDairyCowIsDisabled ? "disabled" : "enabled"
        }</strong></span>.`
      );
      state.feedDairyCowIsDisabled = !state.feedDairyCowIsDisabled;
      state.loggerArray.push(log);
    },
    toggleFeedChickens: (state) => {
      const log = logger(
        `Chicken feeding has been <span style="color: #feebc8;"><strong>${
          !state.feedChickenIsDisabled ? "disabled" : "enabled"
        }</strong></span>.`
      );
      state.feedChickenIsDisabled = !state.feedChickenIsDisabled;
      state.loggerArray.push(log);
    },

    pushLog: (state, { payload }) => {
      const log = logger(payload);
      state.loggerArray.push(log);
    },
  },
});

export const {
  setMinRepair,
  setMinEnergy,
  setMinFood,
  toggleUpdateData,
  toggleRepair,
  toggleEnergy,
  toggleFeedChickens,
  toggleFeedDairyCows,
  pushLog,
} = settingsSlice.actions;

export default settingsSlice.reducer;
