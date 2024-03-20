import { createSlice,  } from '@reduxjs/toolkit'

const initialState = {
  user: {},
 
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

    userDetailsReset: (state, action) => {
      state.user = {}
    },
   
    removeUserRequest: (state) => {
      state.loading = true
      state.error = false
      state.success = false
    },
    removeUserSuccess: (state, action) => {
      state.loading = false
      state.success = true

    },
    removeUserFail: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.success = false
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
  userDetailsReset,
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
