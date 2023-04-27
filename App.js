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
      // console.log(lat, long);
      // return currentLocation;
      // return;
      // console.log(currentLocation.coords, "<----------Currrent Longitude");
      // setLong(currentLocation.coords.longitude);
      // setLat(currentLocation.coords.latitude);
    };
    getPermissions();
  }, []);
  // console.log(currentLocation.coords, "<----------Currrent Longitude");

  // const dynamicLocation = {
  //   latitude: Location.coords.latitude,
  //   longitude: Location.coords.longitude,
  // };
  return (
    <View style={styles.container}>
      <MapView
        style={styles.maps}
        initialRegion={{
          latitude: 53.480759,
          longitude: -2.242631,
          latitudeDelta: 0.0622,
          longitudeDelta: 0.0121,
        }}
      >
        {/* <Marker coordinate={pin} /> */}
      </MapView>
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
    // Dimensions.get("screen").width,
    height: "50%",
    // Dimensions.get("screen").height,
  },
});
export default App;
