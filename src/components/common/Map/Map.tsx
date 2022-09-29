import React, { useState, useEffect, useRef } from 'react';
import {useMemo} from 'react';
import { GoogleMap, useJsApiLoader, Marker, MarkerClusterer } from '@react-google-maps/api';
import "./Map.scss"
import { createTextSpanFromBounds } from 'typescript';
import { render } from '@testing-library/react';
import { FaPlay, FaMapMarker, FaMap } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import AudioModal from '../AudioModal/AudioModal';
import useStateRef from '../../../hooks/useStateRef'


interface MapProps {
  path: {lat: number, lng: number}[];
  audio: {location: {lat: number, lng: number}, audioFile: string, imageFile: string}[];
  containerStyle: {width: string, height: string}
};

function Map(mapInfo: MapProps) {

  const [show, setShow] = useState(false);
  const [audioFile, setAudioFile] = useState("hello");
  const [imageFile, setImageFile] = useState("hello");
  const [currentSelection, setCurrentSelection, selectionRef] = useStateRef<any>(null);

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

    const SVGMarker = {
      path: "M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z",
      fillColor: "#FF7222",
      fillOpacity: 1,
      strokeWeight: 0,
      rotation: 0,
      scale: 0.08,
      anchor: new google.maps.Point(192, 512),
    };
  
    const volume = {
      path: "M 166.012 128.42 L 130.424 164 H 89.6 c -5.304 0 -9.6 4.296 -9.6 9.6 v 57.6 c 0 5.3 4.296 9.6 9.6 9.6 h 40.824 l 35.588 35.58 c 6.012 6.012 16.388 1.788 16.388 -6.788 V 135.208 c 0 -8.584 -10.384 -12.792 -16.388 -6.788 z m 93.328 -20.432 c -4.468 -2.932 -10.472 -1.696 -13.404 2.78 c -2.936 4.468 -1.688 10.472 2.78 13.404 c 26.508 17.396 42.328 46.64 42.328 78.232 c 0 31.592 -15.82 60.836 -42.328 78.232 c -4.468 2.928 -5.716 8.936 -2.78 13.4 c 2.816 4.284 8.772 5.824 13.404 2.78 C 291.308 275.832 310.4 240.532 310.4 202.4 S 291.308 128.972 259.34 107.988 z M 272 202.4 c 0 -25.412 -12.824 -48.776 -34.308 -62.496 c -4.476 -2.856 -10.412 -1.528 -13.248 2.984 s -1.512 10.484 2.964 13.344 C 243.308 166.388 252.8 183.644 252.8 202.4 s -9.492 36.012 -25.392 46.168 c -4.476 2.856 -5.8 8.828 -2.964 13.344 c 2.604 4.144 8.448 6.056 13.248 2.984 C 259.176 251.176 272 227.816 272 202.4 z m -56.708 -30.748 c -4.632 -2.532 -10.476 -0.864 -13.044 3.78 c -2.556 4.644 -0.864 10.48 3.78 13.044 C 211.192 191.312 214.4 196.652 214.4 202.4 c 0 5.752 -3.208 11.088 -8.368 13.924 c -4.644 2.564 -6.336 8.4 -3.78 13.044 c 2.572 4.664 8.42 6.32 13.044 3.78 c 11.292 -6.22 18.308 -18 18.308 -30.752 s -7.016 -24.528 -18.312 -30.744 z",
      fillColor: "#FFFFFF",
      fillOpacity: 1,
      strokeWeight: 0,
      rotation: 0,
      scale: 0.08,
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

    for (var i = 0; i < mapInfo.audio.length; i++) {
        const marker = new google.maps.Marker({
          position: mapInfo.audio[i].location,
          icon: SVGMarker,
          animation: google.maps.Animation.DROP,
          map: map
        });

        const volumeMarker = new google.maps.Marker({
          position: mapInfo.audio[i].location,
          icon: volume,
          animation: google.maps.Animation.DROP,
          map: map
        });

        const aFile = mapInfo.audio[i].audioFile;
        const iFile = mapInfo.audio[i].imageFile;
        volumeMarker.addListener("click", () => {
          if (selectionRef !== null && selectionRef.current !== null) {
            selectionRef.current.setIcon(SVGMarker);
          }
          setAudioFile(aFile);
          setImageFile(iFile);
          setShow(true);
          marker.setIcon(selectedSVGMarker);
          setCurrentSelection(marker);
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

  const closeModal = () => {
    const SVGMarker = {
      path: "M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z",
      fillColor: "#FF7222",
      fillOpacity: 1,
      strokeWeight: 0,
      rotation: 0,
      scale: 0.08,
      anchor: new google.maps.Point(192, 512),
    };
    setShow(false);
    if (currentSelection !== null) {
      currentSelection.setIcon(SVGMarker);
      setCurrentSelection(null);
    }
  }
  
  return isLoaded ? (
    <div>
      <AudioModal show={show}
        handleClose={() => closeModal()}
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