import { DataGrid } from '@mui/x-data-grid'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import {

  removeProduct,
  createProduct,
  listProductsAdmin,
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
import { productListReset } from '../../reducers/productsSlice'

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

const ProductListScreen = () => {
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
      dispatch(listProductsAdmin(path))
    } else {
      navigate('/login')
    }

    if (successCreate) {
      navigate(`/admin/products/${path}/${createdProduct._id}/edit`)
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
      navigate(`/admin/products/${path}/${id}/edit`)
    }
  }

  //create
  const createProductHandler = () => {
    dispatch(createProduct())
  }

  //side bar handling
  const [view, setView] = useState(true)
  const showSide = () => {
    setView(!view)
  }

  //data grid columns
  const columns = [
    { field: 'id', width: 220 },
    { field: 'NAME', width: 250 },
    { field: 'CATEGORY', width: 100 },
    { field: 'PRICE', width: 100 },
    {
      field: 'IMAGE',
      width: 150,
      editable: true,
      renderCell: (params) => (
        <img src={params.value} style={{ width: '50px' }} />
      ), // renderCell will render the component
    },
    { field: 'CREATEDAT', width: 150 },

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
      NAME: row.name,
      CATEGORY: row.category,
      PRICE: `Rs ${row.price}`,
      IMAGE: row.image,
      CREATEDAT: row.createdAt.slice(0, 16),
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

        <Col sm={9} clas>
          <main className='py-3 me-5'>
            {loading && <Loader />}
            {error && <Message varient='danger'>{error}</Message>}
            {removeError && <Message varient='danger'>{removeError}</Message>}
            {errorCreate && <Message varient='danger'>{errorCreate}</Message>}

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

export default ProductListScreen
