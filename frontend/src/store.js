import {
  configureStore,
  combineReducers,
  applyMiddleware,
} from '@reduxjs/toolkit'
import { composeWithDevTools } from '@redux-devtools/extension'
import productListReducer from './reducers/productsSlice'
import productDetailsReducer from './reducers/singleProSlice'
import cartReducer from './reducers/cartSlice'
import userLoginReducer from './reducers/userSlice'
import userRegisterReducer from './reducers/userRegisterSlice'
import uerDetailsReducer from './reducers/userDetailsSlice'
import userUpdateReducer from './reducers/userUpdateSlice'
import orderReducer from './reducers/orderSlice'
import orderDetailsReducer from './reducers/orderDetailsSlice'
import orderPayReducer from './reducers/orderPaySlice'



// export default configureStore({
//     reducer: {
//       cart: cartReducer,
//     },
//   });

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: uerDetailsReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer   
})

const middleware = []

const store = configureStore(
  { reducer: reducer,
   },
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
