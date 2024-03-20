import { createSlice,  } from '@reduxjs/toolkit'

const initialState = {

  users: [],
}

const userDetailsSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    userListRequest: (state) => {
      state.loading = true
      state.error = false
      state.success = false
    },
    userListSuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.users = action.payload
    },
    userListFail: (state, action) => {
      state.success = false
      state.loading = false
      state.error = action.payload
    },
    userListReset: (state, action) => {
      state.success = false
      state.users = []
    },
    
  },
})

export const {

  userListRequest,
  userListSuccess,
  userListFail,
  userListReset,
 
} = userDetailsSlice.actions
export default userDetailsSlice.reducer
