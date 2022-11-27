import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../HomeScreen";
import MapScreen from "../MapScreen";
import StartActivityScreen from "../StartAcivityScreen";
import AppBarAction from "../../components/AppBarAction";
import FriendsScreen from "../FriendsScreen";
import ProfileScreen from "../ProfileScreen";

const Stack = createNativeStackNavigator();

function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <AppBarAction {...props} />,
      }}
    >
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

export default ProfileStack;
