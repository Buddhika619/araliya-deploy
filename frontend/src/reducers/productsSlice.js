import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  pages: 0,
  page: 0,
  resultCount: 0,
  categories: [],
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    productListRequest: (state) => {
      state.loading = true
      state.error = false
      state.success = false
    },
    productListSuccess: (state, action) => {
      state.error = false
      state.loading = false
      state.success = true
      state.products = action.payload.products
      state.pages = action.payload.pages
      state.page = action.payload.page
      state.resultCount = action.payload.resultCount
      state.categories = action.payload.categories
    },
    productListFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
 
  },
})

export const {
  productListRequest,
  productListSuccess,
  productListFail,

} = productSlice.actions
export default productSlice.reducer
