import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader'
import Message from '../Message'
import { listTopProducts } from '../../actions/productActions'
import styled from 'styled-components'
import { getConfigdata } from '../../actions/configAction'



const HeroCarousel = styled(Carousel)`

  background-color: #f5f5f5;
 
  height: 63vh;
  @media (max-width: 480px) {
    height: 35vh;
  }

  .carousel-item-next,
  .carousel-item-prev,
  .carousel-item.active {
    display: flex;
    position: relative;
  }

  .heroButton {
    position: absolute;
    border: none;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    top: 52vh;
    left: 46vw;
    width: 150px;
    height: 50px;
    background-color: #00cc66;
    @media (max-width: 480px) {
      display: none;
    }
  }

  .carousel-caption {
    position: absolute;
    top: 0;
  }

  .carousel-img {
    height: 50vh;
    padding: 30px;
    margin: 40px;

    margin-left: auto;
    margin-right: auto;

    @media (max-width: 480px) {
      height: 30vh;
    }
  }
  .carousel a {
    margin: 0 auto;
  }
`

const MainCarousel = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const viewConfig = useSelector((state) => state.configUpdate)
  const { loading, config, error } = viewConfig

  useEffect(() => {
    dispatch(getConfigdata())
  }, [dispatch])

  

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <HeroCarousel pause='hover' className='mb-5' variant='dark'>
      {config?.carousel?.map((item, index) => (
        <Carousel.Item key={index}>
          {/* <Link to={`/product/${product._id}`}> */}
       
       
          <Image
            src={item}
            alt={item}
            className='carousel-img '
            fluid
          />
          {/* <Carousel.Caption className='carousel-caption'>
            <h2>
              {product.name} (RS {product.price})
            </h2>
          </Carousel.Caption> */}
          {/* </Link> */}
        </Carousel.Item>
      ))}
    </HeroCarousel>
  )
}

export default MainCarousel
