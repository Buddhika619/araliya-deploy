import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import Message from "../../components/Message";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../../components/Loader";
import CustomButton from "../../components/microComponents/CustomButton";

const ReservationReport = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const [loading, setLoading] = useState(true);
  const [adata, setaData] = useState({});
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState({});
  console.log(adata);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const user = userInfo;

  const data = "test";

  const fetchData = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/reports/kitchenReport/${id}`,
        config
      );

      setaData(data.requests);

      setLoading(false);
    } catch (error) {
      //   toast.error("Faild to fetch location");
      setErrorMsg(error);
      setError(true);
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };
  
  useEffect(() => {
    //resting state

    if (user && user.isAdmin) {
      fetchData(id);
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      <Box>
        <Box margin="0% 0">
          <p style={{ fontSize: "50px", margin: "0", color: "#73261c" }}>
            ARALIYA
          </p>
        </Box>
        {error && <Message varient="danger">{errorMsg.message}</Message>}
      </Box>
      <Box margin="2% 0 4%">
        <span style={{ fontSize: "20px" }}>Report : </span>
        <span style={{ fontSize: "20px" }}>
          Kitchen Allocation Report
          <br />
        </span>
        <span style={{ fontSize: "20px" }}>Request ID: </span>
        <span style={{ fontSize: "20px" }}>
          {adata[0].requestId}
          <br />
        </span>
      </Box>

      <Table id="myId">
        <TableHead>
          <TableRow style={{ background: "#ddd0c7" }}>
            <TableCell>Material ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Qty</TableCell>
            <TableCell>Measurement</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {adata.map((item, i) => (
            <TableRow key={i} style={{ background: "#eae6e3" }}>
              <TableCell>{item.materialId._id}</TableCell>
              <TableCell>{item.materialId.name}</TableCell>
              <TableCell>{item.qty} </TableCell>
              <TableCell>{item.materialId.measurement}</TableCell>
            </TableRow>
          ))}
          {/* <TableRow style={{background:'#eae6e3'}}>
              <TableCell>Discount</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>{content.sale.discount}%</TableCell>
            </TableRow> */}

          {/* <TableRow style={{background:'#eae6e3'}}>
              <TableCell>Sub Total</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>{content.sale.subTotal}LKR</TableCell>
            </TableRow> */}
        </TableBody>
      </Table>

      <Box
        display="flex"
        justifyContent="space-between"
        style={{ background: "#ddd0c7" }}
      >
        <Box margin="2%">
          <b style={{ fontSize: "16px", margin: "0", color: "#73261c" }}>
            &copy; HOTEL ARALIYA
          </b>
          <br />
        </Box>
      </Box>

      <p>{new Date().toString()}</p>
      <CustomButton onClick={handlePrint}  className="print-button">Print this page</CustomButton>
    </Container>
  );
};

export default ReservationReport;
