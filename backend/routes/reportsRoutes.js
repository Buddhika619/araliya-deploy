import express from 'express'

import { protect, admin } from '../middleware/authMiddleware.js'
import {
    getkitchenRequestData,
    getMonthlySales,
    getAnnualRevenue,
    getAnnualCost,
    getMonthlyCost,
    getAnualProfit,
    getMonthlyProfit,
    getSalesAfter,
    getCostAfter,
    getProfitafter    
} from '../controllers/reportsController.js'


const router = express.Router()


router.get('/kitchenReport/:id', protect, admin,getkitchenRequestData )

router.get('/monthlysales', protect, admin,getMonthlySales )

router.get('/annualsales', protect, admin,getAnnualRevenue )

router.get('/annualcost', protect, admin,getAnnualCost )

router.get('/monthlycost', protect, admin,getMonthlyCost )

router.get('/annualprofit', protect, admin,getAnualProfit )

router.get('/monthlyprofit', protect, admin,getMonthlyProfit )

router.get('/salesafter/:date', protect, admin,getSalesAfter )

router.get('/costafter/:date', protect, admin,getCostAfter )

router.get('/profitafter/:date', protect, admin,getProfitafter )


export default router
