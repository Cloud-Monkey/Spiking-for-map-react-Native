import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import MapView from "react-native-maps";
import { useState, useEffect } from "react";
import * as Location from "expo-location";

const App = () => {
  const [location, setLocation] = useState();
  const [long, setLong] = useState();
  const [lat, setLat] = useState();

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant location permissions");
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      setLong(currentLocation.coords.longitude);
      setLat(currentLocation.coords.latitude);
    };
    getPermissions();
  }, []);

  return (
    <View style={styles.container}>
      {lat && long &&
        <MapView
          style={styles.maps}
          initialRegion={{
            latitude: lat,
            longitude: long,
            latitudeDelta: 0.0622,
            longitudeDelta: 0.0121,
          }}
        />
      }
      <Text>Park Finder reminder is here!!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  maps: {
    width: "100%",
    height: "50%",
  },
});

export default App;