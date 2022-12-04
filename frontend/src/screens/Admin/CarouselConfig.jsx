import { useState, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from '../../components/layouts/Sidebar'
import Loader from '../../components/Loader'

import styled from 'styled-components'

import axios from 'axios'
import { toast } from 'react-toastify'
import FormContainer from '../../components/FormContainer'
import {
  updateConfig,
  getConfigdata,
  removeCarousel,
} from '../../actions/configAction'
import { setConfigReset } from '../../reducers/configSlice'
import TestBuwa from '../TestBuwa'
import ImageCard from '../../components/ImageCard'

const ToggleWrapper = styled('div')`
  position: relative;
  * {
    position: absolute;
    top: -38px;
    left: 20px;
    color: white;
    font-size: 35px;
  }
`

const CarouselConfig = () => {
  //redux dispatch hook
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const location = useLocation()

  const [uploading, setUploading] = useState(false)

  const [formData, setFormData] = useState({
    image: '',
    offer: {},
  })

  
  const [offer, setOffer] = useState({
    productId: '',
    exDate: '',
    text: ''
  })


  const { image } = formData

  const configUpdate = useSelector((state) => state.configUpdate)
  const { loading, error, setSuccess } = configUpdate

  console.log(setSuccess)
  const viewConfig = useSelector((state) => state.configUpdate)
  const { loading: dataLoading, config: configData } = viewConfig

  if (error) {
    toast.error(error)
  }

  //get user
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const user = userInfo

  const path = location.pathname.split('/')[3]
  useEffect(() => {
    //reseting state
    dispatch(setConfigReset())
    if (user && user.isAdmin) {
      dispatch(getConfigdata())
    } else {
      navigate('/login')
    }
  }, [setSuccess,error])

  //side bar handling
  const [view, setView] = useState(true)
  const showSide = () => {
    setView(!view)
  }

  const onDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      dispatch(removeCarousel(id))
    }
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    dispatch(updateConfig({formData, offer}))
  }

  const onMutate = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const uploadFileHandler = async (e) => {
    dispatch(setConfigReset())
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
      console.log(data)
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: data,
      }))

      setUploading(false)
    } catch (error) {
      toast.error('Image upload Failed')
      setUploading(false)
    }
  }

  //handling header
  let header = ''
  switch (path) {
    case 'carousel':
      header = 'Carousel Configuration'
      break
    case 'outofstock':
      header = 'Out of Stock Products'
      break
    case 'deactivated':
      header = 'Deactivated Products'
      break
  }

  if (uploading || dataLoading || loading) {
    return <Loader />
  }

  // if(loading) {
  //   return <Loader/>
  // }

  return (
    <>
      <Row>
        <Col className='' sm={3}>
          <ToggleWrapper>
            <i className='fa fa-bars fa-2xl' onClick={showSide}></i>
          </ToggleWrapper>
          <Sidebar view={view} />
        </Col>

        <Col sm={9}>
          <main className='py-3 me-5'>
            {/* {loading && <Loader />} */}

            <h1>{header}</h1>
            {configData && (
              <div style={{ marginRight: '30%' }}>
                {configData.carousel?.map((item, index) => (
                  <ImageCard
                    image={item}
                    key={index}
                    onDelete={() => onDelete(index)}
                  />
                ))}
              </div>
            )}

            <FormContainer>
              <form onSubmit={onSubmit}>
                <label className='formLabel'>Image</label>
                <input
                  className='formInputName'
                  type='text'
                  id='image1'
                  value={image}
                  onChange={onMutate}
                  required
                  // maxLength='32'
                  // minLength='10'
                />
                <input
                  className='formInputFile'
                  type='file'
                  label='Choose File'
                  id='image'
                  onChange={uploadFileHandler}
                  // max='6'
                  // accept='.jpg,.png,.jpeg'
                />

                <button
                  type='submit'
                  className='primaryButton createListingButton'
                >
                  Update
                </button>
              </form>
            </FormContainer>
          </main>
        </Col>
      </Row>
    </>
  )
}

export default CarouselConfig
