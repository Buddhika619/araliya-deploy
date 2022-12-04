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
  removeOffer,
} from '../../actions/configAction'
import { setConfigReset } from '../../reducers/configSlice'
import TestBuwa from '../TestBuwa'
import ImageCard from '../../components/ImageCard'
import { textAlign } from '@mui/system'

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
  })

  const [offer, setOffer] = useState({
    productId: '',
    exDate: '',
    text: '',
  })

  const { productId, exDate, text } = offer

  const configUpdate = useSelector((state) => state.configUpdate)
  const { loading, error, setSuccess } = configUpdate

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
      dispatch(removeOffer(id))
    }
  }

  const onMutate = (e) => {
    setOffer((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    dispatch(updateConfig({ formData, offer }))
    setOffer({})
  }

  //handling header
  let header = ''
  switch (path) {
    case 'carousel':
      header = 'Carousel Configuration'
      break
    case 'offers':
      header = 'Offers'
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
            {configData.offers && (
              <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>Product ID</th>
                    <th>Promo Text </th>
                    <th >Date</th>
                    <th ></th>
                  </tr>
                </thead>
                <tbody>
                  {configData.offers?.map((item, index) => (
                    <tr key={index}>
                      <td>{item.productId}</td>
                      <td>{item.text}</td>
                      <td>{new Date(item.exDate).toString()}</td>
                      <td style={{width:'100px', textAlign:'center'}}>
                        <i className='fa-solid fa-trash'  onClick={()=>onDelete(item._id) }></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}

            <FormContainer>
              <form onSubmit={onSubmit}>
                <label className='formLabel'>Product ID</label>
                <input
                  className='formInputName'
                  type='text'
                  id='productId'
                  value={productId}
                  onChange={onMutate}
                  required
                />
                <label className='formLabel'>Promo Text</label>
                <input
                  className='formInputName'
                  type='text'
                  id='text'
                  value={text}
                  onChange={onMutate}
                  required
                />
                <label className='formLabel'>Date</label>
                <input
                  className='formInputName'
                  type='datetime-local'
                  id='exDate'
                  value={exDate}
                  onChange={onMutate}
                  required
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
