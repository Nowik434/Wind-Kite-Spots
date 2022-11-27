import * as React from "react";
import { StyleSheet } from "react-native";
import { BottomNavigation, Text } from "react-native-paper";
import FriendsScreen from "../screens/FriendsScreen";
import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";
import MessageScreen from "../screens/MessageScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SpotsScreen from "../screens/SpotsScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AppBarAction from "./AppBarAction";
import MapStack from "../screens/stacks/MapStack";
import FriendsStack from "../screens/stacks/FriendsStack";
import HomeStack from "../screens/stacks/HomeStack";
import SpotsStack from "../screens/stacks/SpotsStack";
import ProfileStack from "../screens/stacks/ProfileStack";

const Tab = createMaterialBottomTabNavigator();

const BottomNavigationBar = () => {
  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: "#6FCF97" }}
      initialRouteName="Home"
      screenOptions={{
        header: (props) => <AppBarAction {...props} />,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused, color }) => (
            <>
              {focused ? (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ) : (
                <MaterialCommunityIcons
                  name="home-outline"
                  color={color}
                  size={26}
                />
              )}
            </>
          ),
        }}
      />
      <Tab.Screen
        name="MapTab"
        component={MapStack}
        options={{
          tabBarLabel: "Map",
          tabBarIcon: ({ focused, color }) => (
            <>
              {focused ? (
                <MaterialCommunityIcons name="map" color={color} size={26} />
              ) : (
                <MaterialCommunityIcons
                  name="map-outline"
                  color={color}
                  size={26}
                />
              )}
            </>
          ),
        }}
      />
      <Tab.Screen
        name="FriendsTab"
        component={FriendsStack}
        options={{
          tabBarLabel: "Friends",
          tabBarIcon: ({ focused, color }) => (
            <>
              {focused ? (
                <MaterialCommunityIcons
                  name="account-check"
                  color={color}
                  size={26}
                />
              ) : (
                <MaterialCommunityIcons
                  name="account-check-outline"
                  color={color}
                  size={26}
                />
              )}
            </>
          ),
        }}
      />
      <Tab.Screen
        name="SpotsTab"
        component={SpotsStack}
        options={{
          tabBarLabel: "Spots",
          tabBarIcon: ({ focused, color }) => (
            <>
              {focused ? (
                <MaterialCommunityIcons
                  name="crosshairs-gps"
                  color={color}
                  size={26}
                />
              ) : (
                <MaterialCommunityIcons
                  name="crosshairs"
                  color={color}
                  size={26}
                />
              )}
            </>
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused, color }) => (
            <>
              {focused ? (
                <MaterialCommunityIcons
                  name="account-circle"
                  color={color}
                  size={26}
                />
              ) : (
                <MaterialCommunityIcons
                  name="account-circle-outline"
                  color={color}
                  size={26}
                />
              )}
            </>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigationBar;
