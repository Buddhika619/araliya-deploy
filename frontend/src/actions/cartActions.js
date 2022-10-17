import axios from 'axios'

import { addItem,removeItem,saveShippingDetails,setpaymentMethod } from '../reducers/cartSlice' 

export const addTocart = (id, qty) => async (dispatch, getState) => {

    try {
        const { data } = await axios.get(`/api/products/${id}`)
    
        dispatch(addItem({
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty: qty
        }))
    
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
        
    } catch (error) {
        console.log(error)
    }

  
}

export const removeFromCart = (id) => async (dispatch, getState) => {

    dispatch(removeItem(id))

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  
}

export const ShippingDetails = (data) => async (dispatch) => {

    dispatch(saveShippingDetails(data))

    localStorage.setItem('shippingAddress', JSON.stringify(data))
   
}




export const savePaymentMethod = (data) => async (dispatch) => {

    dispatch(setpaymentMethod(data))

    localStorage.setItem('paymentMethod', JSON.stringify(data))
   
}

