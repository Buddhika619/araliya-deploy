import express from 'express'

import { protect, admin } from '../middleware/authMiddleware.js'
import {
    createBatch,
    updateBatch,
    getBatchbyID,
    getBatches, 
    testfunc
} from '../controllers/batchController.js'


const router = express.Router()

router
  .route('/')
  .get(protect, admin,getBatches)
  .post(protect, admin, createBatch)

router.get('/test', testfunc)

router
  .route('/:id')
  .get(protect, admin, getBatchbyID)
  .put(protect, admin, updateBatch)

export default router
