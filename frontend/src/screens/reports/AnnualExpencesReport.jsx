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


  const fetchData = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/reports/annualcost`,
        config
      );

      setaData(data);

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


  const totalRevenue = adata.reduce((acc, cv) => (acc + cv.cost),0)
  // const totalQty = adata.salesItemsArray.reduce((acc, cv) => (acc + cv.quantitySold),0)
  return (
    
    <Container>
      <Box>
        <Box margin="0% 0">
          <p style={{ fontSize: "40px", margin: "0", color: "#73261c" }}>
            ARALIYA
          </p>
        </Box>
        {error && <Message varient="danger">{errorMsg.message}</Message>}
      </Box>
      <Box margin="2% 0 2%">
        <span style={{ fontSize: "20px", fontWeight:'900'}}>
        ANNUAL EXPENSES REPORT
          <br />
        </span>
    
      </Box>

      <Table>
        <TableHead>
          <TableRow style={{ background: "#ddd0c7" }}>
            <TableCell style={{fontWeight:'900'}}>Month</TableCell>
            <TableCell style={{fontWeight:'900'}}>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {adata.map((item, i) => (
            <TableRow key={i} style={{ background: "#eae6e3" }}>
              <TableCell>{item.month}</TableCell>
              <TableCell>{item.cost} LKR</TableCell>
             
            </TableRow>
          ))}
          <TableRow style={{background:'#eae6e3'}}>
              <TableCell style={{fontWeight:'900'}}>Total Expenses</TableCell>
          
              <TableCell style={{fontWeight:'900'}}>{totalRevenue} LKR</TableCell>
            </TableRow>

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
      <p style={{ fontSize:'11px'}}>*This is a computer-generated document. No signature is required.</p>
      <p style={{ fontSize:'11px'}}>{new Date().toString()}</p>
      <CustomButton onClick={handlePrint}  className="print-button">Print this page</CustomButton>
    </Container>
  );
};

export default ReservationReport;
