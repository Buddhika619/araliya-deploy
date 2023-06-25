
import { useState, useEffect } from 'react'
import {  useLocation, useNavigate, useParams } from 'react-router-dom'
import { Button,  } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import FormContainer from '../../components/FormContainer'

import { productUpdateReset } from '../../reducers/singleProductSlice'

import Spinner from '../../components/Spinner'
import { toast } from 'react-toastify'

import { updateSupplier, viewSingleSupplier } from '../../actions/supplierActions'


const SupplierEditScreen = () => {
  const { id } = useParams()
 

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    contactNo: "",
  });

  const { name, email, address, contactNo } = formData;

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()


  const supplierDetails = useSelector((state) => state.supplierDetails)
  const { sloading, serror,suppliers, ssuccess } = supplierDetails

  console.log(id)

  const supplierUpdate = useSelector((state) => state.supplierDetails)


  const {
    uloading,
    uerror,
  
    usuccess,
  } = supplierUpdate
console.log(usuccess)
  
  useEffect(() => {
    
    if (ssuccess) {
       
      // toast.success('Success')
       setFormData(suppliers)
      // setTimeout(function(){ navigate('/admin/materials')   }, 1000);
    } else{
       
      dispatch(viewSingleSupplier(id))  
    }

    if(usuccess) {
        toast.success('Success')
        navigate('/admin/supplier') 
    }
  }, [id, ssuccess, usuccess])

  const onSubmit = async (e) => {
    e.preventDefault()

    const phoneRegex = /^(?:\+94|0)?(?:7\d{8}|0\d{2}-\d{7}|[1-9](?:\d{8}|\d{2}-\d{7}))$/;
  const isValid = phoneRegex.test(contactNo);
  if(isValid){
    dispatch(
      updateSupplier({
        _id: id,
        name, email, address, contactNo
      })
      
    )
  }else{
    toast.error('Invalid phone Number!')
  }

  
   
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
    navigate(`/admin/supplier`)
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

            <label className="formLabel">Name*</label>
            <input
              className="formInputName"
              type="text"
              id="name"
              value={name}
              onChange={onMutate}
              // maxLength='32'
              // minLength='10'
              required
            />

            <label className="formLabel">address*</label>
            <input
              className="formInputName"
              type="address"
              id="address"
              value={address}
              onChange={onMutate}
              // maxLength='32'
              // minLength='10'
              required
            />

            <label className="formLabel">contactNo*</label>
            <input
              className="formInputName"
              type="text"
              id="contactNo"
              value={contactNo}
              onChange={onMutate}
              // maxLength='32'
              // minLength='10'
              required
            />

            <label className="formLabel">email</label>
            <input
              className="formInputName"
              type="email"
              id="email"
              min="0"
              value={email}
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

export default SupplierEditScreen
