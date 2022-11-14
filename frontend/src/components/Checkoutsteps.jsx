import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import styled from 'styled-components'

const CheckoutNav = styled(Nav)`
  .link {
    color: #4bb543;
    font-weight: 500;
  }
  i {
    margin-right: 5px;
  }
`

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <CheckoutNav className='justify-content-center mb-4'>
      <Nav.Item>
        {step1 ? (
          <LinkContainer to='/login'>
            <Nav.Link className='link'>
              <i className='fa-sharp fa-solid fa-circle-check fa-lg'></i> Sign
              In
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Sign In</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to='/shipping'>
            <Nav.Link className='link'>
              <i className='fa-sharp fa-solid fa-circle-check fa-lg'></i>{' '}
              Shipping
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to='/payment'>
            <Nav.Link className='link'>
              <i className='fa-sharp fa-solid fa-circle-check fa-lg'></i>{' '}
              Payment
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to='/placeorder'>
            <Nav.Link className='link'>
              <i className='fa-sharp fa-solid fa-circle-check fa-lg'></i> Place
              Order
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Place Order</Nav.Link>
        )}
      </Nav.Item>
    </CheckoutNav>
  )
}

export default CheckoutSteps
