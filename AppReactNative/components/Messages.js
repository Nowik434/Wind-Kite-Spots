import React from "react";
import { FlatList } from "react-native";
import {
  SafeAreaView,
  View,
  VirtualizedList,
  StyleSheet,
  Text,
  StatusBar,
} from "react-native";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

// const getItem = (data, index) => ({
//   id: Math.random().toString(12).substring(0),
//   title: `Item ${index + 1}`,
// });

// const getItemCount = (data) => 50;

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const Messages = ({ messages }) => {
  console.log(messages);

  const renderItem = ({ item }) => <Item title={item.message} />;

  return (
    <SafeAreaView style={styles.container}>
      {/* {messages.map((message) => ( */}
      <>
        {/* <Text title={message.message} /> */}
        {/* <Item title={message.message} /> */}
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </>
      {/* ))} */}
      {/* <VirtualizedList
        data={DATA}
        initialNumToRender={4}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={(item) => item.key}
        getItemCount={getItemCount}
        getItem={getItem}
      /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  item: {
    backgroundColor: "#f9c2ff",
    height: 150,
    justifyContent: "center",
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
  },
  title: {
    fontSize: 32,
  },
});

export default Messages;
