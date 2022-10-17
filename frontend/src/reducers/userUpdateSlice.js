import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
}

const userUpdateSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    // getOne
    userUpdateRequest: (state) => {
      state.loading = true
      state.error = false
      state.success = false
    },
    userUpdateSuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.userInfo = action.payload
    },
    userUpdateFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    }
  },
})

export const { userUpdateRequest, userUpdateSuccess, userUpdateFail } =
userUpdateSlice.actions
export default userUpdateSlice.reducer