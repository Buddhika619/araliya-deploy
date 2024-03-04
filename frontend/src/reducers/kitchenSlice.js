import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  batches: [],
  batch: {},
};

const batchDetailsSlice = createSlice({
  name: "batchDetails",
  initialState,
  reducers: {
    viewKitchenRequest: (state) => {
      state.success = false;
      state.loading = true;
      state.error = false;
    },
    viewKitchenSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.kitchenList = action.payload;
    },
    viewKitchenFail: (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { viewKitchenRequest, viewKitchenSuccess, viewKitchenFail } =
  batchDetailsSlice.actions;
export default batchDetailsSlice.reducer;
