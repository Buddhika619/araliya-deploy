import axios from 'axios'
import {
  setConfigRequest,
  setConfigSuccess,
  setConfigFail,
  viewConfigRequest,
  viewConfigSuccess,
  viewConfigFail,
  deleteCarouselRequest,
  deleteCarouselSuccess,
  deleteCarouselFail,
  deleteOfferRequest,
  deleteOfferSuccess,
  deleteOfferFail,
} from '../reducers/configSlice'

export const updateConfig = (configData) => async (dispatch, getState) => {
  try {
    dispatch(setConfigRequest())
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.put(`/api/config`, configData, config)

    dispatch(setConfigSuccess(configData))
  } catch (error) {
    dispatch(
      setConfigFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

export const getConfigdata = () => async (dispatch, getState) => {
  try {
    dispatch(viewConfigRequest())

    const { data } = await axios.get(`/api/config`)

    dispatch(viewConfigSuccess(data))
  } catch (error) {
    dispatch(
      viewConfigFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

export const removeCarousel = (id) => async (dispatch, getState) => {
  try {
    dispatch(deleteCarouselRequest())

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    //deleteOne
    await axios.delete(`/api/config/carousel/${id}`, config)
    dispatch(deleteCarouselSuccess(id))
  } catch (error) {
    dispatch(
      deleteCarouselFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

export const removeOffer = (id) => async (dispatch, getState) => {
  try {
    dispatch(deleteOfferRequest())

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    //deleteOne
    await axios.delete(`/api/config/offer/${id}`, config)
    dispatch(deleteOfferSuccess(id))
  } catch (error) {
    dispatch(
      deleteOfferFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}
