import { createSlice } from '@reduxjs/toolkit'

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
      state.product = {}
    },
    productDetailsSuccess: (state, action) => {
      state.loading = false
      state.product = action.payload
    },
    productDetailsFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    productRemoveRequest: (state) => {
      state.loading = true
      state.error = false
    },
    productRemoveSuccess: (state, action) => {
      state.loading = false
      state.success = true
    },
    productRemoveFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    productRemoveReset: (state) => {
      state.success = false
    },
    productUpdateRequest: (state) => {
      state.loading = true
      state.error = false
    },
    productUpdateSuccess: (state, action) => {
      state.loading = false
      state.product = action.payload
      state.success = true
    },
    productUpdateFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    productUpdateReset: (state) => {
      state.error = false
      state.success = false
    },
    // productCreateReviewRequest: (state) => {
    //   state.loading = true
    //   state.error = false
    // },
    // productCreateReviewSuccess: (state, action) => {
    //   state.loading = false
    //   state.success = true
    // },
    // productCreateReviewFail: (state, action) => {
    //   state.loading = false
    //   state.error = action.payload
    // },
    // productCreateReviewReset: (state) => {
    //   state.error = false
    //   state.success = false
    //   state.product = {}
    // },
  },
})

export const {
  productDetailsRequest,
  productDetailsSuccess,
  productDetailsFail,
  productRemoveRequest,
  productRemoveSuccess,
  productRemoveFail,
  productRemoveReset,
  productUpdateRequest,
  productUpdateSuccess,
  productUpdateFail,
  productUpdateReset,
  // productCreateReviewRequest,
  // productCreateReviewSuccess,
  // productCreateReviewFail,
  // productCreateReviewReset
} = productDetailsSlice.actions
export default productDetailsSlice.reducer
