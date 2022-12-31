import { useState } from 'react'

export const useShowMap = () => {
  const [showMap, setShowMap] = useState(false);
  const [position, setPosition] = useState([-0.1892741496883334, -78.4977070330735]);
  const handleShowMap = (position) => {
    const [lat, lng] = position.split(',');
    // const latlng = [parseFloat(lat), parseFloat(lng)]; 
    setPosition([lat,lng]);
    setShowMap(!showMap);
  }
  return {
    showMap,
    position,
    handleShowMap
  }
}
