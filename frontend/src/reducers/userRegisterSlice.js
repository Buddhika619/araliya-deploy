import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
}

const userRegisterSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    // getOne
    userRegisterRequest: (state) => {
      state.loading = true
      state.error = false
    },
    userRegisterSuccess: (state, action) => {
      state.loading = false
      state.userInfo = action.payload
    },
    userRegisterFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const { userRegisterRequest, userRegisterSuccess, userRegisterFail } =
userRegisterSlice.actions
export default userRegisterSlice.reducer
