import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import sendEmail from '../Utils/sendEmail.js'
import cron from 'node-cron'
import Batch from '../models/batchModel.js'


// @des  Fetch active products
// @route GET /api/products
// @access Public



const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pagenumber) || 1


    // Construct keyword filter to match product name containing keyword (case insensitive)
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

// Sort options for filtering products
  const sortOptions = {
    asc: { price: 1 },
    dsc: { price: -1 },
    top: { rating: -1 },
  }

   // Get sort options from request parameters
  const filter = req.query.filter 
  const sort = sortOptions[filter] || { createdAt: -1 }

  // Construct category filter to match specific product category
  const categoryFilter = req.query.category
    ? req.query.category === 'All Products'
      ? {}
      : { category: req.query.category }
    : {}

// Merge filter options into a single object
  const productFilter = { ...keyword, ...categoryFilter, active: true }
  // Find products that match the filter and sort, limit, and paginate the results
  const products = await Product.find(productFilter)
    .sort(sort)
    .limit(pageSize)
    .skip(pageSize * (page - 1))

    // Count the total number of products that match the filter
  const resultCount = await Product.countDocuments(productFilter)
// Find all distinct product categories
  const categories = await Product.distinct('category')

  // Create empty arrays for in-house and off the shelf products, out of stock off the shelf  products
  const offTheShelf = []
  const outOfStockProducts = []

  //filter inhouse products
  const inHouseProducts = products.filter((product) => product.type === true)

// Loop through all products to find those that are not in-house
  for (let i = 0; i < products.length; i++) {
    if (products[i].type === false) {
       // Find the oldest batch of the product  that has a quantity greater than 0 for this product
      const batch = await Batch.find({ productId: products[i]._id, qty: { $gt: 0 } }).populate('productId').sort({ createdAt: 1 })
      if (batch.length > 0) {
          // Create a new object that represents the product with data from the batch
        const viewObj = {
          _id: batch[0].productId._id,
          user: batch[0].productId.user,
          name: batch[0].productId.name,
          image: batch[0].productId.image,
          category: batch[0].productId.category,
          description: batch[0].productId.description,
          rating: batch[0].productId.rating,
          numReviews: batch[0].productId.numReviews,
          price: batch[0].salesPrice,
          countInStock: batch[0].qty,
          reOrderLevel: batch[0].productId.reOrderLevel,
          dailyCapacity: '',
          active: batch[0].productId.active,
          type: batch[0].productId.type,
          reviews: batch[0].productId.reviews,
          createdAt: batch[0].productId.createdAt
        }
         // Add the new object to the array of offTheShelf products
        offTheShelf.push(viewObj)
      } else {
           // Add the product to the array of out-of-stock products
        outOfStockProducts.push(products[i])
      }
    }
  }

  // Combine the arrays of in-house,off the shelf and out-of-stock products  and sort them by creation date
  let finalProducts = [...offTheShelf, ...inHouseProducts, ...outOfStockProducts];
  finalProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));


  // If a filter(sorting method) is specified in the request, sort the products accordingly
  if (req.query.filter) {
    switch (req.query.filter) {
      case 'dsc':
        finalProducts.sort((a, b) => b.price - a.price);
        break;
      case 'asc':
        finalProducts.sort((a, b) => a.price - b.price);
        break;
      case 'top':
        finalProducts.sort((a, b) => b.rating - a.rating);
        break;
      default:
        finalProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }
  } 

  // Return the final list of products, along with pagination and category information, as a JSON response
  res.json({
    products: finalProducts,
    page,
    pages: Math.ceil(resultCount / pageSize),
    categories,
    resultCount,
  })
})

// @des  Fetch active/reorder/deactive products
// @route GET /api/products/admin
// @access admin

/**this function for get all in-house  products*/
const getProductListInAdmin = asyncHandler(async (req, res) => {
   // extract the value of the "path" query parameter from the request
  const path = req.query.path
  let products = ''

  // use a switch statement to determine which set of products to fetch based on the value of the "path" parameter
  switch (path) {
    case 'active':
       
      products = await Product.find({ active: true, type: true }).sort({createdAt:-1})
      break

    case 'outofstock':
   
      products = await Product.find({ active: true,  type: true, countInStock: 0 })
      break

    case 'deactivated':
     
      products = await Product.find({ active: false, type: true })
      break
  }


 // respond to the request with the list of products
  res.json({
    products,
  })
})


// @des  Fetch active/reorder/deactive products
// @route GET /api/products/admin
// @access admin

