import React from 'react';
import {useMemo} from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import "./Map.scss"
import { createTextSpanFromBounds } from 'typescript';
import { render } from '@testing-library/react';
import { FaPlay } from 'react-icons/fa';
import AudioModal from '../AudioModal/AudioModal';


const containerStyle = {
  width: '100%',
  height: '844px',
};



interface MapProps {
  path: {lat: number, lng: number}[];
  audio: {lat: number, lng: number}[];
};

function Map(mapInfo: MapProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBDYINIldIZy3ssEzrMpAvRA6Rdd_GN020'
  });

  let audio = new Audio("/test.mp3");

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
        const marker = new google.maps.Marker({position: mapInfo.audio[i], map: map})
        marker.addListener("click", () => {
          audio.play();
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
    <GoogleMap
      mapContainerStyle={containerStyle}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options = {options}
    >
      { /* Child components, such as markers, info windows, etc. */ }
      <></>
    </GoogleMap>
  ) : <></>;
}

export default React.memo(Map);