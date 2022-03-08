import React from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'

export default function MapMarker(props) {

    const { icon, size, colour, onClick } = props

    return <>
        <FaMapMarkerAlt size={size} color={colour} />
    </>
}
