import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Checkoutsteps from '../components/Checkoutsteps'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../actions/cartActions'
import CustomButton from '../components/microComponents/CustomButton'
import styled from 'styled-components'


const Title = styled.div`
  text-align: center;

  h1 {
    
    font-weight: 500;
    font-family: 'Roboto', sans-serif;
  }
`
const Line = styled.div`
  margin: 0 auto;
  margin-top: -10px;
  margin-bottom: 25px;
  height: 2px;
  background-color: #d23f57;
  width: 250px;
`

const Wrapper = styled.div`

`

const PaymentScreen = () => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
  const navigate = useNavigate()

  if (!shippingAddress) {
    navigate('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('Cash')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }

  return (
    <>
      <FormContainer>
        <Checkoutsteps step1='step1' step2='step2'  />
        <Wrapper>
        <Title>
          <h1>Payment Method</h1>
          <Line />
        </Title>
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label as='legend'>Select Method</Form.Label>
              <Col>
                <Form.Check
                  type='radio'
                  label='Cash on Delivery'
                  id='cash'
                  name='paymentMethod'
                  value='cash'
                  checked
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>

                <Form.Check
                  type='radio'
                  label='PayPal or Credit Card'
                  id='PayPal'
                  name='paymentMethod'
                  value='PayPal'
                  disabled
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
              </Col>
            </Form.Group>

            <CustomButton type='submit'> Continue</CustomButton>
          </Form>
        </Wrapper>
      </FormContainer>
    </>
  )
}


export default PaymentScreen
