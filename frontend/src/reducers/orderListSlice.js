import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {

  orders: [],
}

const orderListSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    orderListRequest: (state) => {
      state.loading = true
      state.error = false
    },
    orderListSuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.orders = action.payload
    },
    orderListFail: (state, action) => {
      state.loading = false
      state.error = action.payload
  },
}
})

export const {

  orderListRequest,
  orderListSuccess,
  orderListFail,

} = orderListSlice.actions
export default orderListSlice.reducer
