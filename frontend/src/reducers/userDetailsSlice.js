import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    user: {}
}

const userDetailsSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // getOne
    userDetailsRequest: (state) => {
      state.loading = true
      state.error = false
    },
    userDetailsSuccess: (state, action) => {
      state.loading = false
      state.user = action.payload
    },
    userDetailsFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    }
  },
})

export const { userDetailsRequest, userDetailsSuccess, userDetailsFail } =
userDetailsSlice.actions
export default userDetailsSlice.reducer