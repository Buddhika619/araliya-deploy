import {
  configureStore,
  combineReducers,
  applyMiddleware,
} from '@reduxjs/toolkit'
import { composeWithDevTools } from '@redux-devtools/extension'
import productListReducer from './reducers/productsSlice'
import productDetailsReducer from './reducers/singleProductSlice'
import cartReducer from './reducers/cartSlice'
import userLoginReducer from './reducers/userSlice'
import userRegisterReducer from './reducers/userRegisterSlice'
import uerDetailsReducer from './reducers/userDetailsSlice'
import userUpdateReducer from './reducers/userUpdateSlice'
import orderReducer from './reducers/orderSlice'
import orderDetailsReducer from './reducers/orderDetailsSlice'
import orderPayReducer from './reducers/orderPaySlice'
import createProductReducer from './reducers/productCreateSlice'
import productReviewReducer from './reducers/productReviewSlice'
import productTopRatedReducer from './reducers/productTopRatedSlice'


// export default configureStore({
//     reducer: {
//       cart: cartReducer,
//     },
//   });

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  createProduct: createProductReducer,
  productTopRated: productTopRatedReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: uerDetailsReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  productReview: productReviewReducer, 
  
})

const middleware = []

const store = configureStore(
  { reducer: reducer,
   },
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
