import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Text
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const Eagle = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission denied');
          return;
        }
      }
      Geolocation.getCurrentPosition(
        pos => {
          const { latitude, longitude } = pos.coords;
          setLocation({ latitude, longitude });
        },
        error => console.log(error),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
    };

    requestLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(location)}</Text>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation={true}
        >
          <Marker coordinate={location} title="You are here" />
        </MapView>
      )}
    </View>
  );
};

export default Eagle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  map: {
    flex: 1,
    borderWidth:2
  },
});
