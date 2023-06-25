import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader'
import {
  getUserDetails,
  logout,
  updateUserProfile,
} from '../actions/userActions'
import { myOrderList } from '../actions/orderActions'


import { Container } from 'react-bootstrap'
import { userUpdateReset } from '../reducers/userUpdateSlice'

import CustomButton from '../components/microComponents/CustomButton'

import { DataGrid } from '@mui/x-data-grid'



import {

  removeOrder,

} from '../actions/orderActions'

import { toast } from 'react-toastify'


import { orderRemoveReset } from '../reducers/orderRemoveSlice'


const Profile = () => {
  const [changeDetails, setChangeDetails] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordField, setPasswordField] = useState(false)

  const [selectedRows, setSelectedRows] = useState([])

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const uerDetails = useSelector((state) => state.userDetails)
  const {  error, user } = uerDetails
  //log out if token is not valid

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdate)
  const { success, error: updateError } = userUpdateProfile

  const myOrders = useSelector((state) => state.orderCreate)
  const {
    loading: loadingOrders,
    error: errorOrders,
    success: myOrderSuccess,
    orders,
  } = myOrders

  const orderRemove = useSelector((state) => state.orderRemove)
  const { error: removeError, success: removeSuccess } = orderRemove
  toast.error(removeError)
  console.log(removeError)


  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(removeOrder(id))
      setSelectedRows([])
    }

  }

  if (updateError) {
    toast.error(updateError)
  }

  if (success) {
    toast.success('Successfully updated the profile')
  }

  if (error && errorOrders === 'Not Authorized, token failed') {
    dispatch(logout())
  }
  dispatch(userUpdateReset())
  useEffect(() => {
    // dispatch(userUpdateReset())
    // dispatch(myOrdersReset())
    dispatch(orderRemoveReset())
    

    if (!userInfo) {
      navigate('/login')
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'))
        dispatch(myOrderList())
      } else {
        dispatch(myOrderList())
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [
    dispatch, navigate, userInfo, user, success ,removeSuccess,updateError
  ])

  let columns = ''

  if (window.screen.width > 400) {
    columns = [
      { field: 'id', headerName: 'ID',width: 270 },

      { field: 'TOTAL',headerName: 'AMOUNT(LKR)', width: 120 },
   
      {
        field: 'STATUS',
        headerName: 'Status',
        width: 150,
        renderCell: (params) =>
          params.value === 'completed' ? (
            <span className="badge rounded-pill bg-success ">Completed</span>
          ) : params.value === 'pending' ? (
            <span className="badge rounded-pill bg-danger ">Pending</span>
          ) : params.value === 'processing' ?(
            <span className="badge rounded-pill bg-warning text-dark ">processing</span>
          ) : (
            <span className="badge rounded-pill bg-info text-dark ">Dispatched</span>
          ), // renderCell will render the component
      },

      { field: 'CREATEDDATE', headerName: 'DATE ORDERED', width: 150 },
      { field: 'CREATEDTIME', headerName: 'TIME ORDERED', width: 150 },
      { field: 'DELIVEREDDATE', headerName: 'DATE DELIVERED', width: 150 },
      { field: 'DELIVEREDTIME', headerName: 'TIME DELIVERED', width: 150 },
      { field: 'PAYMENT', headerName: 'Payment Status', width: 120,
      renderCell: (params) =>
      params.value === true ? (
        <span className="badge rounded-pill bg-success ">Completed</span>
      ) :  (
        <span className="badge rounded-pill bg-danger ">Pending</span>
      )
     },
   
    ]
  } else {
    columns = [
      { field: 'id', width: 150 },

      { field: 'TOTAL', width: 90 },
      {
        field: 'STATUS',
       
        width: 100,
        renderCell: (params) =>
          params.value === 'completed' ? (
            <span className="badge rounded-pill bg-success ">Completed</span>
          ) : params.value === 'pending' ? (
            <span className="badge rounded-pill bg-danger ">Pending</span>
          ) : params.value === 'processing' ?(
            <span className="badge rounded-pill bg-warning text-dark ">processing</span>
          ) : (
            <span className="badge rounded-pill bg-info text-dark ">Dispatched</span>
          ), // renderCell will render the component
      },
    ]
  }



console.log(orders)
  let rows
  if (myOrderSuccess) {
    rows = orders?.map((order) => ({
   
      id: order._id,
      USER: order.user && order.user.name,
      STATUS: order.orderStatus,
      TOTAL: order.totalPrice,
      CREATEDDATE:  (order.createdAt).toString().slice(0,10),
      CREATEDTIME:new Date(order.createdAt).toString().slice(16, 21),
      DELIVEREDDATE: (order.deliveredAt && (order.createdAt).toString().slice(0,10)),
      DELIVEREDTIME: new Date(order.deliveredAt).toString().slice(16,21),
      PAYMENT: order.isPaid,
    }))
  }

  const onLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  const onSubmit = async () => {
    if (password !== confirmPassword) {
      toast.error('Passwords do not Match!')
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }


  console.log(window.screen.width)

  if (loadingOrders) {
    return <Loader />
  }

  return (
    <>
      <main>
      {myOrderSuccess && (
        <Container className='mt-2' style={{ height: '100vh' }}>
          <header className='profileHeader'>
            <p className='pageHeader'>My Profile</p>
            <button type='button' className='logOut' onClick={onLogout}>
              LogOut
            </button>
          </header>
          <div className='profile'>
            <div className='profileDetailsHeader'>
              <p className='profileDetailsText'>Personal Details</p>
              <p
                className='changePersonalDetails'
                onClick={() => {
                  setPasswordField(!passwordField)
                  changeDetails && onSubmit()
                  setChangeDetails(!changeDetails)
                }}
              >
                {changeDetails ? 'done' : 'change'}
              </p>
            </div>

            <div className='profileCard'>
              <form>
                <input
                  style={{ padding: '4px' }}
                  type='text'
                  id='name'
                  className={
                    !changeDetails ? 'profileName' : 'profileNameActive'
                  }
                  disabled={!changeDetails}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <input
                  style={{ padding: '4px', fontWeight: '600' }}
                  type='email'
                  id='email'
                  className={
                    !changeDetails ? 'profileEmail' : 'profileEmailActive'
                  }
                  disabled={!changeDetails}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {passwordField && (
                  <>
                    <input
                      style={{ padding: '4px' }}
                      type='password'
                      className={
                        !changeDetails ? 'profileEmail' : 'profileEmailActive'
                      }
                      disabled={!changeDetails}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder='Enter new password'
                    />

                    <input
                      style={{ padding: '4px' }}
                      type='password'
                      className={
                        !changeDetails ? 'profileEmail' : 'profileEmailActive'
                      }
                      disabled={!changeDetails}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder='Confirm password'
                    />
                  </>
                )}
              </form>
            </div>
            <h2>My orders</h2>

            {selectedRows.length === 1 && (
              <Link to={`/order/${selectedRows[0].id}`}>
                <CustomButton type='submit' color='#00cc66' className='col-12'>
                  View Order
                </CustomButton>
              </Link>
            )}

            {(selectedRows.length === 1 && selectedRows[0].STATUS=== 'pending') && (
              <CustomButton
                type='submit'
                onClick={() => deleteHandler(selectedRows[0].id)}
                color='#e94a65'
                className='col-12'
              >
                Delete Order
              </CustomButton>
            )}

            {myOrderSuccess && (
              <div style={{ height: 528, width: '100%' }}>
                <DataGrid
                  sx={{
                    border: 1,
                    borderColor: '#00cc66',
                    backgroundColor: 'white',
                    '& .MuiDataGrid-cell:hover': {
                      color: 'primary.main',
                    },
                  }}
                  rows={rows}
                  columns={columns}
                  pageSize={8}
                  onSelectionModelChange={(ids) => {
                    const selectedIDs = new Set(ids)
                    const selectedRows = rows.filter((row) =>
                      selectedIDs.has(row.id)
                    )
                    setSelectedRows(selectedRows)
                  }}

                  
                />
              </div>
            )}

            {/* <Link to='/createlisting' className='createListing'>
            <img src={homeIcon} alt='home' />
            <p>Sell or rent your home</p>
            <img src={arrowRight} alt='arrow Right' />
          </Link> */}
          </div>
        </Container>
      )}
        
        <br /> <br /> <br /> <br /> <br />
        <br /> <br />
      </main>
    </>
  )
}

export default Profile
