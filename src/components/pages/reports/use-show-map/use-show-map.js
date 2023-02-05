import { useEffect, useState } from 'react'

export const useShowMap = () => {
  const [showMap, setShowMap] = useState(false);
  const [position, setPosition] = useState([{lat:-0.1892741496883334,lng: -78.4977070330735}]);
  useEffect(() => {
    console.log(position)
  },[])
  const handleShowMap = (position) => {
    const [lat, lng] = position.split(',');
    setPosition([{
      lat: lat,
      lng: lng
    }]);
    setShowMap(!showMap);
  }
  return {
    showMap,
    position,
    handleShowMap
  }
}
