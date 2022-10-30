import * as React from "react";
import { Appbar } from "react-native-paper";
import { Platform, StyleSheet } from "react-native";

const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";

const AppBarAction = () => (
  <Appbar.Header style={styles.header}>
    <Appbar.Content title="Title" subtitle={"Subtitle"} />
    <Appbar.Action icon="magnify" onPress={() => {}} />
    <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
  </Appbar.Header>
);

export default AppBarAction;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "transparent",
  },
});
