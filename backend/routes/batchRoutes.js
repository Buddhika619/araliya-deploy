import express from 'express'

import { protect, admin } from '../middleware/authMiddleware.js'
import {
    createBatch,
    updateBatch,
    getBatchbyID,
    getBatches
} from '../controllers/batchController.js'


const router = express.Router()

router
  .route('/')
  .get(protect, admin,createBatch)
  .post(protect, admin, getBatches)

router
  .route('/:id')
  .get(protect, admin, getBatchbyID)
  .put(protect, admin, updateBatch)

export default router
