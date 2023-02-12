import { DataGrid } from '@mui/x-data-grid'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {  Row, Col } from 'react-bootstrap'
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
  DeleteOutlineOutlined,
  EditOutlined,
  Info,
  InfoOutlined,
  WidgetsOutlined,
} from '@material-ui/icons'

import FormContainer from '../../components/FormContainer'
import { listOrders } from '../../actions/orderActions'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Container } from 'react-bootstrap'
import styled from 'styled-components'
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

const ToggleWrapper = styled('div')`
  position: relative;
  * {
    position: absolute;
    top:-38px;
    left:20px;
   color: white;
   font-size: 35px;
  }
`

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [view, setView] = useState(true)
  const showSide = () => {
    setView(!view)
  }

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
    if (user && user.isAdmin) {
    
    } else {
      navigate('/login')
    }
  }, [dispatch, navigate, user])

  return (
    <>
      <Row>
        <Col className='' sm={3}>
          <ToggleWrapper>
       
            <i  className='fa fa-bars fa-2xl' onClick={showSide}></i>
          </ToggleWrapper>

          <Sidebar view={view} />
        </Col>

        <Col sm={9}>
          <main className='py-3 px-6'>
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
            title="12,361"
            subtitle="Emails Sent"
            progress="0.75"
            increase="+14%"
            icon={
              <EmailIcon
                sx={{ color: "#101624", fontSize: "26px" }}
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
            title="431,225"
            subtitle="Sales Obtained"
            progress="0.50"
            increase="+21%"
            icon={
              <PointOfSaleIcon
                sx={{ color: "#101624", fontSize: "26px" }}
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
            title="32,441"
            subtitle="New Clients"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color: "#101624", fontSize: "26px" }}
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
            title="1,325,134"
            subtitle="Traffic Received"
            progress="0.80"
            increase="+43%"
            icon={
              <TrafficIcon
                sx={{ color: "#101624", fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
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
              <Typography
                variant="h5"
                fontWeight="600"
                color="#e0e0e0"
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color="#4cceac"
              >
                $59,342.32
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: "#4cceac" }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
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
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid "#141b2d"`}
              p="15px"
            >
              <Box>
                <Typography
                  color="#4cceac"
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color="#e0e0e0">
                  {transaction.user}
                </Typography>
              </Box>
              <Box color="#e0e0e0">{transaction.date}</Box>
              <Box
                backgroundColor="#4cceac"
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
 
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor="#1F2A40"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
      
      </Box>
          </main>
        </Col>
      </Row>
    </>
  )
}

export default Dashboard
