import { createSlice } from "@reduxjs/toolkit";
import { logger } from "../../utils/logger";

export interface SettingsState {
  minRepair: number;
  minEnergy: number;
  minFood: number;
  loggerArray: string[];
  updateData: boolean;
  triggerNextAction: boolean;
  repairIsDisabled: boolean;
  energyIsDisabled: boolean;
  feedChickenIsDisabled: boolean;
  feedDairyCowIsDisabled: boolean;
  mbsStoreIsDisabled: boolean;
}
const initialState: SettingsState = {
  minRepair: 50,
  minEnergy: 200,
  minFood: 100,
  loggerArray: [],
  updateData: false,
  triggerNextAction: false,

  repairIsDisabled: false,
  energyIsDisabled: false,
  mbsStoreIsDisabled: false,

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
          !state.energyIsDisabled ? "disabled" : "enabled"
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
    toggleMbsStore: (state) => {
      const log = logger(
        `Membership cards storing <span style="color: #feebc8;"><strong>${
          !state.mbsStoreIsDisabled ? "disabled" : "enabled"
        }</strong></span>.`
      );
      state.mbsStoreIsDisabled = !state.mbsStoreIsDisabled;
      state.loggerArray.push(log);
    },
    triggerNextAction: (state, { payload }) => {
      state.triggerNextAction = payload;
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
  triggerNextAction,
  toggleRepair,
  toggleEnergy,
  toggleFeedChickens,
  toggleFeedDairyCows,
  toggleMbsStore,
  pushLog,
} = settingsSlice.actions;

export default settingsSlice.reducer;
