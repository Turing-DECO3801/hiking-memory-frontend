import React, { useState } from 'react';
import {useMemo} from 'react';
import { GoogleMap, useJsApiLoader, Marker, MarkerClusterer } from '@react-google-maps/api';
import "./Map.scss"
import { createTextSpanFromBounds } from 'typescript';
import { render } from '@testing-library/react';
import { FaPlay, FaMapMarker, FaMap } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import AudioModal from '../AudioModal/AudioModal';


interface MapProps {
  path: {lat: number, lng: number}[];
  audio: {location: {lat: number, lng: number}, audioFile: string, imageFile: string}[];
  containerStyle: {width: string, height: string}
};

function Map(mapInfo: MapProps) {

  const [show, setShow] = useState(false);
  const [audioFile, setAudioFile] = useState("hello");
  const [imageFile, setImageFile] = useState("hello");

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
      strokeColor: '#F9945B',
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });

    const SVGMarker = {
      path: "M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z",
      fillColor: "#FF7222",
      fillOpacity: 1,
      strokeWeight: 0,
      rotation: 0,
      scale: 0.05,
      anchor: new google.maps.Point(192, 512),
    };

    const selectedSVGMarker = {
      path: "M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z",
      fillColor: "#1E2C5E",
      fillOpacity: 1,
      strokeWeight: 0,
      rotation: 0,
      scale: 0.08,
      anchor: new google.maps.Point(192, 512),
    };

    for (var i = 0; i < mapInfo.audio.length; i++) {
        const marker = new google.maps.Marker({
          position: mapInfo.audio[i].location,
          icon: SVGMarker,
          animation: google.maps.Animation.DROP,
          map: map
        });

        const aFile = mapInfo.audio[i].audioFile;
        const iFile = mapInfo.audio[i].imageFile;
        marker.addListener("click", () => {
          setAudioFile(aFile);
          setImageFile(iFile);
          setShow(true);
          // marker.setIcon(selectedSVGMarker)
          // marker.setAnimation(null);
          // marker.setAnimation(google.maps.Animation.BOUNCE);
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
      <AudioModal show={show}
        handleClose={() => setShow(false)}
        handleOpen={() => setShow(true)}
        audioFile={audioFile}
        imageFile={imageFile}
      />
    <GoogleMap
      mapContainerStyle={mapInfo.containerStyle}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options = {options}
    />
    </div>
  ) : <></>;
  
}

export default Map;