import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  product: {},
}

const productDetailsSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {

    productCreateReviewRequest: (state) => {
      state.loading = true
      state.error = false
    },
    productCreateReviewSuccess: (state, action) => {
      state.loading = false
      state.success = true
    },
    productCreateReviewFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    productCreateReviewReset: (state) => {
      state.error = false
      state.success = false
      state.product = {}
    },
  },
})

export const {
  productCreateReviewRequest,
  productCreateReviewSuccess,
  productCreateReviewFail,
  productCreateReviewReset
} = productDetailsSlice.actions
export default productDetailsSlice.reducer
