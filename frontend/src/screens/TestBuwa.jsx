import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import MobileNavbar from '../components/layouts/MobileNavBar'

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

function MyComponent() {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyCB9DM92shtpgL4FYAAq1XWRM_Vp2jj-7Y"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>

      <MobileNavbar/>
    </LoadScript>
  )
}

export default React.memo(MyComponent)