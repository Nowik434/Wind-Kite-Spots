import * as React from "react";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import tw from "tailwind-react-native-classnames";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const CardComponent = () => (
  <Card style={tw`mb-4`}>
    <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
    <Card.Content>
      <Title>Card title</Title>
      <Paragraph>Card content</Paragraph>
    </Card.Content>
    <Card.Actions>
      <Button>More</Button>
      {/* <Button>Ok</Button> */}
    </Card.Actions>
  </Card>
);

export default CardComponent;
