import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  order: {},
  orders: [],
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    orderCreateRequest: (state) => {
      state.loading = true
      state.error = false
    },
    orderCreateSuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.order = action.payload
    },
    orderCreateFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    myOrdersRequest: (state) => {
      state.loading = true
      state.error = false
    },
    myOrdersSuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.orders = action.payload
    },
    myOrdersFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
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
    orderDeliverRequest: (state) => {
      state.loading = true
      state.error = false
      state.success = false
    },
    orderDeliverSuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.order = action.payload
    },
    orderDeliverFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    orderDeliverReset: (state, action) => {
      state.order = {}
    },
    
  },
})

export const {
  orderCreateRequest,
  orderCreateSuccess,
  orderCreateFail,
  myOrdersRequest,
  myOrdersSuccess,
  myOrdersFail,
  orderListRequest,
  orderListSuccess,
  orderListFail,
  orderDeliverRequest,
  orderDeliverSuccess,
  orderDeliverFail,
  orderDeliverReset
} = orderSlice.actions
export default orderSlice.reducer
