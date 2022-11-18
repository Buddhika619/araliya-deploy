import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, FormGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Checkoutsteps from '../components/Checkoutsteps'
import FormContainer from '../components/FormContainer'
import { ShippingDetails } from '../actions/cartActions'
import styled from 'styled-components'
import CustomButton from '../components/microComponents/CustomButton'
import { toast } from 'react-toastify'
import axios from 'axios'
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
  background-color: #00cc66;
  width: 250px;
`

const ShippingForm = styled(Form)`
  * {
    margin: 5px 0px;
  }
  .inputIn {
    border-width: 0.5px;
    outline: none;
    background-color: #f6f9fc;

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
`

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
  const navigate = useNavigate()

  const [lineOne, setLineOne] = useState(shippingAddress.lineOne)
  const [lineTwo, setLineTwo] = useState(shippingAddress.lineTwo)
  const [lineThree, setLineThree] = useState(shippingAddress.lineThree)
  const [phone, setPhone] = useState(shippingAddress.phone)
  const [location, setLocation] = useState({
    lat: '',
    long: '',
  })

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    if (location.lat > 0 ) {
      dispatch(
        ShippingDetails({ lineOne, lineTwo, lineThree, phone, location })
      )
      navigate(`/payment/${location.lat}-${location.long}`)
    } else {
      toast.error('Location not available')
    }
  }

  useEffect(() => {
    async function getLocation() {
      if (navigator.geolocation) {
        await navigator.geolocation.getCurrentPosition(showPosition)
      } else {
        console.log('dddd')
      }
    }

    async function showPosition(position) {
      const lat = await position?.coords.latitude
      const long = await position?.coords.longitude
      setLocation({ lat, long })
    }

    getLocation()
    showPosition()


     
    
   
  }, [])
  return (
    <>
      <FormContainer>
        <Checkoutsteps step1='step1' />
        <Title>
          <h1>Shipping</h1>
          <Line />
        </Title>
        <ShippingForm onSubmit={submitHandler} className='form'>
          <Form.Group controlId='lineOne'>
            <Form.Label>Address Line One</Form.Label>
            <Form.Control
              className='inputIn'
              type='text'
              placeholder='Enter Address Line One'
              value={lineOne}
              required
              onChange={(e) => setLineOne(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='lineTwo'>
            <Form.Label>Address Line Two</Form.Label>
            <Form.Control
              type='text'
              className='inputIn'
              placeholder='Enter Address Line Two'
              value={lineTwo}
              required
              onChange={(e) => setLineTwo(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='lineThree'>
            <Form.Label>Address Line Three</Form.Label>
            <Form.Control
              type='text'
              className='inputIn'
              placeholder='Enter Address Line Three'
              value={lineThree}
              required
              onChange={(e) => setLineThree(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='phone'>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type='text'
              className='inputIn'
              placeholder='Enter Phone Number'
              value={phone}
              required
              onChange={(e) => setPhone(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <CustomButton type='submit'>Continue</CustomButton>
        </ShippingForm>
      </FormContainer>
      <br/> <br/> <br/> <br/> <br/><br/> <br/>
    </>
  )
}

export default ShippingScreen
