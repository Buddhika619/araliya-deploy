import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  ListGroupItem,
} from 'react-bootstrap'
import Message from '../components/Message'
import { addTocart, removeFromCart } from '../actions/cartActions'
import styled from 'styled-components'
import CustomButton from '../components/microComponents/CustomButton'

const GoBackLink = styled(Link)`
  color: black;
  font-weight: 600;
  text-decoration: underline;
  margin-left: 5px;
`

const ProductList = styled(ListGroup)`
  * {
    margin: auto 0;
    background-color: #f6f9fc;
  }

  a {
    color: black;
  }

  .inputIn {
    border-width: 0.5px;
    outline: none;

    &:hover {
      border-color: black;
      border-width: 1px;
    }
    &:focus {
      border-color: #00cc66;
      border-width: 2px;
      box-shadow: none;
    }
  }

  i {
    color: red;
    @media (max-width: 767px) {
      font-size: 25px;
      margin-top: 5px;
    }
  }
`

const Summary = styled(ListGroup)`
  * {
    background-color: #f6f9fc;
  }
`

const CartScreen = () => {
  const { id } = useParams()

  const navigate = useNavigate()

  let { search } = useLocation()

  const qty = search ? Number(search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (id) {
      dispatch(addTocart(id, qty))
    }
  }, [dispatch, id, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const checkoutHandler = () => {
    if (userInfo) {
      navigate('/shipping')
    } else {
      navigate('/login')
    }
  }

  return (
    <>
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message varient='info'>
              Your cart is empty <GoBackLink to='/'> GO Back</GoBackLink>
            </Message>
          ) : (
            <ProductList variant='flush'>
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product} className='item'>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>Rs{item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as='select'
                        className='inputIn'
                        value={item.qty}
                      
                        onChange={(e) =>
                          dispatch(
                            addTocart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type='button'
                        variant='light'
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ProductList>
          )}
        </Col>
        <Col md={4}>
          <Summary variant='flush'>
            <ListGroupItem>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              RS
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroupItem>

            <CustomButton
              type='submit'
              onClick={checkoutHandler}
              className='col-12'
              visibility={cartItems.length}
            >
              Proceed To Checkout
            </CustomButton>
          </Summary>
        </Col>
      </Row>
      <br/> <br/> <br/> <br/> <br/><br/> <br/>
    </>
  )
}

export default CartScreen
