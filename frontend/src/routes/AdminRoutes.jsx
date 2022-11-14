import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import UserListScreen from '../screens/Admin/UserListScreen'
import Dashboard from '../screens/Admin/Dashboard'
import UserEditScreen from '../screens/UserEditScreen'
import ProductlistScreen from '../screens/Admin/ProductListScreen'
import ProductEditScreen from '../screens/ProductEditScreen'
import OrderListScreen from '../screens/Admin/OrderListScreen'
import Header from '../components/layouts/Header'
import { Container } from 'react-bootstrap'
import Footer from '../components/layouts/Footer'
import NotFound from '../screens/NotFound'
import AdminHeader from '../components/layouts/AdminHeader'

const AdminRoutes = () => {
  return (
    <>
      <AdminHeader />
      <main >
        <Container fluid />
        <Routes>
          <Route path='/users' element={<UserListScreen />} />

          <Route path='/user/:id/edit' element={<UserEditScreen />} />

          <Route path='/dashboard' element={<Dashboard />} />
          {/* <Route path='/productlist' element={<ProductlistScreen />} />
          <Route
            path='/products/:id/edit'
            element={<ProductEditScreen />}
            exact
          /> */}

          <Route path='/products/active' element={<ProductlistScreen />} />
          <Route path='/products/outofstock' element={<ProductlistScreen />} />
          <Route path='/products/deactivated' element={<ProductlistScreen />} />
          <Route path='/products/:path/:id/edit' element={<ProductEditScreen />} />
          

          <Route path='/orders' element={<OrderListScreen />} />

          <Route path='/*' element={<NotFound />} />

          {/* legacy routes */}
          {/* <Route path='productlist/:pagenumber' element={<ProductlistScreen />} /> */}
          {/* <Route path='productlist' element={<ProductlistScreen />} /> */}
        </Routes>
        <Container fluid />
      </main>
      <Footer />
    </>
  )
}

export default AdminRoutes
