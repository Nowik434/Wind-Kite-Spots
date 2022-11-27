import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import { store } from "./store";
import { SafeAreaProvider } from "react-native-safe-area-context";
// import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MapScreen from "./screens/MapScreen";
import MessageScreen from "./screens/MessageScreen";
import BottomNavigationBar from "./components/BottomNavigation";
import AppBarAction from "./components/AppBarAction";
import {
  MD3LightTheme as DefaultTheme,
  MD3LightTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import MapStack from "./screens/stacks/MapStack";

const theme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
    ...MD3LightTheme.colors,
    primary: "#6FCF97",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(255, 215, 245)",
    onPrimaryContainer: "rgb(56, 0, 56)",
    // secondary: "rgb(109, 88, 105)",
    // onSecondary: "rgb(255, 255, 255)",
    // secondaryContainer: "rgb(247, 218, 239)",
    // onSecondaryContainer: "rgb(39, 22, 36)",
  },
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          {/* <Stack.Navigator initialRouteName="WelcomeScreen">
            <AppBarAction />
            <Stack.Screen name="Map" component={MapStack} />
            <Stack.Screen name="TabsBottom" component={BottomNavigationBar} />
          </Stack.Navigator> */}
          <BottomNavigationBar />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
