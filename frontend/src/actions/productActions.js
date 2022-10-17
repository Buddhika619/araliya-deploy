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
} from '../reducers/singleProSlice'

export const listProducts = () => async (dispatch) => {
  try {
    dispatch(productListRequest())

    const { data } = await axios.get('/api/products')
 
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
