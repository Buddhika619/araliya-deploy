import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  batches: [],
  batch: {}
};

const batchUpdateSlice = createSlice({
  name: "updateBatch",
  initialState,
  reducers: {
   

    updateBatchesRequest: (state) => {
      state.success = false;
      state.loading = true;
      state.error = false;
    },
    updateBatchesSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.batch = action.payload;
    },
    updateBatchesFail: (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = action.payload;
    },
    updateBatchesReset: (state, action) => {
        state.success = false;
        state.loading = false;
      },
  },
});

export const {
  

  updateBatchesRequest,
  updateBatchesSuccess,
  updateBatchesFail,
  updateBatchesReset

} = batchUpdateSlice.actions;
export default batchUpdateSlice.reducer;