/**this function for get all off the shelf  products*/
const getProductListOutAdmin = asyncHandler(async (req, res) => {


  const stock = await Batch.aggregate([
    // Match products with a productRating field
    { $match: { productId: { $exists: true } } },
    
    // Group products by productId and calculate the total qty
    { $group: {
        _id: "$productId",
        totalQty: { $sum: "$qty" },
      } },
  
    // Lookup data from the Product collection using productId
    { $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "product"
      } },
  
    // Unwind the product array to get a single document per batch item
    { $unwind: "$product" }
  ]);



  const path = req.query.path
  console.log(path)
  let products = ''
// use a switch statement to determine which set of products to fetch based on the value of the "path" parameter
  switch (path) {
    case 'active':
      products = await Product.find({ active: true, type: false }).sort({createdAt:-1})
      break

    case 'inStock':
      // products = await Product.find({active: true, $expr:{$gt:["$reOrderLevel", "$countInStock"]}}) //out of stock if reorder level is used---dont delete this line needed for future reference
      products = stock
      break

    case 'deactivated':
      products = await Product.find({ active: false, type: false })
      break
  }

  //  products = await Product.find({ active: true })

  res.json({
    products,
  })
})

// @des  Fetch  single product
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {

  const product = await Product.findById(req.params.id)


  if (product) {
  // If the product is in-house Return the product as is
    if(product.type === true){
      res.json(product)
    }else{
      // Find the oldest batch that has a quantity greater than 0 for this product 
      const batch = await Batch.find({ productId: product._id, qty: { $gt: 0 } }).populate("productId").sort({createdAt: 1})

      if(batch.length > 0) {
          // Create a view object with information from the batch and the product
        const viewObj ={
        
          _id: batch[0].productId._id,
          user:batch[0].productId.user,
          name: batch[0].productId.name,
          image: batch[0].productId.image,
          category:  batch[0].productId.category,
          description: batch[0].productId.description,
          rating:batch[0].productId.rating,
          numReviews:batch[0].productId.numReviews,
          price:batch[0].salesPrice,
          countInStock: batch[0].qty,
          reOrderLevel: batch[0].productId.reOrderLevel,
          dailyCapacity:  '',
          active: batch[0].productId.active,
          type:  batch[0].productId.type,
          reviews:  batch[0].productId.reviews,
          batchId: batch[0]._id
      
      }
      
      res.json(viewObj)
      }else{
      // If there are no batches with a quantity greater than 0, return the product as is
       res.json(product)
      }
     
    }
    
  } else {
    res.status(404)
    throw new Error('Product not found!')
  }
})

// @des  Delete a product
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {

  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found!')
  }
})

// @des  delete multiple products
// @route Delete /api/products/delete
// @access Private/Admin
const deleteManyProducts = asyncHandler(async (req, res) => {
  //todo-----split req.headers.data by , TO mAKE AN ARRAY

   // Split the comma-separated list of ids from the request header into an array
  const ids = req.headers.data.split(',')

  if (ids.length > 0) {
       // Use the deleteMany method of the Product model to delete all products with ids in the array
    await Product.deleteMany({
      _id: {
        $in: ids,
      },
    })
    res.json({ message: 'products removed' })
  } else {
    res.status(404)
    throw new Error('Product not found!')
  }
})

// @des  create a product
// @route POST /api/products/
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {

  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    user: req.user._id,
    image:  req.body.image,
    brand: req.body.brand ?? 'Araliya',
    category: req.body.category,
    reOrderLevel: (req.body.reOrderLevel === '') && 0,
    countInStock: (req.body.countInStock === '')  && 0,
    dailyCapacity: req.body.dailyCapacity,
    numReviews: 0,
    description: req.body.description,
    active: req.body.active,
    type: req.body.type,
  })

  const createProduct = await product.save()
  res.status(201).json(createProduct)
})

// @des  Update a product
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {

  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
    reOrderLevel,
    dailyCapacity,
    active,
    type
  } = req.body


  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock
    product.reOrderLevel = reOrderLevel
    product.dailyCapacity = dailyCapacity
    product.active = active
    product.type = type
    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

//function to update quantiy of in-house products daily based on dailyCapacity
const updateDailyCapacity = asyncHandler(async (req, res) => {
 
  await Product.updateMany({ active: true, type:true }, [
    { $set: { countInStock: '$dailyCapacity' } },
   
  ])
})

//first star represent a minute, seconde hour as on
//this function will run in 6.34AM everyday
cron.schedule('34 06 * * *', () => {
  updateDailyCapacity()
  
})



// @des  Create new review
// @route POST /api/products/:id/reviews
// @access Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    // Create a new review object with the user's name, rating, comment, and ID
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

  // Add the new review to the product's reviews array
    product.reviews.push(review)
    // Update the number of reviews on the product
    product.numReviews = product.reviews.length
     // Calculate the new average rating for the product based on all reviews
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @des  Get top rated products
// @route POST /api/products/top
// @access Private
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find( {active: true}).sort({ rating: -1 }).limit(6)

  res.json(products)
})

//testing mail
const email = asyncHandler(async (req, res) => {
  try {
    await sendEmail()
    res.status(200).json({ success: true, message: 'Reset Email Sent' })
  } catch (error) {
    res.status(500)
    throw new Error('Email not sent, please try again')
  }
})

export {
  getProducts,
  getProductById,
  getProductListInAdmin,
  getProductListOutAdmin,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  email,
  deleteManyProducts,
}
