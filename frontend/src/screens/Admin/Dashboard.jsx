import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";

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
  Info,
  InfoOutlined,
  WidgetsOutlined,
} from "@material-ui/icons";

import FormContainer from "../../components/FormContainer";
import { listOrders } from "../../actions/orderActions";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Container } from "react-bootstrap";
import styled from "styled-components";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";

import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";

import LineChart from "../../components/charts/LineChart";
import GeographyChart from "../../components/charts/GeographyChart";
import BarChart from "../../components/charts/BarChart";
import StatBox from "../../components/charts/StatBox";
import ProgressCircle from "../../components/charts/ProgressCircle";
import { listStats } from "../../actions/statsActions";

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

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [statsCache, setStatsCache] = useState(null)

  const [view, setView] = useState(true);
  const showSide = () => {
    setView(!view);
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const user = userInfo;

  const statsdata = useSelector((state) => state.stats);
  const { loading, error,stats, success } = statsdata;


  useEffect(() => {
    if (user && user.isAdmin ) {
      if(!stats.currentMonthCount){
        dispatch(listStats());
        setStatsCache(stats)
      }else{
        setStatsCache(stats)
      }
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Row>
        <Col className="" sm={3}>
          <ToggleWrapper>
            <i className="fa fa-bars fa-2xl" onClick={showSide}></i>
          </ToggleWrapper>

          <Sidebar view={view} />
        </Col>

        <Col sm={8}>
          <main className="py-3">
            <Box
              display="grid"
              gridTemplateColumns="repeat(12, 1fr)"
              gridAutoRows="140px"
              gap="20px"
            >
              {/* ROW 1 */}

              <Box
                gridColumn="span 3"
                backgroundColor="#1F2A40"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <StatBox
                  title={stats.currentMonthCount}
                  subtitle="New Users"
                  increase={`${stats.uesrPrecentageDiff}`}
                  icon={
                    <PersonAddIcon  sx={{ fontSize: "26px", color: "#4cceac" }} />
                  }
                />
              </Box>
              <Box
                gridColumn="span 3"
                backgroundColor="#1F2A40"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <StatBox
                  title={stats.currentMonthorderCount}
                  subtitle="Sales Obtained"
                  increase={stats.orderCountPrecentageDiff}
                  icon={
                    <PointOfSaleIcon
                    sx={{ fontSize: "26px", color: "#4cceac" }}
                    />
                  }
                />
              </Box>
              <Box
                gridColumn="span 3"
                backgroundColor="#1F2A40"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <StatBox
                  title={`${stats.totalSales} LKR`}
                  subtitle="Sales Value"
                  increase={stats.percentageDifferenceSales}
                  icon={
                    <PointOfSaleIcon
                    sx={{ fontSize: "26px", color: "#4cceac" }}
                    />
                  }
                />
              </Box>
              <Box
                gridColumn="span 3"
                backgroundColor="#1F2A40"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <StatBox
                  title={`${stats.totalcost} LKR`}
                  subtitle="Total Cost "
                  increase={stats.percentageDifferenceCost}
                  icon={
                    <TrafficIcon  sx={{ fontSize: "26px", color: "#4cceac" }} />
                  }
                />
              </Box>

              {/* ROW 2 */}
              <Box
                gridColumn="span 12"
                gridRow="span 3"
                backgroundColor="#1F2A40"
              >
                <Box
                  mt="25px"
                  p="0 30px"
                  display="flex "
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography variant="h5" fontWeight="600" color="#e0e0e0">
                      Revenue Generated
                    </Typography>
                    <Typography variant="h3" fontWeight="bold" color="#4cceac">
                    {stats.anualSales} LKR
                    </Typography>
                  </Box>
                  <Box>
                 
                  </Box>
                </Box>
                <Box height="250px" m="-20px 0 0 0">
                  <LineChart isDashboard={true} data={stats.monthlyRevenue} />
                </Box>
              </Box>
             

              {/* ROW 3 */}

              <Box
                gridColumn="span 12"
                gridRow="span 2"
                backgroundColor="#1F2A40"
                overflow="auto"
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`4px solid "#141b2d"`}
                  colors="#e0e0e0"
                  p="15px"
                >
                  <Typography color="#e0e0e0" variant="h5" fontWeight="600">
                    Recent Transactions
                  </Typography>
                </Box>
                {stats.latestTransactions?.map((transaction, i) => (
                  <Box
                    key={`${i}`}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom={`4px solid "#141b2d"`}
                    p="15px"
                  >
                    <Box>
                      <Typography color="#4cceac" variant="h5" fontWeight="600">
                        {transaction._id}
                      </Typography>
                      <Typography color="#e0e0e0">
                        {transaction.user.name}
                      </Typography>
                    </Box>
                    <Box color="#e0e0e0">{Date(transaction.createdAt)}</Box>
                    <Box
                      backgroundColor="#4cceac"
                      p="5px 10px"
                      borderRadius="4px"
                    >
                      LKR {transaction.subTotal}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </main>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
