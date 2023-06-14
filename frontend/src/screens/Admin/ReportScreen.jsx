import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";

import Sidebar from "../../components/layouts/Sidebar";

import styled from "styled-components";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import DateModal from "../../components/Modals/DateModel";

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

const ReportScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] =useState('')
 
  const handleShowModal = (url) => {
    setUrl(url)
    setShowModal(true)
  };
  const handleCloseModal = () => setShowModal(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [view, setView] = useState(true);
  const showSide = () => {
    setView(!view);
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const user = userInfo;

  useEffect(() => {
    if (user && user.isAdmin) {
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate]);

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
              {/* ROW 3 */}

              <Box
                gridColumn="span 12"
                gridRow="span 5"
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
                    Reports
                  </Typography>
                </Box>
                <hr style={{ color: "green" }} />
           


                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`4px solid "#141b2d"`}
                  p="15px"
                >
                  <Box>
                    <Typography color="#4cceac" variant="h5" fontWeight="600">
                    Sales Report
                    </Typography>

                  </Box>
                  <Box color="#e0e0e0"></Box>
                  <Box
                    backgroundColor="#4cceac"
                    p="5px 30px"
                    m="0 60px"
                    borderRadius="4px"
                    onClick={() =>handleShowModal('/reports/salesafter')}
                  >
                    View
                  </Box>
    
                </Box>
                <hr style={{ color: "green" }} />


                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`4px solid "#141b2d"`}
                  p="15px"
                >
                  <Box>
                    <Typography color="#4cceac" variant="h5" fontWeight="600">
                    Expenses Report
                    </Typography>

                  </Box>
                  <Box color="#e0e0e0"></Box>
                  <Box
                    backgroundColor="#4cceac"
                    p="5px 30px"
                    m="0 60px"
                    borderRadius="4px"
                    onClick={() =>handleShowModal('/reports/costafter')}
                  >
                    View
                  </Box>

                </Box>
                <hr style={{ color: "green" }} />


                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`4px solid "#141b2d"`}
                  p="15px"
                >
                  <Box>
                    <Typography color="#4cceac" variant="h5" fontWeight="600">
                    Profit Report
                    </Typography>

                  </Box>
                  <Box color="#e0e0e0"></Box>
                  <Box
                    backgroundColor="#4cceac"
                    p="5px 30px"
                    m="0 60px"
                    borderRadius="4px"
                    onClick={() =>handleShowModal('/reports/profitafter')}
                  >
                    View
                  </Box>
                  <DateModal showModal={showModal} handleClose={handleCloseModal} url={url}/>
                </Box>
                <hr style={{ color: "green" }} />

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`4px solid "#141b2d"`}
                  p="15px"
                >
                  <Box>
                    <Typography color="#4cceac" variant="h5" fontWeight="600">
                    Sales Report - Current Month
                    </Typography>
                    
                  </Box>
                  <Box color="#e0e0e0"></Box>
                  <Box
                    backgroundColor="#4cceac"
                    p="5px 30px"
                    m="0 60px"
                    borderRadius="4px"
                    id='monthlySales'
                    onClick={() => window.open('/reports/monthlySales')}
                  >
                    View
                  </Box>
                </Box>
                <hr style={{ color: "green" }} />


                
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`4px solid "#141b2d"`}
                  p="15px"
                >
                  <Box>
                    <Typography color="#4cceac" variant="h5" fontWeight="600">
                    Expenses Report - Current Month
                    </Typography>
                    
                  </Box>
                  <Box color="#e0e0e0"></Box>
                  <Box
                    backgroundColor="#4cceac"
                    p="5px 30px"
                    m="0 60px"
                    borderRadius="4px"
                    id='monthlySales'
                    onClick={() => window.open('/reports/monthlycost')}
                  >
                    View
                  </Box>
                </Box>
                <hr style={{ color: "green" }} />
                
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`4px solid "#141b2d"`}
                  p="15px"
                >
                  <Box>
                    <Typography color="#4cceac" variant="h5" fontWeight="600">
                    Profit Report - Current Month
                    </Typography>
                    
                  </Box>
                  <Box color="#e0e0e0"></Box>
                  <Box
                    backgroundColor="#4cceac"
                    p="5px 30px"
                    m="0 60px"
                    borderRadius="4px"
                    id='monthlySales'
                    onClick={() => window.open('/reports/monthlyprofit')}
                  >
                    View
                  </Box>
                </Box>
                <hr style={{ color: "green" }} />
                
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`4px solid "#141b2d"`}
                  p="15px"
                >
                  <Box>
                    <Typography color="#4cceac" variant="h5" fontWeight="600">
                    Sales Report - Last 12 Months
                    </Typography>
                    
                  </Box>
                  <Box color="#e0e0e0"></Box>
                  <Box
                    backgroundColor="#4cceac"
                    p="5px 30px"
                    m="0 60px"
                    borderRadius="4px"
                    id='monthlySales'
                    onClick={() => window.open('/reports/annualsales')}
                  >
                    View
                  </Box>
                </Box>
                <hr style={{ color: "green" }} />
                
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`4px solid "#141b2d"`}
                  p="15px"
                >
                  <Box>
                    <Typography color="#4cceac" variant="h5" fontWeight="600">
                    Expenses Report - Last 12 Months
                    </Typography>
                    
                  </Box>
                  <Box color="#e0e0e0"></Box>
                  <Box
                    backgroundColor="#4cceac"
                    p="5px 30px"
                    m="0 60px"
                    borderRadius="4px"
                    id='monthlySales'
                    onClick={() => window.open('/reports/annualcost')}
                  >
                    View
                  </Box>
                </Box>
                <hr style={{ color: "green" }} />
                
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`4px solid "#141b2d"`}
                  p="15px"
                >
                  <Box>
                    <Typography color="#4cceac" variant="h5" fontWeight="600">
                    Profit Report - Last 12 Months
                    </Typography>
                    
                  </Box>
                  <Box color="#e0e0e0"></Box>
                  <Box
                    backgroundColor="#4cceac"
                    p="5px 30px"
                    m="0 60px"
                    borderRadius="4px"
                    id='monthlySales'
                    onClick={() => window.open('/reports/annualprofit')}
                  >
                    View
                  </Box>
                </Box>
                <hr style={{ color: "green" }} />
                
               
             
              </Box>
            </Box>
          </main>
        </Col>
      </Row>
    </>
  );
};

export default ReportScreen;
