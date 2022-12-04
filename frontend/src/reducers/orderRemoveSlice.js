import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  order: {},

}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {

    orderRemoveRequest: (state) => {
      state.loading = true
      state.error = false
      state.success = false
    },
    ordertRemoveSuccess: (state, action) => {
      state.loading = false
      state.success = true
    },
    orderRemoveFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    orderRemoveReset: (state) => {
      state.success = false
      state.error = false
      state.order = {}
    },
   
  },
})

export const {
  orderRemoveRequest,
  ordertRemoveSuccess,
  orderRemoveFail,
  orderRemoveReset
} = orderSlice.actions
export default orderSlice.reducer
