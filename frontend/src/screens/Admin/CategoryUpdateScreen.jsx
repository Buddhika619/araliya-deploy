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
import { createMaterial, updateMaterials, viewSingleMaterial } from '../../actions/materialActions'
import { viewMatrialsReset } from '../../reducers/matrialSlice'
import { updateSupplier, viewSingleSupplier } from '../../actions/supplierActions'
import { viewSingleSupplierReset, viewSupplierReset } from '../../reducers/supplierSlice'
import { updateCategory, viewSingleCategory } from '../../actions/categoryActions'

const CategoryUpdateScreen = () => {
  const { id } = useParams()
 

  const [formData, setFormData] = useState({
    category: "",
  });

  const { category} = formData;

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()


  const categoryDetails = useSelector((state) => state.categoryDetails)
  const { sloading, serror,category: categoryData, ssuccess } = categoryDetails

  console.log(id)

  const categoryUpdate = useSelector((state) => state.categoryDetails)


  const {
    uloading,
    uerror,
  
    usuccess,
  } = categoryUpdate
console.log(usuccess)
  
  useEffect(() => {
    
    if (ssuccess) {
       
      // toast.success('Success')
       setFormData(categoryData)
      // setTimeout(function(){ navigate('/admin/materials')   }, 1000);
    } else{
       
      dispatch(viewSingleCategory(id))  
    }

    if(usuccess) {
        toast.success('Success')
        navigate('/admin/category') 
    }
  }, [id, ssuccess, usuccess])

  const onSubmit = async (e) => {
    e.preventDefault()
    dispatch(
      updateCategory({
        _id: id,
        category
      })
      
    )
   
    // toast.success('Success')
    // setTimeout(function(){ navigate('/admin/supplier')   }, 1000);
 
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

 
  if (uloading) {
    return <Spinner />
  }



  const path = location.pathname.split('/')[3]

  const back = () => {
    dispatch(productUpdateReset())
    navigate(`/admin/category`)
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
              <p className="pageHeader"> Update Supplier</p>
            </header>

            <label className="formLabel">Category</label>
            <input
              className="formInputName"
              type="text"
              id="category"
              min="0"
              value={category}
              onChange={onMutate}
              // maxLength='32'
              // minLength='10'
              
            />

            <button type="submit" className="primaryButton createListingButton">
              Update
            </button>
          </form>
        </FormContainer>
          
        <br/> <br/> <br/> <br/> <br/><br/> <br/>

      </main>
    </div>
  )
}

export default CategoryUpdateScreen
