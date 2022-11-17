import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
// import Swiper core and required modules

import Spinner from '../components/Spinner'
import shareIcon from '../assets/svg/shareIcon.svg'

import React from 'react'

const Listing = () => {
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(false)
  const [shareLinkCopied, setShareLinkCopied] = useState(false)

  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {}, [])

  if (loading) {
    return <Spinner />
  }


  const position = [51.505, -0.09]
  return (
    <main>
     <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={position}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>
     

    </main>
  )
}

export default Listing
