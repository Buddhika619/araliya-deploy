import express from 'express'
const router = express.Router()

import {
    getStats
} from '../controllers/statsController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(protect, admin, getStats)

export default router
