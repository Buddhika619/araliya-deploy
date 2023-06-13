import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  removeProduct,
  createProduct,
  listProductsAdmin,
  listProductsAdminOut,
} from "../../actions/productActions";
import { toast } from "react-toastify";
import { productRemoveReset } from "../../reducers/singleProductSlice";
import { productCreateReset } from "../../reducers/productCreateSlice";

import Sidebar from "../../components/layouts/Sidebar";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import {
  AddBoxOutlined,
  DeleteOutlineOutlined,
  EditOutlined,
} from "@material-ui/icons";
import styled from "styled-components";
import { productListReset } from "../../reducers/productsSlice";
import { listMaterialsStock } from "../../actions/materialActions";
import { allocateBulkKitchn, allocateManualKitchen } from "../../actions/batchActions";

const ToggleWrapper = styled("div")`
  position: relative;
  * {
    position: absolute;
    top: -38px;
    left: 20px;
    color: white;
    font-size: 35px;
  }
`;

const MaterialStockScreen = () => {
  //redux dispatch hook
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  //getting product list from redux store
  const materialList = useSelector((state) => state.materialStockDetails);
  const { loading, error, materials, success } = materialList;

  const bulkAsign = useSelector((state) => state.materialStockDetails);
  const { aloading, aerror, asuccess } = bulkAsign;

  const manualAssign = useSelector((state) => state.materialStockDetails);
  const { mloading, merror, msuccess } = manualAssign;

    if(merror) {
      toast.error(merror)
    }




  //get user
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const user = userInfo;

  const path = location.pathname.split("/")[3];
  useEffect(() => {
    //resting state

    dispatch(productRemoveReset());
    dispatch(productCreateReset());

    if (user && user.isAdmin) {
      dispatch(listMaterialsStock());
    } else {
      navigate("/login");
    }

    if(msuccess) {
      toast.success("Success!")
    }
  }, [dispatch, navigate,asuccess,msuccess,  createProduct]);

  const [selectionModel, setSelectionModel] = useState([]);

  //remove
  const assignBulkHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(allocateBulkKitchn(id));
    }
    toast.success("Bulk assigning executed!")
  };

  //update

  const manualAssignHandler = (id) => {
    
    let feedback = prompt(
      'Enter Batch quantiy(should be lower than Maximum Products)?',
      ''
    )
  console.log(feedback)
 
    dispatch(allocateManualKitchen({qty: feedback, id:id}))
  
   
  };

 

  //side bar handling
  const [view, setView] = useState(true);
  const showSide = () => {
    setView(!view);
  };

  //data grid columns
  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "NAME", headerName: "Name", flex: 1 },
    { field: "dailyCap", headerName: "Daily Capcity", flex: 1 },
    { field: "reOrderLevel", headerName: "Re Order Level", flex: 1 },

    { field: "totalQty", headerName: "Total Quantity", flex: 1 },
    { field: "measurement", headerName: "Mesurement", flex: 1 },
    { field: "supplier", headerName: "Supplier ID", flex: 1 },
    {
      width: 180,
      renderCell: (cellValues) => {
        console.log(cellValues);
        return (
          cellValues.row.totalQty <= cellValues.row.reOrderLevel && (
            <Button
              onClick={() => navigate(`/admin/batches/add/${cellValues.id}`)}
              className="btn-danger"
            >
              ReOrder Now
            </Button>
          )
        );
      },
    },

  ];

  //showing rows if product list is laoded
  let rows;
  if (success) {
    rows = materials.stock?.map((row) => ({
      id: row._id,
      NAME: row.material.name,
      dailyCap: row.material.dailyCap,
      reOrderLevel: row.material.reOrderLevel,
      totalQty: row.totalQty,
      measurement: row.material.measurement,
    supplier: row.material.supplierId,
      CREATEDAT: row.material.createdAt.slice(0, 16),
    }));
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
          className="p-0"
          variant="contained"
          onClick={assignBulkHandler}
        >
          <AddBoxOutlined
            color="primary"
            fontSize="small"
            style={{ color: "#4cbb17" }}
          />
          <span className="px-2" style={{ color: "#4cbb17" }}>
            Assign Daily Quota(Auto)
          </span>
        </Button>
         

        {selectionModel.length === 1 && (
          <Button
            className="p-0 pe-2"
            variant="contained"
            onClick={() => manualAssignHandler(selectionModel[0])}
          >
            <EditOutlined style={{ color: "orange" }} fontSize="small" />
            <span className="px-2" style={{ color: "orange" }}>
              Assign Manually
            </span>
          </Button>
        )}
 {/*
        {selectionModel.length > 0 && (
          <Button
            className="p-0 pe-2"
            variant="contained"
            onClick={() => deleteHandler(selectionModel)}
          >
            <DeleteOutlineOutlined
              color="primary"
              fontSize="small"
              style={{ color: "red" }}
            />
            <span className="px-2" style={{ color: "red" }}>
              Delete
            </span>
          </Button>
        )} */}
      </GridToolbarContainer>
    );
  };

 

  return (
    <>
      <Row>
        <Col className="" sm={3}>
          <ToggleWrapper>
            <i className="fa fa-bars fa-2xl" onClick={showSide}></i>
          </ToggleWrapper>
          <Sidebar view={view} />
        </Col>

        <Col sm={9} clas>
          <main className="py-3 me-5">
            {loading && <Loader />}
            {error && <Message varient="danger">{error}</Message>} 

            <h1>Material Stock</h1>
            {success && (
              <div style={{ height: 700, width: "100%" }}>
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
            

                    setSelectionModel(selection);
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
  );
};

export default MaterialStockScreen;
