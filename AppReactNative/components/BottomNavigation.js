import * as React from "react";
import { StyleSheet } from "react-native";
import { BottomNavigation, Text } from "react-native-paper";
import FriendsScreen from "../screens/FriendsScreen";
import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";
import MessageScreen from "../screens/MessageScreen";
import SpotsScreen from "../screens/SpotsScreen";

const BottomNavigationBar = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "home",
      title: "Home",
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
    },
    {
      key: "map",
      title: "Map",
      focusedIcon: "map",
      unfocusedIcon: "map-outline",
    },
    {
      key: "friends",
      title: "Friends",
      focusedIcon: "bell",
      unfocusedIcon: "bell-outline",
    },
    { key: "spots", title: "Spots", focusedIcon: "history" },
    { key: "profile", title: "Profile", focusedIcon: "history" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    map: MapScreen,
    friends: FriendsScreen,
    spots: SpotsScreen,
    profile: MessageScreen,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{ backgroundColor: "#6FCF97" }}
    />
  );
};

export default BottomNavigationBar;
