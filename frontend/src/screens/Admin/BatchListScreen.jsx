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

  EditOutlined,
} from '@material-ui/icons'
import styled from 'styled-components'
import {  removeMaterial } from '../../actions/materialActions'

import { listBatches } from '../../actions/batchActions'
import { viewBatchesReset } from '../../reducers/batchSlice'
import { updateBatchesReset } from '../../reducers/updateBatchSlice'

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

  const materialList = useSelector((state) => state.batchDetails)
  const { loading, error, success } = materialList
  console.log(materialList)

  const deleteMaterial = useSelector((state) => state.matrialDetails)
  const { rSuccess: removeSuccess, error: removeError } = deleteMaterial
  

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
    dispatch(viewBatchesReset())
    dispatch(updateBatchesReset())
    if (user && user.isAdmin) {
      dispatch(listBatches())
    } else {
      navigate('/login')
    }
  }, [dispatch,removeSuccess])

  const [selectionModel, setSelectionModel] = useState([])

  //remove
  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(removeMaterial(id))
    }
  }

  //update
  const updateHandler = (id) => {
    dispatch(viewBatchesReset())
    if (selectionModel.length > 0) {
      navigate(`/admin/batches/${id}/edit`)
    }
  }

  //side bar handling
  const [view, setView] = useState(true)
  const showSide = () => {
    setView(!view)
  }

 //create
 const createProductHandler = () => {
  dispatch(viewBatchesReset())
   
  navigate(`/admin/batches/add`)
}

  //data grid columns
  const columns = [
    { field: 'id',width: 220 },
    { field: 'name',flex:1  },
    { field: 'materialId',width: 220 },
    { field: 'productId', width: 220 },
    { field: 'originalQty', flex:1 },
    { field: 'qty',flex:1 },
    { field: 'cost',flex:1 },
    { field: 'date',flex:1 },
  ]

  //showing rows if product list is laoded
  let rows
  if (success) {
  
    rows = materialList?.batches.map((row) => ({
      id: row._id,
      name: (row.materialId) ? row.materialId?.name :  row.productId?.name,
      materialId: row.materialId && row.materialId._id,
      productId: row.productId && row.productId._id,
      qty: row.qty,
      cost: row.cost,
      originalQty: row.originalQty,
      date: row.createdAt
    
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
            Create A GRN
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

        {/* {selectionModel.length > 0 && (
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
        )} */}
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

            <h1>Batches</h1>
            {success && (
              <div style={{ height: 700, width: '95%' }}>
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

export default BatchListScreen
