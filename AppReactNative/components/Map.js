import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import MapView, { Marker, Circle, Callout } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { selectOrigin } from "../slices/navSlice";
import {
  selectCurrentLocation,
  setCurrentLocation,
} from "../slices/locationSlice";
import { selectMessages } from "../slices/messagesSlice";
import { Button } from "react-native-paper";

const Map = ({ latitude, longitude, regions, navigation }) => {
  console.log(latitude, regions);
  const { messages } = useSelector(selectMessages);

  const dispatch = useDispatch();

  // const markers = [{ latitude: "", longitude: "" }];

  // const onMarkerPressed = (marker) => {
  //   const params = { marker };
  //   this.props.jumpTo("home");
  // };

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

      {regions.map((marker) => {
        {
          console.log(marker);
        }
        return (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={"message"}
            description={marker.title}
            // onPress={() => navigation.navigate("Home")}
          >
            <Callout>
              <View style={styles.clickBox}>
                <Text style={styles.clickBoxText}>Start activity!</Text>
                <Button
                  mode="outlined"
                  onPress={() => navigation.navigate("StartActivity")}
                >
                  START
                </Button>
              </View>
            </Callout>
          </Marker>
        );
      })}

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

const styles = StyleSheet.create({
  clickBox: {
    margin: 10,
    // width: "100%",
  },
  clickBoxText: {
    textAlign: "center",
    alignItems: "center",
    alignSelf: "center",
    fontSize: 20,
    paddingBottom: 20,
  },
});
