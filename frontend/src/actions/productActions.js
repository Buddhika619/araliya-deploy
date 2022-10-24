import axios from 'axios'
import {
  productListRequest,
  productListSuccess,
  productListFail,
} from '../reducers/productsSlice'

import {
  productDetailsRequest,
  productDetailsSuccess,
  productDetailsFail,
  productRemoveRequest,
  productRemoveSuccess,
  productRemoveFail,
  productUpdateRequest,
  productUpdateSuccess,
  productUpdateFail,
  productUpdateReset,
 
} from '../reducers/singleProductSlice'


import {
  productCreateReviewRequest,
  productCreateReviewSuccess,
  productCreateReviewFail
} from '../reducers/productReviewSlice'

import {
  productCreateRequest,
  productCreateSuccess,
  productCreateFail,
  productCreateReset,
 } from '../reducers/productCreateSlice'


 import {
  productTopRequest, productTopSuccess, productTopFail
 } from '../reducers/productTopRatedSlice'

export const listProducts = (keyword= '',pagenumber = '') => async (dispatch) => {
  try {
    dispatch(productListRequest())

    const { data } = await axios.get(`/api/products?keyword=${keyword}&pagenumber=${pagenumber}`)

    dispatch(productListSuccess(data))
  } catch (error) {
    dispatch(
      productListFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

export const listProductsDetails = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/products/' + id)
    dispatch(productDetailsRequest())
    dispatch(productDetailsSuccess(data))
  } catch (error) {
    dispatch(
      productDetailsFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

export const removeProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch(productRemoveRequest())

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/products/${id}`, config)

    dispatch(productRemoveSuccess())
  } catch (error) {
    dispatch(
      productRemoveFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch(productCreateRequest())

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

   const { data } = await axios.post(`/api/products/`,{}, config)

    dispatch(productCreateSuccess(data))
  } catch (error) {
    dispatch(
      productCreateFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch(productUpdateRequest())

    console.log(product)
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

   const { data } = await axios.put(`/api/products/${product._id}`,product, config)


    dispatch(productUpdateSuccess(data))
  } catch (error) {
    dispatch(
      productUpdateFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

export const createProductReview = (productId, review) => async (dispatch, getState) => {
  try {
    dispatch(productCreateReviewRequest())

  
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

   await axios.post(`/api/products/${productId}/reviews`,review, config)


    dispatch(productCreateReviewSuccess())
  } catch (error) {
    dispatch(
      productCreateReviewFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch(productTopRequest())

    const { data } = await axios.get(`/api/products/top`)

    dispatch(productTopSuccess(data))
  } catch (error) {
    dispatch(
      productTopFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}