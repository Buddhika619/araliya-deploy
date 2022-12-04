import express from 'express'
const router = express.Router()

import {
  updateConfig,
  getConfig,
  removeCarouselItem,
  removeOffer,
} from '../controllers/configController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getConfig).put(protect, admin, updateConfig)

router.delete('/carousel/:id', protect, admin, removeCarouselItem)

router.delete('/offer/:id', protect, admin, removeOffer)


export default router
