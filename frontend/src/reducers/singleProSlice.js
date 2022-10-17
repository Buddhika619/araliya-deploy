import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  product: {},
}

const productDetailsSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {

    // getOne
    productDetailsRequest: (state) => {
      state.loading = true
      state.error = false
    },
    productDetailsSuccess: (state, action) => {
      state.loading = false
      state.product = action.payload
    },
    productDetailsFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {  productDetailsRequest, productDetailsSuccess,productDetailsFail} =
productDetailsSlice.actions
export default productDetailsSlice.reducer
