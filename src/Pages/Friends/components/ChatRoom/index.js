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

function ChatRoom({ username, room }) {
  const [messages, setMessages] = useState([
    {
      key: 1,
      message: "Hey man, What's up ?",
      createdAt: "09:30",
      align: "right",
    },
    {
      key: 2,
      message: "Hey, Iam Good! What about you ?",
      createdAt: "09:31",
      align: "left",
    },
    {
      key: 3,
      message: "Cool. i am good, let's catch up!",
      createdAt: "09:36",
      align: "right",
    },
  ]);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  // TEST SEND MESSAGES SOCKET IO

  // console.log(messages);

  let welcome;

  useEffect(() => {
    socket.emit("join", { username: username, room: room }, (error) => {
      socket.join(room);
      if (error) return alert(error);
    });
    socket.on("welcome", async (data, error) => {
      console.log("aaa", data);
      let welcomeMessage = {
        user: data.user,
        message: data.text,
      };
      welcome = welcomeMessage;
      setMessages([welcomeMessage]);
      await fetch("http://localhost:1337/api/messages")
        .then(async (res) => {
          const response = await res.json();
          console.log("aaa", response);
          let arr = [welcome];
          response.data.map((one, i) => {
            arr = [...arr, one.attributes];
            setMessages((msgs) => arr); // Storing all Messages in a state variable
          });
        })
        .catch((e) => console.log(e.message));
    });
    socket.on("message", async (data, error) => {
      console.log("messagehhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
      console.log("message", data);
      await fetch("http://localhost:1337/api/messages")
        .then(async (res) => {
          const response = await res.json();
          console.log("aaa", response);
          let arr = [welcome];
          response.data.map((one, i) => {
            arr = [...arr, one.attributes];
            setMessages((msgs) => arr);
          });
        })
        .catch((e) => console.log(e.message));
    });
  }, [username]);

  socket.on("sendMessage", (data) =>
    console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", data)
  );
  // TEST SEND MESSAGES SOCKET IO

  const handleSubmit = (message) => {
    if (message) {
      socket.emit(
        "sendMessage",
        { message, user: username, room: room },
        (error) => {
          if (error) {
            alert(error);
          }
        }
      );
      setMessages([
        ...messages,
        {
          key: messages.length + 1,
          message: message,
          createdAt: new Date(),
          room: room,
          // createdAt: `${new Date().getHours()}:${new Date().getMinutes()}`,
          align: "right",
        },
      ]);
      setMessage("");
    } else {
      alert("Message can't be empty");
    }
  };

  return (
    <Grid item xs={9}>
      <List sx={{ height: "70vh", overflowY: "auto" }}>
        {messages.map((item, i) => (
          <ListItem key={i}>
            <Grid container>
              <Grid item xs={12}>
                <ListItemText align={item.align} primary={item.message} />
              </Grid>
              <Grid item xs={12}>
                <ListItemText
                  align={item.align}
                  secondary={`${new Date(item.createdAt).getHours()}:${new Date(
                    item.createdAt
                  ).getMinutes()}`}
                />
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
