import { useState, useEffect } from 'react'
import axios from 'axios'

import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Form, Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {
  getOrderDetails,

  orderDeliver,
} from '../actions/orderActions'
import { orderPayReset } from '../reducers/orderPaySlice'
import {  orderDeliverReset } from '../reducers/orderSlice'

import QRCode from 'qrcode'
import { LinkContainer } from 'react-router-bootstrap'
import styled from 'styled-components'
import CustomButton from '../components/microComponents/CustomButton'

import MapComponent from '../components/MapComponent'
import { toast } from 'react-toastify'

const PrintLink = styled(LinkContainer)`
  /* @media (max-width: 480px) {
    display: none;
  } */
`

const ShippingWrapper = styled(Row)`
  a {
    color: #000;
  }
`

const Summary = styled(Row)``

const Title = styled.h1`
  @media (max-width: 800px) {
    font-size: 25px;
  }
`

const OrderScreen = () => {
  const { id } = useParams()

  const navigate = useNavigate()

  const [distanceLoading, setDistanceLoading] = useState(true)

  const [distance, setDistance] = useState(0)
  const fetchCart = useSelector((state) => state.cart)
  const cart = { ...fetchCart }
  const [api, setApi] = useState('')
  const [lat, setLat] = useState(0)
  const [long, setLong] = useState(0)

  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, success, error } = orderDetails



  const deliverOrder = useSelector((state) => state.orderCreate)
  const { loading: loadingDeliver, success: successDeliver } = deliverOrder

  if(successDeliver){
    toast.success("Woohoo order is Completed!", {
      theme: "colored",
    })
  }


  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  let notOrder = order.user ? true : false

  const [qr, setQr] = useState('')
  const generateQR = async (text) => {
    try {
      setQr(await QRCode.toDataURL(text))
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    const fetchDistance = async (location) => {
      try {
        const { data } = await axios.get(
          `/api/distance?lat=${location.lat}&lng=${location.long}`
        )

        const distance = Number(
          data.rows[0].elements[0].distance.text.split(' ')[0]
        )
        setApi(data.api)
        setDistance(distance)

        setDistanceLoading(false)
      } catch (error) {
        toast.error('Faild to fetch location')

        setDistanceLoading(false)
      }
    }

    fetchDistance(cart.shippingAddress.location)

    if (!userInfo) {
      navigate('/login')
    }
    generateQR(`${window.location.href}}`)

    if (!notOrder || successDeliver || order._id !== id) {
      dispatch(orderPayReset())
      dispatch(orderDeliverReset())
      dispatch(getOrderDetails(id))
    }

    if (order.location) {
      {
        setLat(order.location.lat)
      }
      {
        setLong(order.location.long)
      }
    }
    // dispatch(getOrderDetails(id))
  }, [
    dispatch,
    id,
    notOrder,
    successDeliver,
    order.isPaid,
    cart.shippingAddress.location,
    navigate,
    order._id,
    userInfo,
  ])



  const deliverHandler = () => {
    dispatch(orderDeliver(order))
    dispatch(getOrderDetails(id))
  }

  

  if (distanceLoading) {
    return <Loader />
  }

  return (
    <>
      {loading && <Loader />}
      {error && <Message varient='danger'>{error}</Message>}
      {success && (
        <>
          <ShippingWrapper>
            <Title>Order {order._id}</Title>
            <Col md={8}>
              <h2>Delivery Location</h2>
              <div>
                <MapComponent api={api} zoom={17} lat={lat} long={long} />
              </div>

              {/* <CustomButton type='button' onClick={() => navigate('/test')}>
                View Delivery Location
              </CustomButton> */}
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Delivery Details</h2>
                  <p>
                    <strong>Name:</strong> {order.user.name}
                  </p>
                  <p>
                    <strong>Email:</strong>
                    <a href={`mailto:${order.user.email}`}>
                      {' '}
                      {order.user.email}
                    </a>
                  </p>

                  <p>
                    <strong>Address: </strong>
                    {order.shippingAddress.lineOne},{' '}
                    {order.shippingAddress.lineTwo},{' '}
                    {order.shippingAddress.lineThree}
                  </p>
                  <p>
                    <strong>Dilivery Distance: </strong>
                    {order.distance} km
                  </p>
                  <p>
                    <strong>Phone Number: </strong>
                    {order.shippingAddress.phone}
                  </p>

                  {order.isDelivered ? (
                    <Message varient='success'>
                      Delivered on{' '}
                      {order.paidAt}
                    </Message>
                  ) : (
                    <Message varient='warning'>
                      <strong>Order Status: </strong>
                      <strong> {order.orderStatus}</strong>
                    </Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method:</strong>
                    {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <Message varient='success'>Paid on {order.paidAt}</Message>
                  ) : (
                    <Message varient='danger'>Not Paid</Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Order Items</h2>
                  {order.orderItems.length === 0 ? (
                    <Message>Order is Empty</Message>
                  ) : (
                    <ListGroup variant='flush'>
                      {order.orderItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={1}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                              />
                            </Col>
                            <Col>
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </Col>
                            <Col md={4}>
                              {item.qty} x RS {item.price} = RS{' '}
                              {(item.qty * item.price).toFixed(2)}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={4}>
              <Summary>
                <Card>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <h2>Order Summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Cart Total</Col>
                        <Col>Rs {order.subTotal.toFixed(2)}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Dilivery Charge</Col>
                        <Col>Rs {order.shippingPrice.toFixed(2)}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Tax</Col>
                        <Col>RS {order.taxPrice.toFixed(2)}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Total</Col>
                        <Col>RS {order.totalPrice.toFixed(2)}</Col>
                      </Row>
                    </ListGroup.Item>

                    {loadingDeliver && <Loader />}
                    {userInfo &&
                      (userInfo.isAdmin || userInfo.role === 'Rider') &&
                      !order.isDelivered &&
                      order.orderStatus === 'dispatched' && (
                        <ListGroup.Item>
                          <CustomButton
                            type='button'
                            onClick={deliverHandler}
                            className='col-12'
                          >
                            Mark As Delivered
                          </CustomButton>
                        </ListGroup.Item>
                      )}
                  </ListGroup>
                </Card>
              </Summary>
              <Row className='mt-5'>
                <img src={qr} alt='Red dot' style={{ width: '250px' }} />
              </Row>
            </Col>
          </ShippingWrapper>
          <PrintLink to={`/order/print/${order._id}`}>
            <CustomButton type='button'>Print</CustomButton>
          </PrintLink>
        </>
      )}
      <br /> <br /> <br /> <br /> <br />
      <br /> <br />
    </>
  )
}

export default OrderScreen
