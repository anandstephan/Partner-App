import { useState, useCallback } from "react";
import { Platform, PermissionsAndroid, Alert } from "react-native";
import Geolocation from "react-native-geolocation-service";

export default function useLocation() {
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestPermission = async () => {
    if (Platform.OS !== "android") return true;

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      Alert.alert("Permission required", "Location permission is required");
      return false;
    }
    return true;
  };

  const fetchLocation = useCallback(async () => {
    setLoading(true);
    setError(null);

    const hasPermission = await requestPermission();
    if (!hasPermission) {
      setLoading(false);
      return;
    }

    try {
      Geolocation.getCurrentPosition(
        position => {
          console.log("position", position);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
          setLoading(false);
        },
        error => {
          setError(error.message);
          Alert.alert("Location error", error.message);
          setLoading(false);
        },
        {
          enableHighAccuracy: false, // 🔥 important
          timeout: 20000,
          maximumAge: 10000,
          forceRequestLocation: true,
          showLocationDialog: true, // 🔥 GPS dialog
        }
      );
    } catch (e) {
      console.log("Native location crash", e);
      setLoading(false);
    }
  }, []);

  return { lat, lng, loading, error, fetchLocation };
}
