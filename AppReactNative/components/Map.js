import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import MapView, { Marker, Circle } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { selectOrigin } from "../slices/navSlice";
import {
  selectCurrentLocation,
  setCurrentLocation,
} from "../slices/locationSlice";
import { selectMessages } from "../slices/messagesSlice";

const Map = ({ latitude, longitude }) => {
  console.log(latitude);
  const { messages } = useSelector(selectMessages);

  const dispatch = useDispatch();

  return (
    <MapView
      style={tw`flex-1`}
      mapType="mutedStandard"
      showsUserLocation={true}
      onUserLocationChange={(e) => {
        console.log("onUserLocationChange", e.nativeEvent.coordinate);
        dispatch(
          setCurrentLocation({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          })
        );
      }}
      // initialRegion={{
      //   latitude: origin.location.lat,
      //   longitude: origin.location.lng,
      //   latitudeDelta: 0.005,
      //   longitudeDelta: 0.005,
      // }}
    >
      <Marker
        // key={index}
        coordinate={{ latitude: latitude, longitude: longitude }}
        title={"Moja pozycja"}
        description={"fdsd"}
      />

      {messages.map((message) => (
        <Marker
          // key={index}
          coordinate={{
            latitude: message.location.latitude,
            longitude: message.location.longitude,
          }}
          title={"message"}
          description={message.message}
        />
      ))}

      <Circle
        center={{ latitude: latitude, longitude: longitude }}
        radius={1000}
        strokeColor={"red"}
        fillColor={"0 2px 6px 0 rgba(30, 166, 197, 0.32)"}
      />
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});
