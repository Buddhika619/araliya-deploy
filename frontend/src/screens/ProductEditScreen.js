import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductsDetails, updateProduct } from '../actions/productActions'
import { productUpdateReset } from '../reducers/singleProductSlice'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ProductEditScreen = () => {
  const { id } = useParams()
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState('')
  const [description, setDescription] = useState(0)
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productDetails)
  const {
    loading: loadingUpdate,
    error: loadingError,
    product: updatedProduct,
    success: successUpdate,
  } = productUpdate

  //   const uesrUpdate = useSelector((state) => state.userDetails)
  //   const {
  //     loading: loadingUpdate,
  //     error: errorUpdate,
  //     success: successUpdate,
  //   } = uesrUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch(productUpdateReset())
      navigate('/admin/productlist')
    } else {
      if (!product.name || product._id !== id) {
        dispatch(listProductsDetails(id))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
      }
    }
  }, [id, dispatch, product, successUpdate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    )
  }

  const reset = () => {
    dispatch(productUpdateReset())
  }

  return (
    <>
      <ToastContainer hideProgressBar={true} />
      <Link
        to='/admin/productlist'
        className='btn btn-light my-3'
        onClick={reset}
      >
        Go Back
      </Link>
      {/* {successUpdate && <Message varient='success'>Profile Updated</Message>} */}
      <FormContainer>
        <h1>Edit Product</h1>
        {/* {loadingUpdate && <Loader />}
        {errorUpdate && <Message varient='danger'>{errorUpdate}</Message>} */}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message varient='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
            </Form.Group>

              
            <Form.Group controlId='image-file' className='mb-3'>
                <Form.Control type='file'
                label='Choose File'
                onChange={uploadFileHandler} />
              </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>count In Stock</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Counter In Stock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button className='my-3' type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
