import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  user: {},
  users: [],
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
    },
    userListRequest: (state) => {
      state.loading = true
      state.error = false
    },
    userListSuccess: (state, action) => {
      state.loading = false
      state.users = action.payload
    },
    userListFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    userListReset: (state, action) => {
      state.users = []
    },
    removeUserRequest: (state) => {
      state.loading = true
      state.error = false
    },
    removeUserSuccess: (state, action) => {
      state.loading = false
      state.success = true
    },
    removeUserFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    removeUserReset: (state) => {
      state.success = false
    },
    userUpdateAdminRequest: (state) => {
      state.loading = true
      state.error = false
      state.success = false
    },
    userUpdateAdminSuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.user = action.payload
    },
    userUpdateAdminFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    userUpdatereset: (state, action) => {
      state.success = false
    },
  },
})

export const {
  userDetailsRequest,
  userDetailsSuccess,
  userDetailsFail,
  userListRequest,
  userListSuccess,
  userListFail,
  userListReset,
  removeUserRequest,
  removeUserSuccess,
  removeUserFail,
  removeUserReset,
  userUpdateAdminRequest,
  userUpdateAdminSuccess,
  userUpdateAdminFail,
  userUpdatereset
} = userDetailsSlice.actions
export default userDetailsSlice.reducer
