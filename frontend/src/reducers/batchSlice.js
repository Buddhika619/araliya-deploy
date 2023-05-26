import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  batches: [],
  batch: {}
};

const batchDetailsSlice = createSlice({
  name: "batchDetails",
  initialState,
  reducers: {
    viewBatchesRequest: (state) => {
      state.success = false;
      state.loading = true;
      state.error = false;
    },
    viewBatchesSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.batches = action.payload;
    },
    viewBatchesFail: (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = action.payload;
    },

    viewBatchesReset: (state) => {
      state.success = false;
      state.loading = false;
      state.batches = [];
      state.batch= {}
    },

    addBatchesRequest: (state) => {
      state.success = false;
      state.loading = true;
      state.error = false;
    },
    addBatchesSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    addBatchesFail: (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = action.payload;
    },

    deleteBatchesRequest: (state) => {
      state.rSuccess = false;
      state.loading = true;
      state.error = false;
    },
    deleteBatchesSuccess: (state, action) => {
      state.loading = false;
      state.rSuccess = true;
      state.batches = state.batches.filter(
        (item) => item._id !== action.payload
      );
    },
    deleteBatchesFail: (state, action) => {
      state.rSuccess = false;
      state.loading = false;
      state.error = action.payload;
    },

    deleteBatchesReset: (state) => {
      state.rSuccess = false;
      state.sloading = false;
      state.config = {};
    },

    viewSingleBatchesRequest: (state) => {
      state.ssuccess = false;
      state.sloading = true;
      state.serror = false;
    },
    viewSingleBatchesSuccess: (state, action) => {
      state.sloading = false;
      state.ssuccess = true;
      state.batch = action.payload;
    },
    viewSingleBatchesFail: (state, action) => {
      state.ssuccess = false;
      state.sloading = false;
      state.serror = action.payload;
    },


    updateBatchesRequest: (state) => {
      state.ssuccess = false;
      state.sloading = true;
      state.serror = false;
    },
    updateBatchesSuccess: (state, action) => {
      state.sloading = false;
      state.ssuccess = true;
      state.batch = action.payload;
    },
    updateBatchesFail: (state, action) => {
      state.ssuccess = false;
      state.sloading = false;
      state.serror = action.payload;
    },
  },
});

export const {
  viewBatchesRequest,
  viewBatchesSuccess,
  viewBatchesFail,
  viewBatchesReset,

  addBatchesRequest,
  addBatchesSuccess,
  addBatchesFail,

  deleteBatchesRequest,
  deleteBatchesSuccess,
  deleteBatchesFail,
  deleteBatchesReset,

  viewSingleBatchesRequest,
  viewSingleBatchesSuccess,
  viewSingleBatchesFail,

  updateBatchesRequest,
  updateBatchesSuccess,
  updateBatchesFail


} = batchDetailsSlice.actions;
export default batchDetailsSlice.reducer;
