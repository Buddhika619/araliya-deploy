import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
  shippingAddress: localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : [],
  paymentMethod: localStorage.getItem('paymentMethod')
    ? JSON.parse(localStorage.getItem('paymentMethod'))
    : [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload
      const existItem = state.cartItems.find((x) => x.product === item.product)

      if (existItem) {
        // action.payload.qty = action.payload.qty + existItem.qty
        state.cartItems = state.cartItems.filter(
          (x) => x.product !== existItem.product
        )
        state.cartItems.push(item)
      } else {
        state.cartItems.push(action.payload)
      }
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (x) => x.product !== action.payload
      )
    },
    resetCart: (state, action) => {
      state.cartItems = []
    },
    saveShippingDetails: (state, action) => {
      state.shippingAddress = action.payload
    },
    setpaymentMethod: (state, action) => {
      state.paymentMethod = action.payload
    },
  },
})

export const { addItem, removeItem, saveShippingDetails, setpaymentMethod, resetCart } =
  cartSlice.actions
export default cartSlice.reducer
