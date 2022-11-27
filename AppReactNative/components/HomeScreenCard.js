import * as React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { Card, Title, Paragraph, IconButton, Text } from "react-native-paper";

const HomeScreenCard = ({ title, subtitle }) => (
  <>
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: "https://picsum.photos/700" }}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.text}>
          <View
            style={{
              width: "80%",
            }}
          >
            <Card.Content
              style={{
                justifyContent: "center",
                flex: 1,
              }}
            >
              <Title style={styles.txtColor}>{title}</Title>
              {subtitle && (
                <Paragraph style={styles.txtColor}>{subtitle}</Paragraph>
              )}
            </Card.Content>
          </View>
          <View
            style={{
              width: "20%",
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
      </ImageBackground>
    </View>
  </>
);

export default HomeScreenCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: "5px",
    minHeight: 145,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  text: {
    flexgrow: 1,
    flexDirection: "row",
    borderRadius: 0,
    backgroundColor: "#1919195e",
    lineHeight: 64,
  },
  txtColor: {
    color: "white",
  },
});
