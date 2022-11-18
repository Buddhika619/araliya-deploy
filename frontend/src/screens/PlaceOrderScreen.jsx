import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Checkoutsteps from '../components/Checkoutsteps'
import Message from '../components/Message'
import { createOrder } from '../actions/orderActions'
import MapComponent from '../components/MapComponent'
import { orderCreateReset } from '../reducers/orderSlice'
import styled from 'styled-components'
import CustomButton from '../components/microComponents/CustomButton'
import { toast } from 'react-toastify'
import axios from 'axios'
import TestBuwa from './TestBuwa'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import Loader from '../components/Loader'

const OrderDetails = styled(ListGroup)`
  * {
    background-color: #f6f9fc;
  }

  a {
    color: black;
  }
`

const Summary = styled(Card)`
  * {
    background-color: #f6f9fc;
  }

  .errorText {
    * {
      color: red;
      font-weight: 500;
    }
  }
`

const PlaceOrderScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [distance, setDistance] = useState(0)
  const [distanceLoading, setDistanceLoading] = useState(true)
  const fetchCart = useSelector((state) => state.cart)
  const cart = { ...fetchCart }
  const [api, setApi] = useState('')

  //   calculate prices

  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  )

  cart.itemsPrice = cart.itemsPrice.toFixed(2)

 

  cart.shippingPrice = (Math.ceil(distance) * 22).toFixed(2)
  // cart.taxPrice = Number((0.15 *  cart.itemsPrice ).toFixed(2))

  cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice)).toFixed(2)

  const orderCreate = useSelector((state) => state.orderCreate)

  const { order, success, error } = orderCreate

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

    dispatch(orderCreateReset())
    if (success) {
      navigate(`/order/${order._id}`)
    }
  }, [navigate, success])

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        subTotal: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        // taxPrice: cart.taxPrice,
        location :cart.shippingAddress.location,
        totalPrice: cart.totalPrice,
      })
    )
  }

  if (distanceLoading) {
    return <Loader />
  }

  // if (window.matchMedia("(max-width: 700px)").matches) {
  //   // Viewport is less or equal to 700 pixels wide
  // } else {
  //   // Viewport is greater than 700 pixels wide
  // }
  return (
    <>
      <Checkoutsteps step1='step1' step2='step2' step3='step3' />
      <Row>
        <Col md={8}>
          <div className='ms-3'>
            <h2>Delivery Location</h2>
            <MapComponent api={api} zoom={17} lat={cart.shippingAddress.location.lat} long={cart.shippingAddress.location.long}/>
          </div>

          <OrderDetails variant='flush'>
            <ListGroup.Item>
             
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.lineOne}, {cart.shippingAddress.lineTwo},{' '}
                {cart.shippingAddress.lineThree},{' '}
              </p>
              <p>
                <strong>Phone Number: </strong>
                {cart.shippingAddress.phone}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your Cart is Empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
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
                          {item.qty} x Rs {item.price} = Rs{' '}
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </OrderDetails>
        </Col>

        <Col md={4}>
          <Summary>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Cart Total</Col>
                  <Col>RS {cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Delivery Charge</Col>
                  <Col>RS {cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              {/* <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>RS {cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item> */}
              <ListGroup.Item>
                <Row>
                  <Col>Sub Total</Col>
                  <Col>RS {cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {error && (
                <>
                  <ListGroup.Item className='errorText'>
                    <Message varient='danger'>{error}</Message>
                  </ListGroup.Item>
                </>
              )}

              <ListGroup.Item>
                <CustomButton
                  type='button'
                  onClick={placeOrderHandler}
                  className='col-12'
                  visibility={cart.cartItems.length}
                >
                  Place Order
                </CustomButton>
              </ListGroup.Item>
            </ListGroup>
          </Summary>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
