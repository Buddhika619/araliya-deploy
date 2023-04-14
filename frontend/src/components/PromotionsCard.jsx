import React from 'react'
import styled from 'styled-components'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import { Link } from 'react-router-dom'

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

const PromotionsCard = ({ data }) => {
  const [view, setView] = useState(true)

 const date =  new Date(data.exDate).toString().slice(0,10)
 const link = `/product/${data.productId}`
  return (
    <>
    
      {view && (
        <Wrapper>
          <div className='div1'>
            <p>Till {date}</p>
            <h1>{data.text}</h1>
            <Button variant='outline-danger' className='button'>
              <Link to={link}>
              Shop Now
              </Link>
              
            </Button>
          </div>
          <div className='div2'>
            <img
              src={data.image}
              alt='offer image'
            />
          </div>
        </Wrapper>
      )}
    </>
  )
}

export default PromotionsCard
