import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { listProductsDetails, updateProduct } from '../../actions/productActions'
import { productUpdateReset } from '../../reducers/singleProductSlice'

import Spinner from '../../components/Spinner'
import { toast } from 'react-toastify'

const CreateListing = () => {
  const { id } = useParams()
 

  const [formData, setFormData] = useState({
    name: '',
    reOrderLevel: '',
    dailyCap: '',
    measurement: '',
  })

  const {
    name,
    reOrderLevel,
    dailyCap,
    measurement,
  
  } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()



  const productUpdate = useSelector((state) => state.productDetails)

  const {
    loading: loadingUpdate,
    error: loadingError,
    product: updatedProduct,
    success: successUpdate,
  } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch(productUpdateReset())
      toast.success('Success')
      setTimeout(function(){ window.close()   }, 1000);
    } 
  }, [id, dispatch, successUpdate])

  const onSubmit = async (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        name,
        reOrderLevel,
        dailyCap,
        measurement,
      })
    )
   
  }

  const onMutate = (e) => {
    let boolean = null

    if (e.target.value === 'true') {
      boolean = true
    }
    if (e.target.value === 'false') {
      boolean = false
    }

    // Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }))
    }

    // Text/Booleans/Numbers
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value, //if e.target.id is boolean set as true or false, if it's null set as e.target.value ?? ---nulish operator
      }))
    }
  }

 
  if (loadingUpdate) {
    return <Spinner />
  }

  console.log(location.pathname.split('/')[3])

  const path = location.pathname.split('/')[3]

  const back = () => {
    dispatch(productUpdateReset())
    navigate(`/admin/products/${path}`)
  }

  return (
    <div className='profile'>
      <main  className='pb-4'>
      <Button className='btn btn-light my-3' onClick={back}>
        Go Back
      </Button>
        <FormContainer>
          <form onSubmit={onSubmit}>
            <header>
              <p className='pageHeader'> Add Material</p>
            </header>
           
            <label className='formLabel'>Name</label>
            <input
              className='formInputName'
              type='text'
              id='name'
              value={name}
              onChange={onMutate}
              // maxLength='32'
              // minLength='10'
              required
            />
            <label className='formLabel'>Re Order Lvel</label>
            <input
              className='formInputName'
              type='number'
              id='reOrderLevel'
              min='0'
              value={reOrderLevel}
              onChange={onMutate}
              // maxLength='32'
              // minLength='10'
              required
            />

            <label className='formLabel'>Daily Capacity</label>
            <input
              className='formInputName'
              type='number'
              min='0'
              id='dailyCap'
              value={dailyCap}
              onChange={onMutate}
              // maxLength='32'
              // minLength='10'
              required
            />

            <label className='formLabel'>Measurement</label>
            <input
              className='formInputName'
              type='text'
              id='measurement'
              value={measurement}
              onChange={onMutate}
              // maxLength='32'
              // minLength='10'
              required
            />


          
            <button type='submit' className='primaryButton createListingButton'>
                Update
            </button>
          </form>
        </FormContainer> 
          
        <br/> <br/> <br/> <br/> <br/><br/> <br/>

      </main>
    </div>
  )
}

export default CreateListing
