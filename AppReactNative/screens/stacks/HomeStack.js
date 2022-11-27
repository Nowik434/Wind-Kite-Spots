import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../HomeScreen";
import MapScreen from "../MapScreen";
import StartActivityScreen from "../StartAcivityScreen";
import AppBarAction from "../../components/AppBarAction";
import FriendsScreen from "../FriendsScreen";

const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <AppBarAction {...props} />,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

export default HomeStack;
