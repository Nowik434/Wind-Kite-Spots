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
import HomeScreenCard from "../components/HomeScreenCard";
import AppBarAction from "../components/AppBarAction";

const Col = ({ numRows, children }) => {
  return <View style={styles[`${numRows}col`]}>{children}</View>;
};

const Row = ({ children }) => <View style={styles.row}>{children}</View>;

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  return (
    <>
      <ScrollView>
        <View style={tw`p-3`}>
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
        </View>
        <View style={styles.gallery}>
          <Row>
            <Col numRows={1}>
              <HomeScreenCard title="Sopot" subtitle="Best Place" />
            </Col>
          </Row>
          <Row>
            <Col numRows={1}>
              <HomeScreenCard title="Sopot" />
            </Col>
            <Col numRows={1}>
              <HomeScreenCard title="Sopot" />
            </Col>
            <Col numRows={1}>
              <HomeScreenCard title="Sopot" />
            </Col>
          </Row>
          <Row>
            <Col numRows={1}>
              <HomeScreenCard title="Sopot" subtitle="Best Place" />
            </Col>
            <Col numRows={1}>
              <HomeScreenCard title="Sopot" subtitle="Best Place" />
            </Col>
          </Row>
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
  row: {
    flexDirection: "row",
  },
  gallery: {
    marginLeft: 6,
    marginRight: 6,
  },
  "1col": {
    backgroundColor: "lightblue",
    borderColor: "#fff",
    borderWidth: 1,
    flex: 1,
    margin: 6,
  },
  "2col": {
    backgroundColor: "green",
    borderColor: "#fff",
    borderWidth: 1,
    flex: 2,
    margin: 6,
  },
  "3col": {
    backgroundColor: "orange",
    borderColor: "#fff",
    borderWidth: 1,
    flex: 3,
    margin: 6,
  },
  "4col": {
    flex: 4,
    margin: 6,
  },
});
