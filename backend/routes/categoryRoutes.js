import express from 'express'

import { protect, admin } from '../middleware/authMiddleware.js'
import {
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryById,
    getCategories,
} from '../controllers/categoryController.js'


const router = express.Router()

router
  .route('/')
  .get(protect, admin,getCategories)
  .post(protect, admin, createCategory)

router
  .route('/:id')
  .get(protect, admin, getCategoryById)
  .delete(protect, admin, deleteCategory)
  .put(protect, admin, updateCategory)

export default router
