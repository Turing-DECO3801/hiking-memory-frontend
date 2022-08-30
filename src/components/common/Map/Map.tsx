import React, { useState } from 'react';
import {useMemo} from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import "./Map.scss"
import { createTextSpanFromBounds } from 'typescript';
import { render } from '@testing-library/react';
import { FaPlay } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import AudioModal from '../AudioModal/AudioModal';


const containerStyle = {
  width: '100%',
  height: '844px',
};



interface MapProps {
  path: {lat: number, lng: number}[];
  audio: {location: {lat: number, lng: number}, file: string}[];
};

function Map(mapInfo: MapProps) {
  const [show, setShow] = useState(false);
  const [audioFile, setAudioFile] = useState("hello");


  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBDYINIldIZy3ssEzrMpAvRA6Rdd_GN020'
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map: any) {
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < mapInfo.path.length; i++) {
      bounds.extend(mapInfo.path[i]);
    }
    map.fitBounds(bounds);
    map.setMapTypeId(google.maps.MapTypeId.TERRAIN)
    const flightPlanCoordinates = mapInfo.path;
    const flightPath = new google.maps.Polyline({
      path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: '#7600bc',
      strokeOpacity: 1.0,
      strokeWeight: 7,
    });  
    for (var i = 0; i < mapInfo.audio.length; i++) {
        const marker = new google.maps.Marker({position: mapInfo.audio[i].location, map: map})
        const file = mapInfo.audio[i].file
        marker.addListener("click", () => {
          setAudioFile(file)
          setShow(true);
        })
    }
    flightPath.setMap(map);
  },[]);

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
      mapId: 'ID645ff0c21ec8c305',
    }),
    []
  );
  
  return isLoaded ? (
    <div>
          <GoogleMap
      mapContainerStyle={containerStyle}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options = {options}
    >    </GoogleMap>
      <AudioModal show={show} handleClose={()=>setShow(false)} handleOpen={() => setShow(true)} audioFile={audioFile} ></AudioModal>
    </div>
  ) : <></>;
  
}

export default Map;