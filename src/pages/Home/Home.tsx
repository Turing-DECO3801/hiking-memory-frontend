import React, { useContext } from 'react';
import Navbar from '../../components/layout/Navbar/Navbar';
import Map from '../../components/common/Map/Map';
import { HikeContext } from '../../contexts/HikeContext';
import Card from 'react-bootstrap/Card';
import "./Box.scss"

interface Hike {
  title: string,
  path: any[],
  center: {lat: number, lng: number},
  zoom: number;
};

const Home = () => {
  const hikeContext = useContext(HikeContext);

  const pathExample = [{ lat: 37, lng: -122 },
    { lat: 37, lng: -121 },
    { lat: 38, lng: -121 },
    { lat: 38, lng: -122 }];

  const hikeInfo = [ 
    {title: 'Hike 1', path: pathExample, center: {lat: -10, lng: -38.523}, zoom: 10}, 
    {title: 'Hike 2', path: pathExample, center: {lat: -27, lng: 153}, zoom: 10},
    {title: 'Hike 3', path: pathExample, center: {lat: -27, lng: 153}, zoom: 10} 
  ];



  const renderCard = (hike: Hike, index: number) => {
    return( 
      <Card style={{ width: '18rem' }} key={index} className="box">
        <Map center={hike.center} zoom={hike.zoom} coordinates={hike.path}/>
        <Card.Body>
          <Card.Title className="title">{hike.title}</Card.Title>
        </Card.Body>
      </Card>
    )
  }

  return (
    <div className="grid">
        {hikeInfo.map(renderCard)}
    </div>
  );
};

export default Home;
