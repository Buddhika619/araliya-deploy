import express from 'express'

import { protect, admin } from '../middleware/authMiddleware.js'
import {
    createMaterial,
    updateMaterial,
    deleteMaterial,
    getMaterialById,
    getMaterials,
    getMaterialStock
} from '../controllers/materialController.js'


const router = express.Router()

router
  .route('/')
  .get(protect, admin,getMaterials)
  .post(protect, admin, createMaterial)

router.get('/stock', protect, admin,getMaterialStock)

router
  .route('/:id')
  .get(protect, admin, getMaterialById)
  .delete(protect, admin, deleteMaterial)
  .put(protect, admin, updateMaterial)

export default router
