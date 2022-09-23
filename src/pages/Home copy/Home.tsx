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


  return (
    <div className="grid">
    </div>
  );
  
};

export default Home;
