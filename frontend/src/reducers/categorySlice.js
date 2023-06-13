import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  category: {},
};

const categoryDetailsSlice = createSlice({
  name: "categoryDetails",
  initialState,
  reducers: {
    viewCategoryRequest: (state) => {
      state.success = false;
      state.loading = true;
      state.error = false;
    },
    viewCategorySuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.categories = action.payload;
    },
    viewCategoryFail: (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = action.payload;
    },

    viewCategoryReset: (state) => {
      state.success = false;
      state.loading = false;
      state.categories = [];
    },

    addCategoryRequest: (state) => {
      state.addCategorySuccess = false;
      state.loading = true;
      state.error = false;
    },
    addCategorySuccess: (state) => {
      state.loading = false;
      state.addCategorySuccess = true;
    },
    addCategoryFail: (state, action) => {
      state.addCategorySuccess = false;
      state.loading = false;
      state.error = action.payload;
    },

    deleteCategoryRequest: (state) => {
      state.rSuccess = false;
      state.loading = true;
      state.error = false;
    },
    deleteCategorySuccess: (state, action) => {
      state.loading = false;
      state.rSuccess = true;
      state.categories = state.categories.filter(
        (item) => item._id !== action.payload
      );
    },
    deleteCategoryFail: (state, action) => {
      state.rSuccess = false;
      state.loading = false;
      state.error = action.payload;
    },

    deleteCategoryReset: (state) => {
      state.rSuccess = false;
      state.sloading = false;
      state.config = {};
    },

    viewSingleCategoryRequest: (state) => {
      state.ssuccess = false;
      state.sloading = true;
      state.serror = false;
    },
    viewSingleCategorySuccess: (state, action) => {
      state.sloading = false;
      state.ssuccess = true;
      state.category = action.payload;
    },
    viewSingleCategoryFail: (state, action) => {
      state.ssuccess = false;
      state.sloading = false;
      state.serror = action.payload;
    },
    viewSingleCategoryReset: (state) => {
      state.ssuccess = false;
      state.sloading = false;
      state.serror = false;
      state.categories = {};
      state.usuccess = false;
      state.uloading = false;
      state.uerror = false;
    },
    updateCategoryRequest: (state) => {
      state.usuccess = false;
      state.uloading = true;
      state.uerror = false;
    },
    updateCategorySuccess: (state, action) => {
      state.uloading = false;
      state.usuccess = true;
      state.categories = action.payload;
    },
    updateCategoryFail: (state, action) => {
      state.usuccess = false;
      state.uloading = false;
      state.uerror = action.payload;
    },
  },
});

export const {
  viewCategoryRequest,
  viewCategorySuccess,
  viewCategoryFail,
  viewCategoryReset,

  addCategoryRequest,
  addCategorySuccess,
  addCategoryFail,

  deleteCategoryRequest,
  deleteCategorySuccess,
  deleteCategoryFail,
  deleteCategoryReset,

  viewSingleCategoryRequest,
  viewSingleCategorySuccess,
  viewSingleCategoryFail,
  viewSingleCategoryReset,

  updateCategoryRequest,
  updateCategorySuccess,
  updateCategoryFail,
} = categoryDetailsSlice.actions;
export default categoryDetailsSlice.reducer;
