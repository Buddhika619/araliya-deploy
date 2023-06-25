import { createSlice } from "@reduxjs/toolkit";

const initialState = {

  matrial: {}
};

const materialUpdateSlice = createSlice({
  name: "updateMaterial",
  initialState,
  reducers: {
   

    updateMatrialsRequest: (state) => {
        state.success = false;
        state.loading = true;
        state.error = false;
      },
      updateMatrialsSuccess: (state, action) => {
        state.loading = false;
        state.success = true;
        state.matrial = action.payload;
      },
      updateMatrialsFail: (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.payload;
      },
    updateMaterialsReset: (state, action) => {
        state.success = false;
        state.loading = false;
      },
  },
});

export const {
  

    updateMatrialsRequest,
    updateMatrialsSuccess,
  updateMatrialsFail,
  updateMaterialsReset

} = materialUpdateSlice.actions;
export default materialUpdateSlice.reducer;
