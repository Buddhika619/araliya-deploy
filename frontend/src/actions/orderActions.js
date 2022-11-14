import axios from 'axios'

import {
  orderCreateRequest,
  orderCreateSuccess,
  orderCreateFail,
  myOrdersRequest,
  myOrdersSuccess,
  myOrdersFail,
  orderDeliverRequest,
  orderDeliverSuccess,
  orderDeliverFail,
} from '../reducers/orderSlice'


import {

  orderListRequest,
  orderListSuccess,
  orderListFail,

} from '../reducers/orderListSlice'
import {
  orderDetailsRequest,
  orderDetailsSuccess,
  orderDetailsFail,
} from '../reducers/orderDetailsSlice'

import {
  orderPayRequest,
  orderPaySuccess,
  orderPayFail,
} from '../reducers/orderPaySlice'

import { resetCart } from '../reducers/cartSlice'

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch(orderCreateRequest())

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/orders`, order, config)
    localStorage.removeItem('cartItems')
    dispatch(resetCart())
    dispatch(orderCreateSuccess(data))
  } catch (error) {
    dispatch(
      orderCreateFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(orderDetailsRequest())

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/orders/${id}`, config)

    await dispatch(orderDetailsSuccess(data))
  } catch (error) {
    dispatch(
      orderDetailsFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

export const payOrder =
  (orderId, paymentResult) => async (dispatch, getState) => {
    
    try {
      dispatch(orderPayRequest())

      const {
        userLogin: { userInfo },
      } = getState()

     

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.put(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        config
      )

      dispatch(orderPaySuccess(data))
    } catch (error) {
      dispatch(
        orderPayFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      )
    }
  }

export const orderDeliver = (order) => async (dispatch, getState) => {
  try {
    dispatch(orderDeliverRequest())

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/orders/${order._id}/deliver`,
      {},
      config
    )

    dispatch(orderDeliverSuccess(data))
  } catch (error) {
    dispatch(
      orderDeliverFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

export const myOrderList = () => async (dispatch, getState) => {
  try {

    dispatch(myOrdersRequest())

    const {
      userLogin: { userInfo },
    } = getState()

    

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/orders/myorders`, config)

    dispatch(myOrdersSuccess(data))
  } catch (error) {
    dispatch(
      myOrdersFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch(orderListRequest())

    const {
      userLogin: { userInfo },
    } = getState()

  

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/orders`, config)

    dispatch(orderListSuccess(data))
  } catch (error) {
    dispatch(
      orderListFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}
