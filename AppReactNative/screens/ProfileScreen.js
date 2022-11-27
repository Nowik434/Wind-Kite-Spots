import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import CardComponent from "../components/Card";
import tw from "tailwind-react-native-classnames";
import ListOfFriends from "../components/ListOfFriends";
import { Avatar, Button, TextInput } from "react-native-paper";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [city, setCity] = React.useState("");

  return (
    <>
      <View>
        <ScrollView
          style={{
            height: "100%",
            marginHorizontal: 20,
          }}
        >
          <View>
            <Avatar.Image
              size={124}
              source={require("../assets/avatar.png")}
              style={{ alignSelf: "center", marginBottom: 30 }}
            />
            <TextInput
              label="Email"
              value={email}
              onChangeText={(text) => setText(text)}
              mode="outlined"
              style={{ marginBottom: 5 }}
            />
            <TextInput
              label="Name"
              value={name}
              onChangeText={(text) => setText(text)}
              mode="outlined"
              style={{ marginBottom: 5 }}
            />
            <TextInput
              label="Surname"
              value={surname}
              onChangeText={(text) => setText(text)}
              mode="outlined"
              style={{ marginBottom: 5 }}
            />
            <TextInput
              label="City"
              value={city}
              onChangeText={(text) => setText(text)}
              mode="outlined"
              style={{ marginBottom: 5 }}
            />
            <Button
              mode="contained"
              onPress={() => console.log("Pressed")}
              style={{ marginBottom: 5, marginTop: 20 }}
            >
              Save
            </Button>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default ProfileScreen;
