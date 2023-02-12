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
import { listMaterials } from '../../actions/materialActions'

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

const MaterialListScreen = () => {
  //redux dispatch hook
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const materialList = useSelector((state) => state.matrialDetails)
  const { loading, error, users, success } = materialList
console.log(materialList)
  const userDelete = useSelector((state) => state.userDetails)
  const { success: removeSuccess, error: removeError } = userDelete
  

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
      dispatch(listMaterials())
    } else {
      navigate('/login')
    }
  }, [dispatch])

  const [selectionModel, setSelectionModel] = useState([])

  //remove
  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(removeUser(id))
    }
  }

  //update
  const updateHandler = (id) => {
    if (selectionModel.length > 0) {
      navigate(`/admin/user/${id}/edit`)
    }
  }

  //side bar handling
  const [view, setView] = useState(true)
  const showSide = () => {
    setView(!view)
  }

  //data grid columns
  const columns = [
    { field: 'id', width: 220 },
    { field: 'name', width: 250 },
    { field: 'reOrderLevel', width: 100 },

   
  ]

  //showing rows if product list is laoded
  let rows
  if (success) {
    console.log(success)
    rows = materialList?.matrials.map((row) => ({
      id: row._id,
      name: row.name,
      reOrderLevel: row.reOrderLevel,
      dailyCap: row.dailyCap,
      measurement: row.measurement,
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

            <h1>Products</h1>
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

export default MaterialListScreen
