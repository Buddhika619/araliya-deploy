import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  products: [],
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    productListRequest: (state) => {
      state.loading = true
      state.error =  false;
    },
    productListSuccess: (state, action) => {
      state.loading = false
      state.products = action.payload
    },
    productListFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const { productListRequest, productListSuccess, productListFail } =
  productSlice.actions
export default productSlice.reducer
