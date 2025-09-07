import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, PermissionsAndroid, Platform, TouchableOpacity } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";

const Eagle = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const mapRef = useRef<MapView>(null);

  // Example destination (fixed)
  const destination = { latitude: 28.6139, longitude: 77.2090 }; // Delhi

  useEffect(() => {
    const requestPermission = async () => {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Location permission denied");
          return;
        }
      }
      watchLocation();
    };

    requestPermission();
  }, []);

  const watchLocation = () => {
    Geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation({ latitude, longitude });
      },
      (error) => console.log("Error:", error),
      { enableHighAccuracy: true, distanceFilter: 10, interval: 5000 }
    );
  };

  if (!location) {
    return (
      <View style={styles.center}>
        <Text>Fetching location...</Text>
      </View>
    );
  }

  const coords = [
    { latitude: location.latitude, longitude: location.longitude },
    destination,
  ];

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {/* Current Location Marker */}
        <Marker coordinate={location} title="You" pinColor="green" />

        {/* Destination Marker */}
        <Marker coordinate={destination} title="Destination" pinColor="red" />

        {/* Polyline between current and destination */}
        <Polyline coordinates={coords} strokeColor="blue" strokeWidth={4} />
      </MapView>

      {/* Button to recenter */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          mapRef.current?.animateToRegion({
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          });
        }}
      >
        <Text style={styles.buttonText}>📍 Recenter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  button: {
    position: "absolute",
    bottom: 40,
    right: 20,
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    elevation: 4,
  },
  buttonText: { color: "#fff", fontWeight: "600" },
});

export default Eagle;
