import React from 'react'
import styled from 'styled-components'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'

const Wrapper = styled.div`
  background-color: #f5f5f5;
  display: flex;
  padding: 20px;
  
  @media (max-width: 510px) {
      
    }

  .div1 {
    flex: 2;
  }

  .button {
    padding: 5px 15px;
    &:hover {
      background-color: #ff000012;
    }
  }

  h1 {
    @media (max-width: 510px) {
      font-size: 20px;
    }
  }
  p {
    font-weight: 500;
  }

  .div1 {
    flex: 1;
  }
  img {
    width: 200px;
    @media (max-width: 510px) {
      width: 100px;
    }
  }
`

const PromotionsCard = ({ props }) => {
  const [view, setView] = useState(true)

  return (
    <>
      {view && (
        <Wrapper>
          <div className='div1'>
            <p>Till 10 Dec,2022</p>
            <h1>25% Special off Today Only for Whoppers</h1>
            <Button variant='outline-danger' className='button'>
              Shop Now
            </Button>
          </div>
          <div className='div2'>
            <img
              src='https://cdn.sanity.io/images/czqk28jt/prod_bk_us/f3d7588c1f46ad6a1afaa3404cec65ed6053879f-1333x1333.png?w=320&q=40&fit=max&auto=format'
              alt=''
            />
          </div>
        </Wrapper>
      )}
    </>
  )
}

export default PromotionsCard
