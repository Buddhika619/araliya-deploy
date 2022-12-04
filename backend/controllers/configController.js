import Config from '../models/configModel.js'
import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'
import { text } from 'express'

//@des config settings
//@route PUT  /api/config
//@access Private/admin

const updateConfig = asyncHandler(async (req, res) => {
  const { formData, offer } = req.body

  let carouselArr = [formData.image]
  let offersArr = Object.values(offer)


  carouselArr = carouselArr.filter((item) => item !== '')
  offersArr = offersArr.filter((item) => item !== '')

  const configs = await Config.find()

  //update carousel
  if (carouselArr.length > 0) {
    if (configs.length < 1) {
      const config = new Config({
        carousel: carouselArr[0],
      })
      const data = await config.save()
      res.status(201).send(data)
    } else {
      const config = await Config.findOne()

      if (config) {
        if (config.carousel.includes(carouselArr[0])) {
          res.status(500)
          throw new Error('Please uplad a unique image')
        }
        config.carousel.push(carouselArr[0])

        const updatedConfig = await config.save()
        res.status(201).json(updatedConfig)
      } else {
        res.status(404)
        throw new Error('Config not found')
      }
    }
  }

  //update offers
  if (offersArr.length === 3) {
  
    if(offer.productId.length !== 24){
      res.status(403 )
      throw new Error('Invalid ProductID format')
    }

    if (configs.length < 1) {
      const config = new Config({
        offers: offer,
      })
      const data = await config.save()
      res.status(201).send(data)
    } else {
      const config = await Config.findOne()

      if (config) {
        config.offers.push(offer)
        const updatedConfig = await config.save()
        res.status(201).json(updatedConfig)
      } else {
        res.status(404)
        throw new Error('Config not found')
      }
    }
  }
})

//@des get configs
//@route GET  /api/config
//@access Public

const getConfig = asyncHandler(async (req, res) => {
  const config = await Config.findOne()
  res.status(201).json(config)
})

//@des delete carousel image
//@route DELETE  /api/config/carousel/:id
//@access private/admin

const removeCarouselItem = asyncHandler(async (req, res) => {
  const id = req.params.id

  const config = await Config.findOne()

  if (config) {
    let car = config.carousel.filter((item) => item !== config.carousel[id])
    config.carousel = car
    const updatedConfig = await config.save()
    res.status(201).json(updatedConfig)
  } else {
    res.status(404)
    throw new Error('Config not found')
  }
})

//@des delete offer
//@route DELETE  /api/config/offer/:id
//@access private/admin

const removeOffer = asyncHandler(async (req, res) => {
  const id = req.params.id

  const config = await Config.findOne()

  if (config) {
    let offer = config.offers.filter((element) => element._id.toString() !== id)

    //  offer = config.offers.filter((item) => item !== config.filter[id])
    config.offers = offer
    const updatedConfig = await config.save()
    res.status(201).json(updatedConfig)
  } else {
    res.status(404)
    throw new Error('Config not found')
  }
})

export { updateConfig, getConfig, removeCarouselItem, removeOffer }
