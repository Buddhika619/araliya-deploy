import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
}

const userLoginReducer = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    // getOne
    userLoginRequest: (state) => {
      state.loading = true
      state.error = false
    },
    userLoginSuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.userInfo = action.payload
    },
    userLoginFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    userLogout: (state) => {
        state.userInfo = null
    },
 
  },
})

export const { userLoginRequest, userLoginSuccess, userLoginFail, userLogout} =
  userLoginReducer.actions
export default userLoginReducer.reducer
