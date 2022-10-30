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
import { Provider as PaperProvider } from "react-native-paper";
import BottomNavigationBar from "./components/BottomNavigation";
import AppBarAction from "./components/AppBarAction";

export default function App() {
  // const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <PaperProvider>
        <AppBarAction />
        {/* <NavigationContainer> */}
        {/* <SafeAreaProvider>
            <Stack.Navigator initialRouteName="HomeScreen">
              <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="MapScreen"
                component={MapScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="MessageScreen"
                component={MessageScreen}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          </SafeAreaProvider> */}
        {/* </NavigationContainer> */}
        <BottomNavigationBar />
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
