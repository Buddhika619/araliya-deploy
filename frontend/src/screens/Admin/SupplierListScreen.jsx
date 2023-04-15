import { DataGrid } from '@mui/x-data-grid'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'

import { listUsers, removeUser } from '../../actions/userActions'
import { removeUserReset } from '../../reducers/userDetailsSlice'

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
} from '@material-ui/icons'
import styled from 'styled-components'
import { listMaterials, removeMaterial } from '../../actions/materialActions'
import { viewMatrialsReset } from '../../reducers/matrialSlice'
import { listSuppliers, removeSupplier } from '../../actions/supplierActions'
import { viewSingleSupplierReset, viewSupplierReset } from '../../reducers/supplierSlice'

const ToggleWrapper = styled('div')`
  position: relative;
  * {
    position: absolute;
    top:-38px;
    left: 20px;
    color: white;
    font-size: 35px;
  }
`

const SuppplierListScreen = () => {
  //redux dispatch hook
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const supplierList = useSelector((state) => state.supplierDetails)
  const { loading, error, success } = supplierList

  const deleteSupplier = useSelector((state) => state.supplierDetails)
  const { rSuccess: removeSuccess, error: removeError } = deleteSupplier
  
 console.log(supplierList)
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
    dispatch(viewSupplierReset())
    dispatch(viewSingleSupplierReset());
    if (user && user.isAdmin) {
      dispatch(listSuppliers())
    } else {
      navigate('/login')
    }
  }, [dispatch,removeSuccess])

  const [selectionModel, setSelectionModel] = useState([])

  //remove
  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(removeSupplier(id))
    }
  }

  //update
  const updateHandler = (id) => {
    dispatch(viewSupplierReset())
    dispatch(viewSingleSupplierReset());
    if (selectionModel.length > 0) {
      navigate(`/admin/supplier/${id}/edit`)
    }
  }

  //side bar handling
  const [view, setView] = useState(true)
  const showSide = () => {
    setView(!view)
  }

 //create
 const createProductHandler = () => {
  dispatch(viewSupplierReset())
   
  navigate(`/admin/supplier/add`)
}

  //data grid columns
  const columns = [
    { field: 'id', flex: 1 },
    { field: 'name', flex: 1},
    { field: 'email', flex: 1 },
    { field: 'address', flex: 1 },
    { field: 'contactNo', flex: 1 },


   
  ]

  //showing rows if product list is laoded
  let rows
  if (success) {
    console.log(success)
    rows = supplierList?.suppliers.map((row) => ({
      id: row._id,
      name: row.name,
      email: row.email,
      address: row.address,
      contactNo: row.contactNo,
    }))
  }

  //data grid tool bar
  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport printOptions={{ disableToolbarButton: false }} />

        <Button
          className='p-0'
          variant='contained'
          onClick={createProductHandler}
        >
          <AddBoxOutlined
            color='primary'
            fontSize='small'
            style={{ color: '#4cbb17' }}
          />
          <span className='px-2' style={{ color: '#4cbb17' }}>
            Add Material
          </span>
        </Button>




        {selectionModel.length === 1 && (
          <Button
            className='p-0 pe-2'
            variant='contained'
            onClick={() => updateHandler(selectionModel[0])}
          >
            <EditOutlined style={{ color: 'orange' }} fontSize='small' />
            <span className='px-2' style={{ color: 'orange' }}>
              Edit
            </span>
          </Button>
        )}

        {selectionModel.length > 0 && (
          <Button
            className='p-0 pe-2'
            variant='contained'
            onClick={() => deleteHandler(selectionModel)}
          >
            <DeleteOutlineOutlined
              color='primary'
              fontSize='small'
              style={{ color: 'red' }}
            />
            <span className='px-2' style={{ color: 'red' }}>
              Delete
            </span>
          </Button>
        )}
      </GridToolbarContainer>
    )
  }

  return (
    <>
      <Row >
        <Col className='' sm={3}>
          <ToggleWrapper>
            <i className='fa fa-bars fa-2xl' onClick={showSide}></i>
          </ToggleWrapper>
          <Sidebar view={view} />
        </Col>

        <Col sm={9}>
          <main className='py-3'>
            {loading && <Loader />}
            {error && <Message varient='danger'>{error}</Message>}
            {removeError && <Message varient='danger'>{removeError}</Message>}

            <h1>Suppliers</h1>
            {success && (
              <div style={{ height: 700, width: '90%' }}>
                <DataGrid
                 sx={{
                    boxShadow: 3,
                    border: 1,
                    borderColor: "#00cc66",
                    backgroundColor: "white",
                    "& .MuiDataGrid-cell:hover": {
                      color: "primary.main",
                    },
                  }}
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

export default SuppplierListScreen
