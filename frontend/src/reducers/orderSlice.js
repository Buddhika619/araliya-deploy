import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  order: {},
  orders: []
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

    orderCreateReset: (state) => {
      state.success = false
      state.dsuccess = false
      state.loading = false
      state.error = false
      state.order = {}
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

    myOrdersReset: (state) => {
      state.orders = []
    },
    orderDeliverRequest: (state) => {
      state.loading = true
      state.error = false
      state.success = false
    },
    orderDeliverSuccess: (state, action) => {
      state.loading = false
      state.dsuccess = true
      state.order = action.payload
    },
    orderDeliverFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    orderDeliverReset: (state, action) => {
      state.order = {}
      state.success = false
    },
    orderStateUpdateRequest: (state) => {
      state.loading = true
      state.error = false
      state.success = false
    },
    orderStateUpdateSuccess: (state) => {
      state.loading = false
      state.success = true
    },
    orderStateUpdateFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    orderStateUpdateReset: (state) => {
      state.success = false
      state.loading=false
    },
 
    
  },
})

export const {
  orderCreateRequest,
  orderCreateSuccess,
  orderCreateFail,
  orderCreateReset,
  myOrdersRequest,
  myOrdersSuccess,
  myOrdersFail,
  myOrdersReset,
  orderDeliverRequest,
  orderDeliverSuccess,
  orderDeliverFail,
  orderDeliverReset,
  orderStateUpdateRequest,
  orderStateUpdateSuccess,
  orderStateUpdateFail,
  orderStateUpdateReset

} = orderSlice.actions
export default orderSlice.reducer
