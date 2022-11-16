import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader'
import Message from '../Message'
import { listTopProducts } from '../../actions/productActions'
import styled from 'styled-components'



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

  const productTopRated = useSelector((state) => state.productTopRated)
  const { loading, error, products } = productTopRated

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  const pramoHandler = (id) => {
    navigate(`/product/${id}`)
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <HeroCarousel pause='hover' className='mb-5' variant='dark'>
      {products?.map((product) => (
        <Carousel.Item key={product._id}>
          {/* <Link to={`/product/${product._id}`}> */}
          <Button
            className='heroButton'
            onClick={() => pramoHandler(product._id)}
          >
            Buy Now
          </Button>
          <Image
            src='https://cdn.glitch.global/04ac2eab-7093-47ad-976f-739938dcbb74/food-delivery-man-with-motorcycles-customers-ordering-on-the-mobile-application-the-motorcyclist-goes-according-to-the-gps-map-decorated-with-smartphone-scddooters-food-bags-paper-coffee-mugs-vector.png?v=1667918485087'
            alt={product.name}
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
