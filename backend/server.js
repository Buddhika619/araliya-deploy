import path from 'path'
import express, { application } from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import configRoutes from './routes/configRoutes.js'
import fetch from 'node-fetch';

import cors from 'cors'



dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

//parse req.body GET/POST
app.use(express.json())

app.use(cors());

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/config', configRoutes)

//paypal config
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

//getting distance
app.get('/api/distance', async(req, res) => {

  console.log(req.query)
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${req.query.lat}, ${req.query.lng}&=&origins=7.297516055555007, 80.73621449338462&key=${process.env.GOOGLE_API_KEY}`
  // fetch(url)
  // .then((response) => response.json())
  // .then((data) => res.json(data));
  const response= await fetch(url)
  const data = await response.json()
  data.api = process.env.GOOGLE_API_KEY
  res.json(data)

  })


//we dont access __dirname when working with ES modules, it only available for common js modules, so path.resolve is used to mimic the __driname
const __dirname = path.resolve()

//making the uploads file static so browser can access it
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

//after building react application giviing the access to react build version
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('api is running!')
  })
}

//error handling
app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
)
