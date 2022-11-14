import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card,  Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import {
  listProductsDetails,
  createProductReview,
} from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { productCreateReviewReset } from '../reducers/productReviewSlice'
import Meta from '../components/Meta'
import styled from 'styled-components'
import CustomButton from '../components/microComponents/CustomButton'

const DetailsWrapper = styled(Row)`
  * {
    background-color: #f6f9fc;
  }

  /* img {
    &:hover {
      scale: 1.3;
      cursor: zoom-in;
      display: block;
      margin: 10%;
    }

    @media (max-width: 1000px) {
      &:hover {
        scale: 1;
        cursor: zoom-in;
        display: inline-block;
        margin: auto;
      }
    }
  } */
`

const Reviews = styled(ListGroup)`
  * {
    background-color: #f6f9fc;
  }

  .input {
    border-width: 0.5px;
    outline: none;

    &:hover {
      border-color: black;
      border-width: 1px;
    }
    &:focus {
      border-color: #d23f57;
      border-width: 2px;
      box-shadow: none;
    }
  }
`

const ProductScreen = () => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, product, error } = productDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector((state) => state.productReview)
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate

  const { id } = useParams()

  useEffect(() => {
    dispatch(listProductsDetails(id))
    dispatch(productCreateReviewReset())
    if (successProductReview) {
      alert('Review Submitted!')
      setRating(0)
      setComment('')
      dispatch(productCreateReviewReset())
    }
  }, [dispatch, id, successProductReview])

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(id, {
        rating,
        comment,
      })
    )
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message varient='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <DetailsWrapper>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: RS {product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>RS {product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Availability:</Col>
                      <Col>
                        <strong>
                          {product.countInStock > 0 ? 'Available' : 'Sold Out'}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Select
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Select>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <CustomButton
                      type='submit'
                      onClick={addToCartHandler}
                      className='col-12'
                      visibility={product.countInStock}
                    >
                      Add To Cart
                    </CustomButton>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </DetailsWrapper>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews < 1 && <Message>No Reviewss</Message>}
              <Reviews variant='flush'>
                {product.reviews?.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.slice(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {errorProductReview && (
                    <Message varient='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          className='input'
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option className='input' value=''>
                            Select...
                          </option>
                          <option value='1'>1 - Very Poor</option>
                          <option value='2'>2 - Poor</option>
                          <option value='3'>3 - Fair</option>
                          <option value='4'>4 - Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          className='input'
                          as='textarea'
                          row='3'
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <CustomButton type='submit'>Submit</CustomButton>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </Reviews>
              <ListGroup.Item></ListGroup.Item>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen
