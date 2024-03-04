import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  products: [],

}

const stockProductSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
 
    stockProductListRequest: (state) => {
      state.loading = true
      state.error = false
      state.success = false
    },
    stockProductListSuccess: (state, action) => {
      state.error = false
      state.loading = false
      state.success = true
      state.products = action.payload
    },
    stockProductListFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {

  stockProductListRequest,
  stockProductListSuccess,
  stockProductListFail,

} = stockProductSlice.actions
export default stockProductSlice.reducer
