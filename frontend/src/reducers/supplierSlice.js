import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  suppliers: [],
  supplier: {},
};

const suplierDetailsSlice = createSlice({
  name: "supplierDetails",
  initialState,
  reducers: {
    viewSupplierRequest: (state) => {
      state.success = false;
      state.loading = true;
      state.error = false;
    },
    viewSupplierSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.suppliers = action.payload;
    },
    viewSupplierFail: (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = action.payload;
    },

    viewSupplierReset: (state) => {
      state.success = false;
      state.loading = false;
      state.suppliers = [];
    },

    addSupplierRequest: (state) => {
      state.success = false;
      state.loading = true;
      state.error = false;
    },
    addSupplierSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    addSupplierFail: (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = action.payload;
    },

    deleteSupplierRequest: (state) => {
      state.rSuccess = false;
      state.loading = true;
      state.error = false;
    },
    deleteSupplierSuccess: (state, action) => {
      state.loading = false;
      state.rSuccess = true;
      state.suppliers = state.suppliers.filter(
        (item) => item._id !== action.payload
      );
    },
    deleteSupplierFail: (state, action) => {
      state.rSuccess = false;
      state.loading = false;
      state.error = action.payload;
    },

    deleteSupplierReset: (state) => {
      state.rSuccess = false;
      state.sloading = false;
      state.config = {};
    },

    viewSingleSupplierRequest: (state) => {
      state.ssuccess = false;
      state.sloading = true;
      state.serror = false;
    },
    viewSingleSupplierSuccess: (state, action) => {
      state.sloading = false;
      state.ssuccess = true;
      state.suppliers = action.payload;
    },
    viewSingleSupplierFail: (state, action) => {
      state.ssuccess = false;
      state.sloading = false;
      state.serror = action.payload;
    },
    viewSingleSupplierReset: (state) => {
      state.ssuccess = false;
      state.sloading = false;
      state.serror = false;
      state.suppliers = {};
      state.usuccess = false;
      state.uloading = false;
      state.uerror = false;
    },
    updateSupplierRequest: (state) => {
      state.usuccess = false;
      state.uloading = true;
      state.uerror = false;
    },
    updateSupplierSuccess: (state, action) => {
      state.uloading = false;
      state.usuccess = true;
      state.supplier = action.payload;
    },
    updateSupplierFail: (state, action) => {
      state.usuccess = false;
      state.uloading = false;
      state.uerror = action.payload;
    },
  },
});

export const {
  viewSupplierRequest,
  viewSupplierSuccess,
  viewSupplierFail,
  viewSupplierReset,

  addSupplierRequest,
  addSupplierSuccess,
  addSupplierFail,

  deleteSupplierRequest,
  deleteSupplierSuccess,
  deleteSupplierFail,
  deleteSupplierReset,

  viewSingleSupplierRequest,
  viewSingleSupplierSuccess,
  viewSingleSupplierFail,
  viewSingleSupplierReset,

  updateSupplierRequest,
  updateSupplierSuccess,
  updateSupplierFail,
} = suplierDetailsSlice.actions;
export default suplierDetailsSlice.reducer;
