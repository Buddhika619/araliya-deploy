import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listOrders } from '../actions/orderActions'
import { removeUserReset } from '../reducers/userDetailsSlice'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const OrderListScreen = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const orderList = useSelector((state) => state.orderCreate)
  const { loading, error, orders } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const user = userInfo

  //   if(removeSuccess){
  //     toast.error(`User Removed!`,{
  //       position: "bottom-right",
  //       autoClose: 1000,
  //       theme: "colored",})
  //   }

  useEffect(() => {
    if (user && user.isAdmin) {
      dispatch(listOrders())
    } else {
      navigate('/login')
    }
  }, [dispatch,navigate, user ])

  return (
    <>
      <ToastContainer hideProgressBar={true} />
      <h1>Users</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message varient={'danger'}>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.slice(0, 10)}</td>
                <td>RS {order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.slice(0,10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>

                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.slice(0,10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer>
                  {/* <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default OrderListScreen
