import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  order: {},
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    orderCreateRequest: (state) => {
      state.loading = true
      state.error =  false
    },
    orderCreateSuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.order = action.payload
    },
    orderCreateFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    }
  },
})

export const { orderCreateRequest, orderCreateSuccess, orderCreateFail } =
orderSlice.actions
export default orderSlice.reducer
