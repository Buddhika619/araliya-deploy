import { DataGrid } from '@mui/x-data-grid'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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

const OrderListScreen = () => {
  //redux dispatch hook
  const dispatch = useDispatch()

  const navigate = useNavigate()

  //getting product list from redux store
  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders, success } = orderList

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
      console.log('lolbuwa')
    } else {
      navigate('/login')
    }
  }, [dispatch, navigate, user])

  //create

  //side bar handling
  const [view, setView] = useState(true)
  const showSide = () => {
    setView(!view)
  }

  const [selectionModel, setSelectionModel] = useState([])
  //details

  const detailsHandler = () => {
    navigate(`/order/${selectionModel[0]}`)
  }

  //data grid columns
  const columns = [
    { field: 'id', width: 220 },
    { field: 'USER', width: 250 },
    { field: 'CREATEDDATE', headerName: 'DATE CREATED', width: 150 },
    { field: 'TOTAL', width: 100 },
    // { field: 'PAID', width: 150 },

    {
      field: 'PAYMENTMETHOD',
      headerName: 'Payment Method',
      width: 150,
      renderCell: (params) =>
        params.value === 'cash' ? (
          <i
            className='fa-solid fa-sack-dollar fa-lg'
            style={{ color: 'green', margin: 'auto' }}
          ></i>
        ) : (
          <i
            className='fa-solid fa-credit-card fa-lg'
            style={{ color: 'skyblue', margin: 'auto' }}
          ></i>
        ), // renderCell will render the component
    },

    {
      field: 'PAID',
      width: 150,
      renderCell: (params) =>
        params.value === true ? (
          <i className='fa-solid fa-check' style={{ color: 'green' }}></i>
        ) : (
          <i className='fas fa-times' style={{ color: 'red' }}></i>
        ), // renderCell will render the component
    },

    { field: 'PAIDAT', headerName: 'PAID AT', width: 100 },
    {
      field: 'DELIVERED',
      width: 150,
      renderCell: (params) =>
        params.value === true ? (
          <i className='fa-solid fa-check' style={{ color: 'green' }}></i>
        ) : (
          <i className='fas fa-times' style={{ color: 'red' }}></i>
        ), // renderCell will render the component
    },
  ]

  //showing rows if product list is loaded
  let rows
  if (success) {
    rows = orders?.map((order) => ({
      id: order._id,
      USER: order.user && order.user.name,
      CREATEDDATE: order.createdAt.slice(0, 16),
      TOTAL: `Rs ${order.totalPrice}`,
      // PAID: order.isPaid + order.paidAt,
      PAYMENTMETHOD: order.paymentMethod,
      PAID: order.isPaid,
      PAIDAT: order.paidAt,
      DELIVERED: order.isDelivered,
    }))
  }

  // const { data } = useDemoData({
  //   dataSet: 'Employee',
  //   visibleFields: VISIBLE_FIELDS,
  //   rowLength: 100,
  // })

  //data grid tool bar
  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport printOptions={{ disableToolbarButton: false }} />

        {selectionModel.length === 1 && (
          <Button
            className='p-0 pe-2'
            variant='contained'
            onClick={detailsHandler}
          >
            <InfoOutlined style={{ color: '#1976d2' }} fontSize='small' />
            <span className='px-2' style={{ color: '#1976d2' }}>
              Details
            </span>
          </Button>
        )}
      </GridToolbarContainer>
    )
  }

  return (
    <>
      <Row >
        <Col  sm={3}>
        <ToggleWrapper>
       
       <i  className='fa fa-bars fa-2xl' onClick={showSide}></i>
     </ToggleWrapper>
          <Sidebar view={view} />
        </Col>

        <Col sm={9}>
          <main className='py-3'>
            {loading && <Loader />}
            {error && <Message varient='danger'>{error}</Message>}

            <h1>Orders</h1>
            {success && (
              <div style={{ height: 700, width: '100%' }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  checkboxSelection
                  selectionModel={selectionModel}
                  hideFooterSelectedRowCount
                  onSelectionModelChange={(selection) => {
                    setSelectionModel(selection)
                  }}
                  components={{
                    Toolbar: CustomToolbar,
                  }}
                />
              </div>
            )}
          </main>
        </Col>
      </Row>
    </>
  )
}

export default OrderListScreen
