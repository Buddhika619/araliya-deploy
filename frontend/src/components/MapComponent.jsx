import React, { useEffect, useState } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import MobileNavbar from './layouts/MobileNavBar'
import { useSelector } from 'react-redux'
import Loader from './Loader'
import axios from 'axios'
import { toast } from 'react-toastify'

const containerStyle = {
  width: `{screen.width}px`,
  height: '200px',
}

const MapComponent = ({api , zoom, lat ,long}) => {



  const fetchCart = useSelector((state) => state.cart)
  const cart = { ...fetchCart }

  const center = {
    lat: lat,
    lng: long,
  }
  

  let address = `${cart.shippingAddress.lineOne}, ${cart.shippingAddress.lineTwo}, ${cart.shippingAddress.lineThree}`


  return (
    <LoadScript googleMapsApiKey={api}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
        <Marker position={center} title= {address}/>
      </GoogleMap>

    
    </LoadScript>
  )
}

export default MapComponent
