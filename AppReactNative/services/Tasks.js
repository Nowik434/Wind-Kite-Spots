// import React, { useState, useEffect } from "react";
// import { StyleSheet, Text, View, Dimensions, Button } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import * as Location from "expo-location";
// import * as TaskManager from "expo-task-manager";

// const Geofence = () => {
//   const [region, setRegion] = useState({
//     latitude: 59.334591,
//     longitude: 18.06324,
//     latitudeDelta: 0.4,
//     longitudeDelta: 0.4,
//   });

//   let [regions, setRegions] = useState([
//     {
//       title: "Test",
//       latitude: 59.334591,
//       longitude: 18.06324,
//       radius: 100,
//     },
//   ]);

//   function setGeofences() {
//     TaskManager.defineTask(
//       "Task1",
//       ({ data: { eventType, regions }, error }) => {
//         if (error) {
//           console.log(error.message);
//           alert(error.message);
//           return;
//         }
//         if (eventType === LocationGeofencingEventType.Enter) {
//           console.log("You've entered region:", region);
//           alert("You've entered region:", region);
//         } else if (eventType === LocationGeofencingEventType.Exit) {
//           console.log("You've left region:", region);
//           alert("You've left region:", region);
//         }
//       }
//     );
//   }

//   async function isGeoRunning() {
//     Location.startGeofencingAsync("Task1", regions);
//     // await Location.hasStartedGeofencingAsync("Task1")
//     //   .then((data) => alert(data))
//     // await TaskManager.isTaskRegisteredAsync("Task1")
//     //   .then((data) => alert(data))
//   }

//   useEffect(() => {
//     setGeofences();
//   }, []); // Runs only once.

//   return (
//     <MapView
//       style={{ flex: 1 }}
//       region={region}
//       onRegionChangeComplete={(region) => setRegion(region)}
//     >
//       <Button
//         style="styleButton"
//         title="checkRegion()"
//         onPress={() => {
//           isGeoRunning();
//         }}
//       />
//     </MapView>
//   );
// };

// export default Geofence;
