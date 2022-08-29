import React, { useContext } from 'react';
import Navbar from '../../components/layout/Navbar/Navbar';
import Map from '../../components/common/Map/Map';
import { HikeContext } from '../../contexts/HikeContext';
import Card from 'react-bootstrap/Card';
import "./HikeTitle.scss"
import { readFile } from 'fs/promises';

interface Hike {
  title: string,
  path: any[],
  center: {lat: number, lng: number},
  zoom: number;
};


const Home = () => {
  
  
  const pathExample = [
    { lat: -27.376209, lng: 152.951320 },
    { lat: -27.376153, lng: 152.950598 },
    { lat: -27.375992, lng: 152.950192 },
    { lat: -27.375744, lng: 152.949777 }];

  const singleHikeInfo = {title: 'Hike 1', path: pathExample, center: {lat: -10, lng: -38.523}, zoom: 10};

  return(
    <div>
      <div className="MapIndex"> 
        <div> Hike 1 </div>
        <div> 12/04/2022 </div>
        <div> Tap </div>
      </div>
      <Map center={singleHikeInfo.center} zoom={singleHikeInfo.zoom} path={singleHikeInfo.path} audio={singleHikeInfo.path}></Map>
    </div>
  )
  
  

  /*
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
  */
};

export default Home;