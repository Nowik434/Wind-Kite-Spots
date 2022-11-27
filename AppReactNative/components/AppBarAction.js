import * as React from "react";
import { Appbar } from "react-native-paper";
import { Platform, StyleSheet } from "react-native";

const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";

const AppBarAction = ({ navigation, back, route }) => (
  <Appbar.Header style={styles.header}>
    {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
    <Appbar.Content title={route.name} subtitle={"Subtitle"} />
    <Appbar.Action icon="magnify" onPress={() => {}} />
    <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
  </Appbar.Header>
);

export default AppBarAction;

const styles = StyleSheet.create({
  header: {
    // backgroundColor: "transparent",
  },
});
