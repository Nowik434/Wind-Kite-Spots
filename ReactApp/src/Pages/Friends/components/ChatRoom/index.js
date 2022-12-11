import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import { useNavigate } from "react-router-dom";
import {
  Divider,
  Fab,
  Grid,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { socket } from "../../../../config/web-sockets";

function ChatRoom() {
  const [messages, setMessages] = useState([
    {
      key: 1,
      primary: "Hey man, What's up ?",
      secondary: "09:30",
      align: "right",
    },
    {
      key: 2,
      primary: "Hey, Iam Good! What about you ?",
      secondary: "09:31",
      align: "left",
    },
    {
      key: 3,
      primary: "Cool. i am good, let's catch up!",
      secondary: "09:36",
      align: "right",
    },
  ]);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = (message) => {
    socket.emit("send-message", { message }, (error, data) => {
      console.log(data, message);
    });

    socket.on("connect", () => {
      socket.on("message:create", (data) => {
        console.log(data);
      });
    });

    console.log(message);
    console.log([
      ...messages,
      {
        key: messages.length + 1,
        primary: message,
        secondary: `${new Date().getHours()}:${new Date().getMinutes()}`,
        align: "right",
      },
    ]);
    setMessages([
      ...messages,
      {
        key: messages.length + 1,
        primary: message,
        secondary: `${new Date().getHours()}:${new Date().getMinutes()}`,
        align: "right",
      },
    ]);
    setMessage("");
  };

  socket.on("send-message", { message }, (error, data) => {
    console.log(data, message);
  });

  return (
    <Grid item xs={9}>
      <List sx={{ height: "70vh", overflowY: "auto" }}>
        {messages.map((item) => (
          <ListItem key={item.key}>
            <Grid container>
              <Grid item xs={12}>
                <ListItemText align={item.align} primary={item.primary} />
              </Grid>
              <Grid item xs={12}>
                <ListItemText align={item.align} secondary={item.secondary} />
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Grid
        container
        style={{
          padding: "20px",
          position: "fixed",
          bottom: 0,
          width: "74%",
        }}
      >
        <Grid item xs={11}>
          <TextField
            id="outlined-basic-email"
            label="Type Something"
            value={message}
            fullWidth
            onChange={(e) => setMessage(e.target.value)}
          />
        </Grid>
        <Grid xs={1} align="right">
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => handleSubmit(message)}
          >
            <SendIcon />
          </Fab>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ChatRoom;
