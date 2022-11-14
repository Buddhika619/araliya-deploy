import React from 'react'
import styled from 'styled-components'
import Button from 'react-bootstrap/Button';

const Wrapper = styled.div`
  background-color: #f5f5f5;
  display: flex;
  padding:20px;
  

  .div1{
    flex:2;
  }

  .button{
    padding: 5px 15px;
    &:hover{
      background-color: #ff000012;
    }
  }
  p{
    font-weight: 500;
  }

  .div1{
    flex:1;
  }
  img{
    width:200px
  }
`



const TestBuwa = ({ props }) => {
  return (
    <Wrapper>
      <div className='div1'>
        <p >Till 10 Dec,2021</p>
        <h1>25% Special off Today Only for Vegetables</h1>
        <Button variant="outline-danger" className='button'>Shop Now</Button>
      </div>
      <div className='div2'>
        <img
          src='https://bazaar.ui-lib.com/_next/image?url=%2Fassets%2Fimages%2FGroceries%20Shop%2FOffer%20Card.png&w=1080&q=75'
          alt='' 
        />
      </div>
    </Wrapper>
  )
}

export default TestBuwa
