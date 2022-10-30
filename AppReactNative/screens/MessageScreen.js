import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  Button,
  Alert,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch, useSelector } from "react-redux";
import Messages from "../components/Messages";
import { addMessage, selectMessages } from "../slices/messagesSlice";

const MessageScreen = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("jakiś text");
  const { messages } = useSelector(selectMessages);

  const sendMessage = () => {
    // Alert.alert(text);
    dispatch(
      addMessage({
        message: text,
        location: {
          latitude: 53.2465,
          longitude: 21.568,
        },
        expiry: "2019/12/9",
      })
    );
    console.log(messages);
  };

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Text>
          <Text>Wyślij wiadomość</Text>
          <Text></Text>
        </Text>
        <View>
          <TextInput style={styles.input} onChangeText={setText} value={text} />
          <Button title="Send" onPress={() => sendMessage()} />
        </View>
      </View>
      <Messages messages={messages} />
    </SafeAreaView>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({
  text: {
    color: "blue",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
