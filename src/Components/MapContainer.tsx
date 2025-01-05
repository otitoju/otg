import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const MapContainer = () => {
  
  const mapRef = useRef<MapView>(null);
  
  const moveTo = async (position: LatLng) => {
    const camera = await mapRef.current?.getCamera();

    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
    }
  }


  useEffect(() => {
   // fitInCoordinatesOnMap()
  }, [])
  
  const location = {
    latitude: 37.78825, 
    longitude: -122.4324, 
    latitudeDelta: 0.01,  
    longitudeDelta: 0.01, 
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={location}
      >
       
        <Marker
          coordinate={{ latitude: location.latitude, longitude: location.longitude }}
          title="Your Location"
          description="This is a marker description"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    
  },
});

export default MapContainer;
