import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from '../components/layouts/Header'
import Footer from '../components/layouts/Footer'

import ProductScreen from '../screens/ProductScreen'
import CartScreen from '../screens/CartScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import ProfileScreen from '../screens/ProfileScreen'
import ShippingScreen from '../screens/ShippingScreen'
import PaymentScreen from '../screens/PaymentScreen'
import PlaceOrderScreen from '../screens/PlaceOrderScreen'
import OrderScreen from '../screens/OrderScreen'

import NotFound from '../screens/NotFound'


import MobileNavbar from '../components/layouts/MobileNavBar'

const GenricRoutes = () => {
  return (
    <>
 <Header/>
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/shipping' element={<ShippingScreen />} />
            <Route path='/payment/:location' element={<PaymentScreen />} />
            <Route path='/placeorder' element={<PlaceOrderScreen />} />
            <Route path='/order/:id' element={<OrderScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/product/:id' element={<ProductScreen />} />
           
            <Route path='/cart'>
              <Route index element={<CartScreen />} />
              <Route path=':id' element={<CartScreen />} />
            </Route>
           
            <Route path='/*' element={<NotFound />} />
          </Routes>
        </Container>
      </main>
      <Footer />
      <MobileNavbar/>
      <Routes>
        
      </Routes>
    </>
  )
}

export default GenricRoutes
