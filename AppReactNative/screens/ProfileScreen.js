import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import CardComponent from "../components/Card";
import tw from "tailwind-react-native-classnames";
import ListOfFriends from "../components/ListOfFriends";

const ProfileScreen = () => {
  const dispatch = useDispatch();

  return (
    <>
      <View>
        <ScrollView style={tw`h-100, p-5`}>
          <ListOfFriends />
        </ScrollView>
      </View>
    </>
  );
};

export default ProfileScreen;
