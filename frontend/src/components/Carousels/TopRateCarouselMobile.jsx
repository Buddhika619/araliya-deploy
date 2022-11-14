import Carousel from 'react-bootstrap/Carousel'
import { Button, Card, CardGroup, Col, Container } from 'react-bootstrap'
import styled from 'styled-components'

import Product from '../Product'

import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader'
import Message from '../Message'
import { listTopProducts } from '../../actions/productActions'

const HeroCarousel = styled(Carousel)`
  /* margin: 0 100px 0 140px; */
  
  display: none;
  @media (max-width: 480px) {
    display: block;
    padding-bottom: 20px;
  }
`

const HeroCol = styled(Col)`
  /* margin: 0 100px 0 140px; */
  display: flex;
  justify-content: space-around;
`

const TopRateCarouselMobile = () => {
  const dispatch = useDispatch()

  const productTopRated = useSelector((state) => state.productTopRated)
  const { loading, success, error, products } = productTopRated

 


  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  return (
    <HeroCarousel variant='dark'>
          {products?.map((product, index) => (
      <Carousel.Item key={index}>
        <Container>
          <HeroCol sm={12}>
          
      
              <Col  key={index}>
                <Product product={product} />
              </Col>
     
          </HeroCol>
        </Container>
      </Carousel.Item>
      ))}
   
    </HeroCarousel>
  )
}

export default TopRateCarouselMobile
