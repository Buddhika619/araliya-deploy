import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AdminRoutes from './routes/AdminRoutes'
import GenericRoutes from './routes/GenericRoutes'
import HomeScreen from './screens/HomeScreen'
import PrintView from './screens/PrintView'
import TestBuwa from './screens/TestBuwa'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ReservationReport from './screens/reports/KitchenAllocation'
import MonthlySalesReport from './screens/reports/MonthlySalesReport'
import AnnualSalesReport from './screens/reports/AnnualSalesReport'
import AnnualExpencesReport from './screens/reports/AnnualExpencesReport'
import MonthlyExpencesReport from './screens/reports/MonthlyExpencesReport'
import AnnualProfitReport from './screens/reports/AnnualProfitReport'
import MonthlyProfitReport from './screens/reports/MonthlyProfitReport'
import SalesAfterReport from './screens/reports/SalesAfterReport'
import CostAfterReport from './screens/reports/CostAfterReport'
import ProfitAfterReport from './screens/reports/ProfitAfterReport'

const App = () => {
  return (
    <>
      <Router>
        <Routes>

          <Route path='/test' element={<TestBuwa />} />
          <Route path='/admin/*' element={<AdminRoutes />} />
          <Route path='/*' element={<GenericRoutes />} />

          {/* home routes */}
          <Route path='/search/:keyword' element={<HomeScreen />} exact />

          <Route path='/page/:pagenumber' element={<HomeScreen />} exact />
          <Route
            path='/search/:keyword/page/:pagenumber'
            element={<HomeScreen />}
            exact
          />

          <Route path='/sort/:filter' element={<HomeScreen />} exact />
          <Route
            path='/sort/:filter/page/:pagenumber'
            element={<HomeScreen />}
            exact
          />

          <Route
            path='/search/:keyword/sort/:filter'
            element={<HomeScreen />}
            exact
          />
          <Route
            path='/search/:keyword/sort/:filter/page/:pagenumber'
            element={<HomeScreen />}
            exact
          />

          <Route path='/category/:category' element={<HomeScreen />} exact />
          <Route
            path='/category/:category/sort/:filter'
            element={<HomeScreen />}
            exact
          />
          <Route
            path='/category/:category/page/:pagenumber'
            element={<HomeScreen />}
            exact
          />

          <Route
            path='/category/:category/sort/:filter/page/:pagenumber'
            element={<HomeScreen />}
            exact
          />

          <Route path='/' element={<HomeScreen />} exact />

          {/* overiding default layouts */}
          <Route path='/order/print/:id' element={<PrintView />} />


          {/* reports */}
          <Route path='/reports/kitchenReport/:id' element={<ReservationReport />} />

          <Route path='/reports/monthlySales' element={< MonthlySalesReport/>} />
          <Route path='/reports/annualsales' element={< AnnualSalesReport/>} />
          <Route path='/reports/annualcost' element={< AnnualExpencesReport/>} />
          <Route path='/reports/monthlycost' element={< MonthlyExpencesReport/>} />
          <Route path='/reports/annualprofit' element={< AnnualProfitReport/>} />
          <Route path='/reports/monthlyprofit' element={< MonthlyProfitReport/>} />
          <Route path='/reports/salesafter/:date' element={< SalesAfterReport/>} />
          <Route path='/reports/costafter/:date' element={< CostAfterReport/>} />
          <Route path='/reports/profitafter/:date' element={< ProfitAfterReport/>} />
          
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
