import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  order: {},
  loading: true
}

const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {
    orderDetailsRequest: (state) => {
      state.loading = true
      state.error =  false;
    },
    orderDetailsSuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.order = action.payload
    },
    orderDetailsFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const { orderDetailsRequest,orderDetailsSuccess,orderDetailsFail } =
orderDetailsSlice.actions
export default orderDetailsSlice.reducer
