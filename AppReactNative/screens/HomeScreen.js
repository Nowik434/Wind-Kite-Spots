import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  FlatList,
} from "react-native";
import React from "react";
import tw from "twrnc";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  IconButton,
} from "react-native-paper";

const HomeScreen = () => {
  const dispatch = useDispatch();

  return (
    <>
      <ScrollView>
        <View style={tw`p-5`}>
          <View style={{ marginBottom: 20 }}>
            <Card elevation={5}>
              <Card.Content style={styles.cardHeader}>
                <Title>Wind / Kite Spots</Title>
                <Paragraph>
                  Find Your Favourite Spot and let to know your friends that
                  you`re there
                </Paragraph>
              </Card.Content>
            </Card>
          </View>
          <View style={styles.container}>
            <Card>
              <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
              <View style={styles.container}>
                <View
                  style={{
                    width: "50%",
                  }}
                >
                  <Card.Content>
                    <Title>Sopot</Title>
                    <Paragraph>Card content</Paragraph>
                  </Card.Content>
                </View>
                <View
                  style={{
                    width: "50%",
                    justifyContent: "flex-end",
                    flexDirection: "row",
                  }}
                >
                  <IconButton
                    icon="heart"
                    iconColor={"#6FCF97"}
                    size={30}
                    onPress={() => console.log("Pressed")}
                  />
                </View>
              </View>
            </Card>
          </View>
          {/* <Text style={styles.baseText}>Appka</Text> */}
        </View>
      </ScrollView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: "5px",
  },
  text: {
    color: "blue",
  },
  baseText: {
    color: "blue",
    fontSize: "40px",
    fontWeight: "bold",
  },
  cardHeader: {
    width: "100%",
    borderRadius: "5px",
  },
});
