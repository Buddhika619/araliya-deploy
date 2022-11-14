import { DataGrid } from '@mui/x-data-grid'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'

import Sidebar from '../../components/layouts/Sidebar'
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid'
import {
  AddBoxOutlined,
  DeleteOutlineOutlined,
  EditOutlined,
  Info,
  InfoOutlined,
  WidgetsOutlined,
} from '@material-ui/icons'

import FormContainer from '../../components/FormContainer'
import { listOrders } from '../../actions/orderActions'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Container } from 'react-bootstrap'
import styled from 'styled-components'

const ToggleWrapper = styled('div')`
  position: relative;
  * {
    position: absolute;
    top:-38px;
    left:20px;
   color: white;
   font-size: 35px;
  }
`

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [view, setView] = useState(true)
  const showSide = () => {
    setView(!view)
  }

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const user = userInfo

  //   if(removeSuccess){
  //     toast.error(`User Removed!`,{
  //       position: "bottom-right",
  //       autoClose: 1000,
  //       theme: "colored",})
  //   }

  useEffect(() => {
    if (user && user.isAdmin) {
      dispatch(listOrders())
    } else {
      navigate('/login')
    }
  }, [dispatch, navigate, user])

  return (
    <>
      <Row>
        <Col className='' sm={3}>
          <ToggleWrapper>
       
            <i  className='fa fa-bars fa-2xl' onClick={showSide}></i>
          </ToggleWrapper>

          <Sidebar view={view} />
        </Col>

        <Col sm={9}>
          <main className='py-3'></main>
        </Col>
      </Row>
    </>
  )
}

export default Dashboard
