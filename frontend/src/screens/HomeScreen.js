import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import { listProducts } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { useParams, Link } from 'react-router-dom'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

const HomeScreen = () => {
  // const notify = () => toast('Wow so easy!')
  const { keyword } = useParams()
  const { pagenumber } = useParams() || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)

  const { loading, error, products, success, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pagenumber))
  }, [dispatch, keyword, pagenumber])

  return (
    <>
       <Meta />
      {/* <div>
        <button onClick={notify}>Notify!</button>
        <ToastContainer />
      </div> */}

      {/* <h1>Latest Prodcuts</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message varient='danger'>{error}</Message>
      ) : (
        <Row>
        {console.log(products)}
          {products?.map((product, index) => (
            <Col sm={12} md={6} lg={4} xl={3} key={index}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )} */}
      {!keyword ? <ProductCarousel />: <Link to='/' className='btn btn-light'>Go Back</Link>}
      <h1>Latest Prodcuts</h1>
      {loading && <Loader />}
      {error && <Message varient='danger'>{error}</Message>}
      {success && (
        <>
          <Row>
            {products?.map((product, index) => (
              <Col sm={12} md={6} lg={4} xl={3} key={index}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default HomeScreen
