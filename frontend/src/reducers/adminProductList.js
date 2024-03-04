import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  products: [],

}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
 
    adminProductListRequest: (state) => {
      state.loading = true
      state.error = false
      state.success = false
    },
    adminProductListSuccess: (state, action) => {
      state.error = false
      state.loading = false
      state.success = true
      state.products = action.payload
    },
    adminProductListFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    adminProductListReset: (state, action) => {
      state.error = false
      state.loading = false
      state.success = false
      state.products = []
    }
  },
})

export const {

  adminProductListRequest,
  adminProductListSuccess,
  adminProductListFail,
  adminProductListReset
} = productSlice.actions
export default productSlice.reducer
