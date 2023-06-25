import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  matrials: [],
  matrial: {}
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

    viewMatrialsReset: (state) => {
      state.success = false;
      state.loading = false;
      state.error =false;
      state.ssuccess = false;
      state.sloading = false;
      state.serror = false;
      state.matrials = [];
    },

    addMatrialsRequest: (state) => {
      state.success = false;
      state.loading = true;
      state.error = false;
    },
    addMatrialsSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    addMatrialsFail: (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = action.payload;
    },

    deleteMatrialsRequest: (state) => {
      state.rSuccess = false;
      state.loading = true;
      state.error = false;
    },
    deleteMatrialsSuccess: (state, action) => {
      state.loading = false;
      state.rSuccess = true;
      state.matrials = state.matrials.filter(
        (item) => item._id !== action.payload
      );
    },
    deleteMatrialsFail: (state, action) => {
      state.rSuccess = false;
      state.loading = false;
      state.error = action.payload;
    },

    deleteMatrialsReset: (state) => {
      state.rSuccess = false;
      state.sloading = false;
      state.config = {};
    },

    viewSingleMatrialsRequest: (state) => {
      state.ssuccess = false;
      state.sloading = true;
      state.serror = false;
    },
    viewSingleMatrialsSuccess: (state, action) => {
      state.sloading = false;
      state.ssuccess = true;
      state.matrial = action.payload;
    },
    viewSingleMatrialsFail: (state, action) => {
      state.ssuccess = false;
      state.sloading = false;
      state.serror = action.payload;
    },



  },
});

export const {
  viewMatrialsRequest,
  viewMatrialsSuccess,
  viewMatrialsFail,
  viewMatrialsReset,

  addMatrialsRequest,
  addMatrialsSuccess,
  addMatrialsFail,

  deleteMatrialsRequest,
  deleteMatrialsSuccess,
  deleteMatrialsFail,
  deleteMatrialsReset,

  viewSingleMatrialsRequest,
  viewSingleMatrialsSuccess,
  viewSingleMatrialsFail,




} = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
