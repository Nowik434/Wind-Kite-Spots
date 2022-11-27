import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../HomeScreen";
import MapScreen from "../MapScreen";
import StartActivityScreen from "../StartAcivityScreen";
import AppBarAction from "../../components/AppBarAction";

const Stack = createNativeStackNavigator();

function MapStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <AppBarAction {...props} />,
      }}
    >
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="StartActivity" component={StartActivityScreen} />
      <Stack.Screen name="home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

export default MapStack;
