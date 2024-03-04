import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Col, Form, Row } from 'react-bootstrap'
import Product from '../components/Product'
import { listProducts } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

import Paginate from '../components/Paginate'
import { useParams, Link, useNavigate } from 'react-router-dom'
import MainCarousel from '../components/Carousels/MainCarousel'
import Meta from '../components/Meta'
import Header from '../components/layouts/Header'
import Footer from '../components/layouts/Footer'
import { Container } from 'react-bootstrap'
import TopRatedCarousel from '../components/Carousels/TopRatedCarousel'
import TopRateCarouselMobile from '../components/Carousels/TopRateCarouselMobile'
import styled from 'styled-components'

import PromotionsCard from '../components/PromotionsCard'
import MobileNavbar from '../components/layouts/MobileNavBar'
import { getConfigdata } from '../actions/configAction'



const Title = styled.div`
  text-align: center;

  h1 {
    font-size: 40px;
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


const PromoWrapper = styled(Container)`
 display: flex;
 justify-content: center;
 flex-wrap: wrap;
 @media (max-width: 1000px) {
    display: inline-block;
  }
`

const FilterWrapper = styled(Container)`
  background-color: white;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding-top: 10px;
  @media (max-width: 800px) {
    display: inline-block;
    padding-bottom: 10px;
  }
  .a {
    flex: 1;

    align-items: center;
  }

  .keyword {
    font-weight: 600;
    margin-top: 1px;
  }

  .resultCount {
    color: #7d879c;
    margin-top: -10px;
  }

  .b {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 10px;
    @media (max-width: 800px) {
      display: inline-block;
      margin:auto;
    }
  }

  span {
    padding-right: 10px;
    color: #7d879c;
  }
  .select {
    width: 200px;
    border-width: 0.5px;
    outline: none;
    border-color: #757272be;
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

  option {
    &:hover {
    }
  }
`

const HomeScreen = () => {
  // const notify = () => toast('Wow so easy!')




  const navigate = useNavigate()
  const { keyword, filter, category } = useParams()



  const { pagenumber } = useParams() || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)

  const { loading, error, products, success, page, pages, resultCount,categories } =
    productList

    const viewConfig = useSelector((state) => state.configUpdate)
    const { config: configData } = viewConfig


  console.log(configData)
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(listProducts(keyword, pagenumber, filter, category))
    dispatch(getConfigdata())
  }, [dispatch, keyword, pagenumber, filter,category])

  const handleChange = (e) => {
    //  setFilter(e.currentTarget.value)
    window.scrollTo(0, 800);
    if (keyword) {
      const filter = e.target.value

      navigate(`/search/${keyword}/sort/${filter}`)
    } else {
      const filter = e.target.value

      console.log(filter)
      navigate(`/sort/${filter}`)
    }


    if(category){
      const filter = e.target.value
      navigate(`/category/${category}/sort/${filter}`)
    }
  }

  let selectValue = filter

  switch (selectValue) {
    case 'asc':
      selectValue = 'Price Low to High'

      break
    case 'dsc':
      selectValue = 'Price High to Low'
      break
    case 'top':
      selectValue = 'Top Rated Products'
      break
    default:
      selectValue = 'Newest Product'
  }

  return (
    <>
      <Meta />

      <Header categories={categories}/>
      <main>
        <Col className='col-12'>
          {!keyword && !filter && !category? (
            <>
              <MainCarousel />
        

              <PromoWrapper>
              
              {configData?.offers?.map((offer,item) => (
                <Col lg={5} md={12} sm={12}  className='m-4' key={item}>
                <PromotionsCard data={offer} />
                </Col>
              ) )}
             
              </PromoWrapper>

              <Title>
                <h1>Top Rated Products</h1>
                <Line />
              </Title>

              <TopRatedCarousel />
              <TopRateCarouselMobile />

              <Title>
                <h1>Our All Products</h1>
                <Line />
              </Title>
            </>
          ) : (
            <Link to='/' className='btn btn-light mt-3'>
              Go Back
            </Link>
          )}

          <Container>
            {loading && <Loader />}
            {error && <Message varient='danger'>{error}</Message>}
            {success && (
              <>
                <FilterWrapper className='mb-4'>
                  <div className='a'>
                    {keyword && (
                      <>
                        <p className='keyword'> searching for " {keyword} "</p>
                        <p className='resultCount'>
                          {resultCount} results found
                        </p>
                      </>
                    )}
                  </div>
                  <div className='b'>
                    <span> Sort By:</span>
                    <Form.Select
                      className='select'
                      onChange={handleChange}
                    >
                      <option default>{selectValue}</option>
                      {filter !== 'new' && (
                        <option value='new'>Newest Product</option>
                      )}

                      {filter !== 'asc' && (
                        <option value='asc'>Price Low to High</option>
                      )}

                      {filter !== 'dsc' && (
                        <option value='dsc'>Price High to Low</option>
                      )}

                      {filter !== 'top' && (
                        <option value='top'>Top Rated Products</option>
                      )}
                    </Form.Select>
                  </div>
                </FilterWrapper>

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
                  category = {category ? category : ''}
                  filter = {filter ? filter: ''}
                />
              </>
            )}
          </Container>
        </Col>
        <br/> <br/> <br/> <br/> <br/><br/> <br/>
      </main>
      <Footer />
     
      <MobileNavbar/>
    
    </>
  )
}

export default HomeScreen
