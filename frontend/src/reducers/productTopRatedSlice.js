import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
}

const topRateproductsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    productTopRequest: (state) => {
      state.loading = true
      state.error =  false;
      state.success = false
  
    },
    productTopSuccess: (state, action) => {
      state.error =  false;
      state.loading = false
      state.success = true
      state.products = action.payload

    },
    productTopFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const { productTopRequest, productTopSuccess, productTopFail } =
topRateproductsSlice.actions
export default topRateproductsSlice.reducer
