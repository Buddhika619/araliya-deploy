import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {
  listProducts,
  removeProduct,
  createProduct,
} from '../actions/productActions'

import {
  productRemoveReset,
} from '../reducers/singleProductSlice'
import {
  productCreateReset,
} from '../reducers/productCreateSlice'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ProductListScreen = () => {
  const { pagenumber } = useParams() || 1
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  const productRemove = useSelector((state) => state.productDetails)
  const {
    loading: removeLoading,
    error: removeError,
    success: removeSuccess,
  } = productRemove

  const productCreate = useSelector((state) => state.createProduct)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  //   if(removeSuccess){
  //     toast.error(`User Removed!`,{
  //       position: "bottom-right",
  //       autoClose: 1000,
  //       theme: "colored",})
  //   }

  useEffect(() => {
    dispatch(productRemoveReset())
    dispatch(productCreateReset())

    if (!userInfo.isAdmin) {
      navigate('/login')
    }

    if (successCreate) {
      navigate(`/admin/products/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts('', pagenumber))
    }
  }, [dispatch, navigate, removeSuccess, successCreate, createProduct,pagenumber])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(removeProduct(id))
    }
  }

  const createProductHandler = () => {
     dispatch(createProduct())
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-end'>
          <Button className='ml-100' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      <h1>Users</h1>
      {removeLoading && <Loader />}
      {removeError && <Message varient='danger'>{removeError}</Message>}
      {/* {loadingCreate && <Loader />}
      {errorCreate && <Message varient='danger'>{errorCreate}</Message>} */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message varient={'danger'}>{error}</Message>
      ) : (
        <>
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>Price</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>RS {product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/products/${product._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Paginate pages= {pages} page={page} isAdmin={true}/>
        </>
       
      )}
    </>
  )
}

export default ProductListScreen
