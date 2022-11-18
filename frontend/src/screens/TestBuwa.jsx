import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import MobileNavbar from '../components/layouts/MobileNavBar'
import { useSelector } from 'react-redux'

const containerStyle = {
  width: '400px',
  height: '400px',
}

function MyComponent({ lat, long }) {
  const fetchCart = useSelector((state) => state.cart)
  const cart = { ...fetchCart }
  const center = {
    lat: cart.shippingAddress.location.lat,
    lng: cart.shippingAddress.location.long,
  }

  return (
    <LoadScript googleMapsApiKey='AIzaSyCB9DM92shtpgL4FYAAq1XWRM_Vp2jj-7Y'>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        <Marker position={center} />
      </GoogleMap>

      <MobileNavbar />
    </LoadScript>
  )
}

export default React.memo(MyComponent)
