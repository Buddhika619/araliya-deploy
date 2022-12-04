import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  config: {},
}

const configSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {
    setConfigRequest: (state) => {
      state.setSuccess = false
      state.loading = true
      state.error = false
    },
    setConfigSuccess: (state, action) => {

      state.loading = false
      state.setSuccess = true
      state.config = action.payload
    },
    setConfigFail: (state, action) => {
      state.setSuccess = false
      state.loading = false
      state.error = action.payload
    },

    setConfigReset: (state) => {
      state.setSuccess = false
      state.loading = false
      state.error =false
    },
    viewConfigRequest: (state) => {
      state.success = false
      state.loading = true
      state.error = false
    },
    viewConfigSuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.config = action.payload
    },
    viewConfigFail: (state, action) => {
      state.success = false
      state.loading = false
      state.error = action.payload
    },

    viewConfigReset: (state) => {
      state.success = false
      state.loading = false
      state.config = {}
    },
    deleteCarouselRequest: (state) => {
      state.success = false
      state.loading = true
      state.error = false
    },
    deleteCarouselSuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.config.carousel = state.config.carousel.filter((item) => item !==  state.config.carousel[action.payload])
    },
    deleteCarouselFail: (state, action) => {
      state.success = false
      state.loading = false
      state.error = action.payload
    },

    deleteCarouselReset: (state) => {
      state.success = false
      state.loading = false
      state.config = {}
    },
    deleteOfferRequest: (state) => {
      state.success = false
      state.loading = true
      state.error = false
    },
    deleteOfferSuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.config.offers = state.config.offers.filter((item) => item._id !==  action.payload)
    },
    deleteOfferFail: (state, action) => {
      state.success = false
      state.loading = false
      state.error = action.payload
    },

    deleteOfferReset: (state) => {
      state.success = false
      state.loading = false
      state.config = {}
    },
    
  },
})

export const {
  setConfigRequest,
  setConfigSuccess,
  setConfigFail,
  setConfigReset,
  viewConfigRequest,
  viewConfigSuccess,
  viewConfigFail,
  viewConfigReset,
  deleteCarouselRequest,
  deleteCarouselSuccess,
  deleteCarouselFail,
  deleteCarouselReset,

  deleteOfferRequest,
  deleteOfferSuccess,
  deleteOfferFail,
  deleteOfferReset

} = configSlice.actions
export default configSlice.reducer
