import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stats: {},
};

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    viewStatsRequest: (state) => {
      state.success = false;
      state.loading = true;
      state.error = false;
    },
    viewStatsSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.stats = action.payload;
    },
    viewStatsFail: (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { viewStatsRequest, viewStatsSuccess, viewStatsFail } =
statsSlice.actions;
export default statsSlice.reducer;
