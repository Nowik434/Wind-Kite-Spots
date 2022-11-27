import * as React from "react";
import { Avatar, List, MD3Colors } from "react-native-paper";

const ListOfFriends = ({ list }) => (
  <List.Section>
    {/* <List.Subheader>List of your friends</List.Subheader> */}
    {list.map((user, index) => (
      <List.Item
        key={index}
        title={user.name}
        style={{
          borderBottomColor: "#ececec",
          borderBottomWidth: 1,
          marginTop: 10,
          paddingBottom: 20,
        }}
        left={() => (
          <Avatar.Image
            size={33}
            source={require("../assets/avatar.png")}
            style={{ alignSelf: "center", marginBottom: 0 }}
          />
        )}
        right={() => <List.Icon icon="message" />}
      />
    ))}
  </List.Section>
);

export default ListOfFriends;
