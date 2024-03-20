import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import Message from "../../components/Message";

import axios from "axios";
import Loader from "../../components/Loader";
import CustomButton from "../../components/microComponents/CustomButton";

const ReservationReport = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { date } = useParams();
  console.log(date);
  const [loading, setLoading] = useState(true);
  const [adata, setaData] = useState({});
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState({});
  console.log(adata);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const user = userInfo;

  const fetchData = async (date) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/reports/profitafter/${date}`,
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
      fetchData(date);
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate]);

  if (loading) {
    return <Loader />;
  }

  const start = new Date(date.split("x")[0]);
  const end = new Date(date.split("x")[1]);
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
        <span style={{ fontSize: "20px", fontWeight: "900" }}>
          PROFIT REPORT
          <br />
        </span>
      </Box>
      <Box margin="2% 0 2%">
        <span style={{ fontSize: "15px", fontWeight: "900" }}>
          Profit from {start.toString().slice(0, 15)} to{" "}
          {end.toString().slice(0, 15)}
          <br />
        </span>
      </Box>

      <Table id="myId">
        <TableHead>
          <TableRow style={{ background: "#ddd0c7" }}>
            <TableCell style={{ fontWeight: "900" }}>Item</TableCell>
            <TableCell style={{ fontWeight: "900" }}>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {adata.map((item, i) => ( */}
          <TableRow style={{ background: "#eae6e3" }}>
            <TableCell> Expences</TableCell>
            <TableCell>{adata.annualCost[0]?.totalCost} LKR</TableCell>
          </TableRow>
          <TableRow style={{ background: "#eae6e3" }}>
            <TableCell> Revenue</TableCell>
            <TableCell>
              {adata.totalRevenueLastYear[0]?.totalSubTotal} LKR
            </TableCell>
          </TableRow>

          <TableRow style={{ background: "#eae6e3" }}>
            <TableCell style={{ fontWeight: "900" }}>Total Profit</TableCell>

            <TableCell style={{ fontWeight: "900" }}>
              {adata.totalRevenueLastYear[0]?.totalSubTotal -
                adata.annualCost[0]?.totalCost}{" "}
              LKR
            </TableCell>
          </TableRow>
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
      <p style={{ fontSize: "11px" }}>
        *This is a computer-generated document. No signature is required.
      </p>
      <p style={{ fontSize: "11px" }}>{new Date().toString()}</p>
      <CustomButton onClick={handlePrint} className="print-button">
        Print this page
      </CustomButton>
    </Container>
  );
};

export default ReservationReport;
