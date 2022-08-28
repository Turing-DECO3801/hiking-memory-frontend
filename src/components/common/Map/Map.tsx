import React from 'react';
import {useMemo} from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import "./Map.scss"
import { createTextSpanFromBounds } from 'typescript';


const containerStyle = {
  width: '100%',
  height: '200px',
};



interface MapProps {
  zoom: number,
  center: {lat: number; lng: number},
  coordinates: {lat: number, lng: number}[]
};

function Map(mapInfo: MapProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBDYINIldIZy3ssEzrMpAvRA6Rdd_GN020'
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map: any) {
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < mapInfo.coordinates.length; i++) {
      bounds.extend(mapInfo.coordinates[i]);
    }
    map.fitBounds(bounds);
    const flightPlanCoordinates = mapInfo.coordinates;
    const flightPath = new google.maps.Polyline({
      path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });  
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
      center={mapInfo.center}
      zoom={mapInfo.zoom}
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