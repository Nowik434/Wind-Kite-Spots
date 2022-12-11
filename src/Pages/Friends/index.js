import {
  Avatar,
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Routes, useNavigate, Route } from "react-router-dom";
import { socket } from "../../config/web-sockets";
import ChatRoom from "./components/ChatRoom/index";
import { useEffect } from "react";

const messages = [
  { name: "dsadsa", value: "ewreww" },
  { name: "dsads6543", value: "ewre43" },
];

const users = [
  {
    key: "RemySharp",
    avatar: "https://material-ui.com/static/images/avatar/1.jpg",
    primary: "John Wick",
  },
  {
    key: "AvaAdams",
    avatar: "https://material-ui.com/static/images/avatar/2.jpg",
    primary: "Lara Croft",
  },
  {
    key: "DomHarrison",
    avatar: "https://material-ui.com/static/images/avatar/3.jpg",
    primary: "Indiana Jones",
  },
  {
    key: "LucasGreen",
    avatar: "https://material-ui.com/static/images/avatar/4.jpg",
    primary: "Ellen Ripley",
  },
  {
    key: "LucasGreen",
    avatar: "https://material-ui.com/static/images/avatar/4.jpg",
    primary: "Ellen Ripley",
  },
  {
    key: "DavidJones",
    avatar: "https://material-ui.com/static/images/avatar/5.jpg",
    primary: "James Bond",
  },
  {
    key: "OliviaSmith",
    avatar: "https://material-ui.com/static/images/avatar/6.jpg",
    primary: "Katniss Everdeen",
  },
  {
    key: "EmilyBrown",
    avatar: "https://material-ui.com/static/images/avatar/7.jpg",
    primary: "Hermione Granger",
  },
  {
    key: "CharlieDavis",
    avatar: "https://material-ui.com/static/images/avatar/6.jpg",
    primary: "Harry Potter",
  },
  {
    key: "IsabellaWilson",
    avatar: "https://material-ui.com/static/images/avatar/5.jpg",
    primary: "Daenerys Targaryen",
  },
  {
    key: "OliverBaker",
    avatar: "https://material-ui.com/static/images/avatar/6.jpg",
    primary: "Tyrion Lannister",
  },
  {
    key: "JackThomas",
    avatar: "https://material-ui.com/static/images/avatar/1.jpg",
    primary: "Jon Snow",
  },
  {
    key: "LucasGreen",
    avatar: "https://material-ui.com/static/images/avatar/4.jpg",
    primary: "Ellen Ripley",
  },
  {
    key: "LucasGreen",
    avatar: "https://material-ui.com/static/images/avatar/4.jpg",
    primary: "Ellen Ripley",
  },
  {
    key: "DavidJones",
    avatar: "https://material-ui.com/static/images/avatar/5.jpg",
    primary: "James Bond",
  },
  {
    key: "OliviaSmith",
    avatar: "https://material-ui.com/static/images/avatar/6.jpg",
    primary: "Katniss Everdeen",
  },
];

const Friends = () => {
  const [username, setUsername] = useState("Pawel");
  const [room, setRoom] = useState("12");
  const [joinData, setJoinData] = useState({});
  const navigate = useNavigate();

  function onJoinSuccess(data) {
    // setJoinData(data);
    // setUsername(data.userData.username);
    // setRoom(data.userData.room);
    // navigate(`/chat/rooms/${data.userData.room}`);
    navigate(`/friends/chat/rooms/${10}`);
  }

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected");
    });

    socket.on("disconnect", () => {
      console.log("disconnect");
    });

    socket.on("join", (socket) => {
      console.log("join");
    });
    socket.on("send-message", (socket) => {
      console.log("send-message");
      socket.on("send-message:create", (data) => {
        console.log(data);
      });
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("join");
    };
  }, []);

  const onClick = () => {
    socket.on("connect", () => {
      socket.on("send-message:update", (data) => {
        console.log(data);
      });
    });

    console.log(socket);
  };

  socket.on("connection", (data) => {
    console.log("Welcome event inside JoinRoom", data);
    onJoinSuccess(data);
  });

  return (
    <>
      <Grid
        container
        component={Paper}
        sx={{
          borderRadius: "5px",
          width: "100%",
          height: "100vh",
          position: "fixed",
        }}
      >
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid #e0e0e0",
            overflowY: "scroll",
            height: "100%",
          }}
        >
          <Grid item xs={12} style={{ padding: "10px" }}>
            <TextField
              id="outlined-basic-email"
              label="Search"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Divider />
          <List>
            {users.map((item, i) => (
              <Box key={i}>
                <ListItem button key={item.key} onClick={() => onJoinSuccess()}>
                  <ListItemIcon>
                    <Avatar alt="Remy Sharp" src={item.avatar} />
                  </ListItemIcon>
                  <ListItemText primary={item.primary} />
                </ListItem>
                <Divider />
              </Box>
            ))}
          </List>
        </Grid>
        <Routes>
          <Route path="/chat/rooms/:roomNumber" element={<ChatRoom />} />
        </Routes>
      </Grid>
    </>
  );
};

export default Friends;