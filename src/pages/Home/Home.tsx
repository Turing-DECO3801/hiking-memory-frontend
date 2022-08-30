import React, { useContext } from 'react';
import Navbar from '../../components/layout/Navbar/Navbar';
import Map from '../../components/common/Map/Map';
import { HikeContext } from '../../contexts/HikeContext';
import Card from 'react-bootstrap/Card';
import "./Box.scss"
import { readFile } from 'fs/promises';

interface Hike {
  title: string,
  path: any[],
};


const Home = () => { 
  const hikeContext = useContext(HikeContext);

  const pathExample = [{ lat: 37, lng: -122 },
    { lat: 37, lng: -121 },
    { lat: 38, lng: -121 },
    { lat: 38, lng: -122 }];

  const hikeInfo = [ 
    {title: 'Hike 1', path: pathExample}, 
    {title: 'Hike 2', path: pathExample},
    {title: 'Hike 3', path: pathExample} 
  ];



  const renderCard = (hike: Hike, index: number) => {
    return( 
      <Card style={{ width: '18rem' }} key={index} className="box">
        <Map path={hike.path} audio={hike.path}/>
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
