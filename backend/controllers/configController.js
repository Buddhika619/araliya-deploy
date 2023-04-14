import Config from "../models/configModel.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Product from '../models/productModel.js'

//@des config settings
//@route PUT  /api/config
//@access Private/admin

const updateConfig = asyncHandler(async (req, res) => {
  const { formData, offer } = req.body;
  const product = await Product.findById(offer.productId)
  const {name, image, description, price} = product
  // Create an array containing the carousel images and offers
  let carouselArr = [formData.image];
  let offersArr = Object.values(offer);

  // Remove any empty items from the carousel and offers arrays
  carouselArr = carouselArr.filter((item) => item !== "");
  offersArr = offersArr.filter((item) => item !== "");

  // Find the current configuration settings
  const configs = await Config.find();

  // Update the carousel if an image was uploaded
  if (carouselArr.length > 0) {
    // If there are no existing configurations, create a new one with the uploaded image
    if (configs.length < 1) {
      const config = new Config({
        carousel: carouselArr[0],
      });
      const data = await config.save();
      res.status(201).send(data);

      // If a configuration exists, add the uploaded image to the carousel
    } else {
      const config = await Config.findOne();

      if (config) {
        // Check if the uploaded image is already in the carousel
        if (config.carousel.includes(carouselArr[0])) {
          res.status(500);
          throw new Error("Please upload a unique image");
        }

        // Add the uploaded image to the carousel
        config.carousel.push(carouselArr[0]);

        // Save the updated configuration
        const updatedConfig = await config.save();
        res.status(201).json(updatedConfig);

        // If a configuration cannot be found, return an error
      } else {
        res.status(404);
        throw new Error("Config not found");
      }
    }
  }

  // Update the offers if all three offer fields were filled out
  if (offersArr.length === 3) {
    // Check that the product ID is in the correct format
    if (offer.productId.length !== 24) {
      res.status(403);
      throw new Error("Invalid ProductID format");
    }

    // If there are no existing configurations, create a new one with the uploaded offers
    if (configs.length < 1) {
      const config = new Config({
        offers: {...offer,name, image, description, price},
      });
      const data = await config.save();
      res.status(201).send(data);

      // If a configuration exists, add the uploaded offers to the configuration
    } else {
      const config = await Config.findOne();

      if (config) {
        // Add the uploaded offers to the configuration
        config.offers.push({...offer,name, image, description, price});

        // Save the updated configuration
        const updatedConfig = await config.save();
        res.status(201).json(updatedConfig);

        // If a configuration cannot be found, return an error
      } else {
        res.status(404);
        throw new Error("Config not found");
      }
    }
  }
});

//@des get configs
//@route GET  /api/config
//@access Public

const getConfig = asyncHandler(async (req, res) => {
  const config = await Config.findOne();
  res.status(201).json(config);
});

//@des delete carousel image
//@route DELETE  /api/config/carousel/:id
//@access private/admin

const removeCarouselItem = asyncHandler(async (req, res) => {
  const id = req.params.id;

  // Find the current configuration settings
  const config = await Config.findOne();

  if (config) {
    // Filter out the specified carousel item and update the configuration
    let car = config.carousel.filter((item) => item !== config.carousel[id]);
    config.carousel = car;
    const updatedConfig = await config.save();
    res.status(201).json(updatedConfig);
  } else {
    res.status(404);
    throw new Error("Config not found");
  }
});

//@des delete offer
//@route DELETE  /api/config/offer/:id
//@access private/admin

const removeOffer = asyncHandler(async (req, res) => {
  const id = req.params.id;

  // Find the current configuration settings
  const config = await Config.findOne();

  // Filter out the specified offer and update the configuration
  if (config) {
    let offer = config.offers.filter(
      (element) => element._id.toString() !== id
    );

    config.offers = offer;
    const updatedConfig = await config.save();
    res.status(201).json(updatedConfig);
  } else {
    res.status(404);
    throw new Error("Config not found");
  }
});

export { updateConfig, getConfig, removeCarouselItem, removeOffer };
