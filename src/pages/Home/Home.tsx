import React, { useContext } from 'react';
import Navbar from '../../components/layout/Navbar/Navbar';
import Map from '../../components/common/Map/Map';
import { HikeContext } from '../../contexts/HikeContext';

const Home = () => {
  const hikeContext = useContext(HikeContext);
  const hike = [
    { lat: 37.772, lng: -122.214 },
    { lat: 21.291, lng: -157.821 },
    { lat: -18.142, lng: 178.431 },
    { lat: -27.467, lng: 153.027 },
  ]
  return (
    <>
      <Map coordinates={hike} />
    </>
  );
};

export default Home;
