import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  product: {},
}

const productCreateSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    productCreateRequest: (state) => {
      state.loading = true
      state.error = false
    },
    productCreateSuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.product = action.payload
    },
    productCreateFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    productCreateReset: (state) => {
      state.success = false
      state.product = {}
    },
  },
})

export const {
  productCreateRequest,
  productCreateSuccess,
  productCreateFail,
  productCreateReset,
} = productCreateSlice.actions
export default productCreateSlice.reducer
