import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import CardComponent from "../components/Card";
import tw from "tailwind-react-native-classnames";

const SpotsScreen = () => {
  const dispatch = useDispatch();

  return (
    <>
      <View>
        <ScrollView style={tw`h-100, p-5`}>
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
        </ScrollView>
      </View>
    </>
  );
};

export default SpotsScreen;

// const styles = StyleSheet.create({
//   text: {
//     color: "blue",
//   },
//   baseText: {
//     color: "blue",
//     fontSize: "40px",
//     fontWeight: "bold",
//   },
// });
