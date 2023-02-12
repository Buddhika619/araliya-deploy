import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  matrials: {},
};

const orderDetailsSlice = createSlice({
  name: "matrialsDetails",
  initialState,
  reducers: {
    viewMatrialsRequest: (state) => {
      state.success = false;
      state.loading = true;
      state.error = false;
    },
    viewMatrialsSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.matrials = action.payload;
    },
    viewMatrialsFail: (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = action.payload;
    },

    viewMatrialsReset: (state, action) => {
      state.success = false;
      state.loading = false;
      state.matrials = {};
    },
  },
});

export const {
  viewMatrialsRequest,
  viewMatrialsSuccess,
  viewMatrialsFail,
  viewMatrialsReset,
} = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
