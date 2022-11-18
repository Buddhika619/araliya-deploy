import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  getUserDetails,
  logout,
  updateUserProfile,
} from '../actions/userActions'
import { myOrderList } from '../actions/orderActions'
import styled from 'styled-components'

import { toast } from 'react-toastify'

import { Container } from 'react-bootstrap'
import { userUpdateReset } from '../reducers/userUpdateSlice'

const Profile = () => {
  const [changeDetails, setChangeDetails] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordField, setPasswordField] = useState(false)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const uerDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = uerDetails
  //log out if token is not valid

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdate)
  const { success, error: updateError } = userUpdateProfile

  const myOrders = useSelector((state) => state.orderCreate)
  const { loading: loadingOrders, error: errorOrders, orders } = myOrders


  if (updateError) {
    toast.error(updateError)
  }


  if (success) {
    toast.success('Successfully updated the profile')
  }

  if (error && errorOrders === 'Not Authorized, token failed') {
    dispatch(logout())
  }
  useEffect(() => {
    // dispatch(userUpdateReset())
    dispatch(userUpdateReset())
    if (!userInfo) {
      navigate('/login')
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'))
        dispatch(myOrderList())
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, navigate, userInfo, user, success])

  const onLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  const onSubmit = async () => {
    if (password !== confirmPassword) {
      toast.error('Passwords do not Match!')
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }

  const onEdit = (listingId) => navigate(`/editlisting/${listingId}`)

  return (
    <>
      <main>
        <Container className='mt-2' style={{ height: '100vh' }}>
          <header className='profileHeader'>
            <p className='pageHeader'>My Profile</p>
            <button type='button' className='logOut' onClick={onLogout}>
              LogOut
            </button>
          </header>
          <div className='profile'>
            <div className='profileDetailsHeader'>
              <p className='profileDetailsText'>Personal Details</p>
              <p
                className='changePersonalDetails'
                onClick={() => {
                  setPasswordField(!passwordField)
                  changeDetails && onSubmit()
                  setChangeDetails(!changeDetails)
                
                }}
              >
                {changeDetails ? 'done' : 'change'}
              </p>
            </div>

            <div className='profileCard'>
              <form>
                <input
                  style={{ padding: '4px' }}
                  type='text'
                  id='name'
                  className={
                    !changeDetails ? 'profileName' : 'profileNameActive'
                  }
                  disabled={!changeDetails}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <input
                  style={{ padding: '4px', fontWeight: '600' }}
                  type='email'
                  id='email'
                  className={
                    !changeDetails ? 'profileEmail' : 'profileEmailActive'
                  }
                  disabled={!changeDetails}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {passwordField && (
                  <>
                    <input
                      style={{ padding: '4px' }}
                      type='password'
                      className={
                        !changeDetails ? 'profileEmail' : 'profileEmailActive'
                      }
                      disabled={!changeDetails}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder='Enter new password'
                    />

                    <input
                      style={{ padding: '4px' }}
                      type='password'
                      className={
                        !changeDetails ? 'profileEmail' : 'profileEmailActive'
                      }
                      disabled={!changeDetails}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder='Confirm password'
                    />
                  </>
                )}
              </form>
            </div>
            <h2>My orders</h2>
            {loadingOrders ? (
              <Loader />
            ) : errorOrders ? (
              <Message varient='danger'>{errorOrders}</Message>
            ) : (
              <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>ID</th>
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
                      <td>{order.createdAt.slice(0, 10)}</td>
                      <td>{order.totalPrice}</td>
                      <td>
                        {order.isPaid ? (
                          order.paidAt.slice(0, 10)
                        ) : (
                          <i
                            className='fas fa-times'
                            style={{ color: 'red' }}
                          ></i>
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          order.deliveredAt.slice(0, 10)
                        ) : (
                          <i
                            className='fas fa-times'
                            style={{ color: 'red' }}
                          ></i>
                        )}
                      </td>
                      <td>
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button variant='light' className='btn-sm'>
                            Details
                          </Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
            {/* <Link to='/createlisting' className='createListing'>
            <img src={homeIcon} alt='home' />
            <p>Sell or rent your home</p>
            <img src={arrowRight} alt='arrow Right' />
          </Link> */}
          </div>
        </Container>
        <br/> <br/> <br/> <br/> <br/><br/> <br/>
      </main>
    </>
  )
}

export default Profile
