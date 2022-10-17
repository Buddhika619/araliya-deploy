import axios from 'axios'
import {
  userLoginRequest,
  userLoginSuccess,
  userLoginFail,
  userLogout,
} from '../reducers/userSlice'
import {
  userRegisterRequest,
  userRegisterSuccess,
  userRegisterFail,
} from '../reducers/userRegisterSlice'

import {
  userDetailsRequest,
  userDetailsSuccess,
  userDetailsFail,
} from '../reducers/userDetailsSlice'

import {
  userUpdateRequest,userUpdateSuccess, userUpdateFail
} from '../reducers/userUpdateSlice'


export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(userLoginRequest())

    const config = {
      Headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    )

    dispatch(userLoginSuccess(data))

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch(
      userLoginFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch(userLogout())
}

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch(userRegisterRequest())

    const config = {
      Headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      config
    )

    dispatch(userRegisterSuccess(data))

    dispatch(userLoginSuccess(data))

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch(
      userRegisterFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(userDetailsRequest())

    const {
      userLogin: { userInfo },
    } = getState()

    console.log(userInfo)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/users/${id}`, config)

    dispatch(userDetailsSuccess(data))
  } catch (error) {
    dispatch(
      userDetailsFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch(userUpdateRequest())

    const {
      userLogin: { userInfo },
    } = getState()

    

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    console.log(user)

    const { data } = await axios.put(`/api/users/profile`,user, config)

    dispatch(userUpdateSuccess(data))
  } catch (error) {
    dispatch(
      userUpdateFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}
