import { DataGrid } from '@mui/x-data-grid'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate,  } from 'react-router-dom'
import { Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import {
  removeProduct,
  createProduct,

  listProductsAdminOut,
} from '../../actions/productActions'

import { productRemoveReset } from '../../reducers/singleProductSlice'
import { productCreateReset } from '../../reducers/productCreateSlice'

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

const ProductOutListScreen = () => {
  //redux dispatch hook
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const location = useLocation()

  //getting product list from redux store
  const productList = useSelector((state) => state.adminProductsList)
  const { loading, error, products, success } = productList

  const productRemove = useSelector((state) => state.productDetails)
  const { error: removeError, success: removeSuccess } = productRemove

  const productCreate = useSelector((state) => state.createProduct)
  const {
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

  console.log(products)
  //get user
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const user = userInfo
  //   if(removeSuccess){
  //     toast.error(`User Removed!`,{
  //       position: "bottom-right",
  //       autoClose: 1000,
  //       theme: "colored",})
  //   }
  const path = location.pathname.split('/')[3]
  useEffect(() => {
    //resting state
    
    dispatch(productRemoveReset())
    dispatch(productCreateReset())

    if (user && user.isAdmin) {
      dispatch(listProductsAdminOut(path))
    } else {
      navigate('/login')
    }

  }, [dispatch, navigate, removeSuccess, successCreate, createProduct])

  const [selectionModel, setSelectionModel] = useState([])

  //remove
  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(removeProduct(id))
    }
  }

  //update

  const updateHandler = (id) => {
    if (selectionModel.length === 1) {
      window.open(`/admin/products/${path}/${id}/edit`)
    }
  }

  //create
  const createProductHandler = () => {
    navigate(`/admin/products/addReady`)
  }

  //side bar handling
  const [view, setView] = useState(true)
  const showSide = () => {
    setView(!view)
  }

  //data grid columns
  const columns = [
    { field: 'id',headerName: 'ID',  width: 220 },
    {
      field: 'IMAGE',
      headerName: 'Image',
      width: 100,
      renderCell: (params) => (
        <img src={params.value} style={{ width: '50px' }} />
      ), // renderCell will render the component
    },
    { field: 'NAME',headerName: 'Name',  flex: 1 },
    { field: 'CATEGORY',headerName: 'Category', flex: 1 },
  
    { field: 'BRAND', headerName: 'Brand',flex: 1 },
  
    { field: 'RATING', headerName: 'Rating',flex: 1 },
    { field: 'REVIEWNUMBER', headerName: 'No of Reviews', flex: 1 },
    { field: "supplier", headerName: "Supplier ID",  width: 220, },

    // {
    //   field: 'EDIT ',
    //   renderCell: (cellValues) => {
    //     return (
    //       selectionModel< 1 && (
    //         <Button
    //         variant='contained'
    //         onClick={() => updateHandler(selectionModel[0])}
    //       >
    //         <i className='fas fa-edit'></i>
    //       </Button>
    //     )
    //     )
    //   },
    // },
    // {
    //   field: 'DELETE ',
    //   renderCell: (cellValues) => {
    //     return (
    //       <Button
    //         variant='danger'
    //         className='btn-sm'
    //         onClick={() => deleteHandler(selectionModel[0])}
    //       >
    //         <i className='fas fa-trash'></i>
    //       </Button>
    //     )
    //   },
    // },
  ]

  //showing rows if product list is laoded
  let rows
  if (success) {
    console.log(success)
    rows = products.products?.map((row) => ({
      id: row._id,
      IMAGE: row.image,
      NAME: row.name,
      CATEGORY: row.category,
      BRAND : row.brand,
      RATING: row.rating,
      REVIEWNUMBER: row.numReviews,
      REORDERLEVEL: row.reOrderLevel,
      CREATEDAT: row.createdAt.slice(0, 16),
      supplier: row.supplierId
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
            Add Product
          </span>
        </Button>

        {selectionModel.length === 1 && (
          <Button
            className='p-0 pe-2'
            variant='contained'
            onClick={() => updateHandler(selectionModel)}
          >
            <EditOutlined style={{ color: 'orange' }} fontSize='small' />
            <span className='px-2' style={{ color: 'orange' }}>
              Edit
            </span>
          </Button>
        )}

        {selectionModel.length ===  1 && (
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


  //handling header
  let header = ''
  switch (path) {
    case 'active':
        header = "Active Products"
      break;
      case 'outofstock':
        header = "Out of Stock Products"
      break;
      case 'deactivated':
        header = "Deactivated Products"
      break;
  }

  return (
    <>
      <Row>
        <Col className='' sm={3}>
          <ToggleWrapper>
            <i className='fa fa-bars fa-2xl' onClick={showSide}></i>
          </ToggleWrapper>
          <Sidebar view={view} />
        </Col>

        <Col sm={9} clas>
          <main className='py-3 me-5'>
            {loading && <Loader />}
            {error && <Message varient='danger'>{error}</Message>}
            {removeError && <Message varient='danger'>{removeError}</Message>}
            {errorCreate && <Message varient='danger'>{errorCreate}</Message>}

            <h1>{header}</h1>
            {success && (
              <div style={{ height: 700, width: '100%' }}>
                <DataGrid
                  sx={{
                    boxShadow: 3,
                    border: 1,
                    borderColor: '#00cc66',
                    backgroundColor: 'white',
                    '& .MuiDataGrid-cell:hover': {
                      color: 'primary.main',
                    },
                  }}
                  
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  checkboxSelection
                  selectionModel={selectionModel}
                  hideFooterSelectedRowCount
                  onSelectionModelChange={(selection) => {
                    // if (selection.length > 1) {
                    //   const selectionSet = new Set(selectionModel)
                    //   const result = selection.filter((s) => !selectionSet.has(s))

                    //   setSelectionModel(result)
                    // } else {
                    //   setSelectionModel(selection)
                    // }

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

export default ProductOutListScreen
