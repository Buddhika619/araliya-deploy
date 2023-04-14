import { DataGrid } from '@mui/x-data-grid'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Row, Col } from 'react-bootstrap'
import { batch, useDispatch, useSelector } from 'react-redux'
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
import { listBatches, listKitchenReservations } from '../../actions/batchActions'
import { viewBatchesReset } from '../../reducers/batchSlice'

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

const BatchListScreen = () => {
  //redux dispatch hook
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const kitchenList = useSelector((state) => state.kitchenDetails)
  const { loading, error, success } = kitchenList
  console.log(kitchenList)


   //side bar handling
   const [view, setView] = useState(true)
   const showSide = () => {
     setView(!view)
   }
 

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const user = userInfo

  useEffect(() => {
   
    if (user && user.isAdmin) {
      dispatch(listKitchenReservations())
    } else {
      navigate('/login')
    }
  }, [dispatch])

  const [selectionModel, setSelectionModel] = useState([])

  //remove
 

  //data grid columns
  const columns = [
    { field: 'id',flex:1 },
    { field: 'name',width:150  },

    { field: 'requestId', flex:1 },
    { field: 'date',flex:1 },
    { field: 'qty',flex:1 },
  ]

  //showing rows if product list is laoded
  let rows
  if (success) {
  
    rows = kitchenList?.kitchenList.map((row) => ({
      id: row._id,
      name:  row.materialId.name,
      requestId: row.requestId,
      date: Date(row.createdAt),
      qty: row.qty,
     
    
    }))
  }

  //data grid tool bar
  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />

     
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
           

            <h1>Kitchn Reservations List</h1>
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

export default BatchListScreen
