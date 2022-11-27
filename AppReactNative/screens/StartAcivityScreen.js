import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CardComponent from "../components/Card";
import tw from "tailwind-react-native-classnames";
import ListOfFriends from "../components/ListOfFriends";
import {
  Avatar,
  Button,
  SegmentedButtons,
  TextInput,
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

const StartActivityScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    if (Platform.OS === "android") {
      setShow(false);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

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
            <Text variant="displayLarge" style={{ marginTop: 15 }}>
              Stary Your Activity
            </Text>
            <TextInput
              label="Email"
              value={email}
              onChangeText={(text) => setText(text)}
              mode="outlined"
              style={{ marginBottom: 5 }}
            />

            <View>
              <Button onPress={showDatepicker} title="Show date picker!" />
              <Button onPress={showTimepicker} title="Show time picker!" />
              <Text>selected: {date.toLocaleString()}</Text>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  onChange={onChange}
                />
              )}
            </View>
            <SegmentedButtons
              value={duration}
              onValueChange={setDuration}
              buttons={[
                {
                  value: "1",
                  label: "1 hour",
                },
                {
                  value: "2",
                  label: "2 hours",
                },
                {
                  value: "3",
                  label: "3 hours",
                },
                {
                  value: "10",
                  label: "All day",
                },
              ]}
              style={{
                justifyContent: "center",
                marginVertical: 18,
              }}
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

export default StartActivityScreen;
