import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    order : {}
}

const orderPaySlice = createSlice({
  name: 'orderPay',
  initialState,
  reducers: {

    // getOne
    orderPayRequest: (state) => {
      state.loading = true
      state.success = false
      state.error = false
    },
    orderPaySuccess: (state, action) => {
      state.loading = false
      state.success = true
    },
    orderPayFail: (state, action) => {
      state.loading = false
      state.error = true
    },
    orderPayReset: (state, action) => {
        state.loading = false
        state.order = {}
      },
  },
})

export const {  orderPayRequest, orderPaySuccess,orderPayFail,orderPayReset} =
orderPaySlice.actions
export default orderPaySlice.reducer
