import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import CardComponent from "../components/Card";
import tw from "tailwind-react-native-classnames";
import ListOfFriends from "../components/ListOfFriends";
import SearchbarComponent from "../components/Searchbar";

const FriendsScreen = () => {
  const dispatch = useDispatch();

  users = [
    { name: "Jan Kowalski", avatarUrl: "" },
    { name: "John Doe", avatarUrl: "" },
    { name: "Kristofer Gislason", avatarUrl: "" },
    { name: "Grażyna Nowak", avatarUrl: "" },
    { name: "Zbiniew Robak", avatarUrl: "" },
    { name: "Jan Kowalski5", avatarUrl: "" },
  ];

  return (
    <>
      <View style={tw`p-5`}>
        <SearchbarComponent />
        <ScrollView>
          <ListOfFriends list={users} />
        </ScrollView>
      </View>
    </>
  );
};

export default FriendsScreen;
