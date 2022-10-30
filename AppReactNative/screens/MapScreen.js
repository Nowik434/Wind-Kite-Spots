import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState, useEffect } from "react";
import tw from "twrnc";
import Map from "../components/Map";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentLocation,
  setCurrentLocation,
} from "../slices/locationSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import Messages from "../components/Messages";
import { selectMessages } from "../slices/messagesSlice";

import { GeofencingEventType } from "expo-location";
import * as TaskManager from "expo-task-manager";
import { Button } from "react-native-elements";

const MapScreen = () => {
  const { latitude, longitude } = useSelector(selectCurrentLocation);
  const [errorMsg, setErrorMsg] = useState(null);

  const { messages } = useSelector(selectMessages);

  const dispatch = useDispatch();

  // GEOFENCING

  const [region, setRegion] = useState({
    latitude: 59.334591,
    longitude: 18.06324,
    latitudeDelta: 0.4,
    longitudeDelta: 0.4,
  });

  let [regions, setRegions] = useState([
    {
      title: "Test",
      latitude: 59.334591,
      longitude: 18.06324,
      radius: 100,
    },
  ]);

  function setGeofences() {
    TaskManager.defineTask(
      "Task1",
      ({ data: { eventType, regions }, error }) => {
        if (error) {
          console.log(error.message);
          alert(error.message);
          return;
        }
        if (eventType === GeofencingEventType.Enter) {
          console.log("You've entered region:", region);
          alert("You've entered region:", region);
        } else if (eventType === GeofencingEventType.Exit) {
          console.log("You've left region:", region);
          alert("You've left region:", region);
        }
      }
    );
  }

  async function isGeoRunning() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === "granted") {
      await Location.startLocationUpdatesAsync("Task1", regions);
    }
    // Location.startLocationUpdatesAsync("Task1", regions);
    // await Location.hasStartedGeofencingAsync("Task1")
    //   .then((data) => alert(data))
    // await TaskManager.isTaskRegisteredAsync("Task1")
    //   .then((data) => alert(data))
  }

  useEffect(() => {
    setGeofences();
  }, []); // Runs only once.

  // GEOFENCING

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location.coords.latitude, location.coords.longitude);
      dispatch(
        setCurrentLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        })
      );
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (latitude) {
    text = JSON.stringify({ latitude, longitude });
  }

  return (
    <View>
      <View style={tw`h-1/1`}>
        <Map latitude={latitude} longitude={longitude} />
        <Button
          style="styleButton"
          title="checkRegion()"
          onPress={() => {
            isGeoRunning();
          }}
        />
      </View>
      <View style={tw`h-1/2`}>
        <Text style={styles.paragraph}>{text}</Text>
        <SafeAreaView style={tw`bg-white h-full`}>
          <Messages messages={messages} />
        </SafeAreaView>
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  text: {
    color: "blue",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
