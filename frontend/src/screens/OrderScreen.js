import { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Form, Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {
  getOrderDetails,
  payOrder,
  orderDeliver,
} from '../actions/orderActions'
import { orderPayReset } from '../reducers/orderPaySlice'
import { orderDeliverReset } from '../reducers/orderSlice'
import QRCode from 'qrcode'

const OrderScreen = () => {
  const { id } = useParams()

  const navigate = useNavigate()

  const [sdkReady, setSdkReady] = useState(false)

  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderDetails)
  const { loading: loadingPay, success: successPay } = orderPay

  const deliverOrder = useSelector((state) => state.orderCreate)
  const { loading: loadingDeliver, success: successDeliver } = deliverOrder

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
    if (!userInfo) {
      navigate('/login')
    }
    generateQR(`http://localhost:3000/order/${id}`)

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!notOrder || successPay || successDeliver || order._id !== id) {
      dispatch(orderPayReset())
      dispatch(orderDeliverReset())
      dispatch(getOrderDetails(id))
    }
    if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }

    // dispatch(getOrderDetails(id))
  }, [
    dispatch,
    id,
    successPay,
    notOrder,
    successDeliver,
    order.isPaid,
    successDeliver,
  ])

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(id, paymentResult))
    dispatch(getOrderDetails(id))
  }

  const deliverHandler = () => {
    dispatch(orderDeliver(order))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message varient='danger'>{error}</Message>
  ) : (
    <>
      <Row>
        <h1>Order {order._id}</h1>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name:</strong> {order.user.name}
              </p>
              <p>
                <strong>Email:</strong>
                <a href={`mailto:${order.user.email}`}> {order.user.email}</a>
              </p>

              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message varient='success'>Delivered on {order.paidAt}</Message>
              ) : (
                <Message varient='danger'>Not Delivered</Message>
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
                          {item.qty} x ${item.price} = RS{' '}
                          {item.qty * item.price}
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
          <Row>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Sub Total</Col>
                    <Col>${order.subTotal}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${order.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>RS {order.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>RS {order.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                {!order.isPaid && order.paymentMethod === 'PayaPal' && (
                  <ListGroup.Item>
                    {loadingPay && <Loader />}
                    {!sdkReady ? (
                      <Loader />
                    ) : (
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      />
                    )}
                  </ListGroup.Item>
                )}

                {loadingDeliver && <Loader />}
                {userInfo && userInfo.isAdmin && !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card>
          </Row>
          <img src={qr} alt='Red dot' style={{ width: '250px' }} />
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
