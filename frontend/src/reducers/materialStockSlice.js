import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  materials: [],

}

const materialSlice = createSlice({
  name: 'materials',
  initialState,
  reducers: {
 
    materialStockRequest: (state) => {
      state.loading = true
      state.error = false
      state.success = false
    },
    materialStockSuccess: (state, action) => {
      state.error = false
      state.loading = false
      state.success = true
      state.materials = action.payload
    },
    materialStockFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    materialStockReset: (state, action) => {
      state.error = false
      state.loading = false
      state.success = false
      state.materials = []
    },
    
    dailyAssingRequest: (state) => {
      state.aloading = true
      state.aerror = false
      state.asuccess = false
    },
    dailyAssingSuccess: (state, action) => {
      state.aerror = false
      state.aloading = false
      state.asuccess = true
    },
    dailyAssingFail: (state, action) => {
      state.aloading = false
      state.asuccess = false
      state.aerror = action.payload
    },

    manualAssingRequest: (state) => {
      state.mloading = true
      state.merror = false
      state.msuccess = false
    },
    manualAssingSuccess: (state, action) => {
      state.merror = false
      state.mloading = false
      state.msuccess = true
    },
    manualAssingFail: (state, action) => {
      state.mloading = false
      state.msuccess = false
      state.merror = action.payload
    },

  },
})

export const {

    materialStockRequest,
    materialStockSuccess,
    materialStockFail,
    materialStockReset,
    dailyAssingRequest,
    dailyAssingSuccess,
    dailyAssingFail,
    
    manualAssingRequest,
    manualAssingSuccess,
    manualAssingFail,
} = materialSlice.actions
export default materialSlice.reducer
