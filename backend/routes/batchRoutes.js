import express from 'express'

import { protect, admin } from '../middleware/authMiddleware.js'
import {
    createBatch,
    updateBatch,
    getBatchbyID,
    getBatches, 
    assignBulk,
    getKitchenDetails,
    assignOne
} from '../controllers/batchController.js'


const router = express.Router()

router
  .route('/')
  .get(protect, admin,getBatches)
  .post(protect, admin, createBatch)

router.get('/bulk',protect,admin, assignBulk)
router.post('/one',protect, admin, assignOne)

router.get('/kitchen',protect, admin, getKitchenDetails)


router
  .route('/:id')
  .get(protect, admin, getBatchbyID)
  .put(protect, admin, updateBatch)



export default router
