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
  useMediaQuery,
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
  const [searchInputValue, setSearchInputValue] = useState();
  const [username, setUsername] = useState("Pawel");
  const [room, setRoom] = useState(12);
  const navigate = useNavigate();

  const mobile = useMediaQuery("(min-width:600px)");

  const filteredUsers = (searchValue) =>
    users.filter(
      (user) =>
        user.primary.toLowerCase().startsWith(searchValue.toLowerCase()) && user
    );
  console.log("room outside", room);
  function onJoinSuccess(item) {
    if (username === item.key) {
      console.log("user is the same");
    } else {
      console.log("user is different");
      setUsername(item.key);
      setRoom(item.key);
      console.log("vvvvvvv", item);
      socket.auth = { username: item.key };
      socket.connect();
      console.log(socket);
      console.log(socket.id);
      console.log(socket.auth.username);
      console.log("room inside", room);
      navigate(`/friends/chat/rooms/${item.key}`);
    }
  }

  socket.on("connection", (data) => {
    console.log("Welcome event inside JoinRoom", data);
    onJoinSuccess(data);
  });

  return (
    <>
      <Grid
        container
        component={Paper}
        sx={
          mobile
            ? {
                borderRadius: "5px",
                width: "100%",
                height: "100vh",
                position: "fixed",
              }
            : {
                display: "block",
              }
        }
      >
        <Grid
          item
          xs={3}
          sx={
            mobile
              ? {
                  borderRight: "1px solid #e0e0e0",
                  overflowY: "scroll",
                  height: "100%",
                  "&::-webkit-scrollbar": {
                    width: 10,
                  },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: "rgba(0, 0, 0, 0.12)",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#6fcf9791",
                    borderRadius: 2,
                  },
                }
              : {
                  display: "block",
                  width: "100%",
                  maxWidth: "none",
                }
          }
        >
          <Grid item xs={12} style={{ padding: "10px" }}>
            <TextField
              id="outlined-basic-email"
              label="Search"
              variant="outlined"
              fullWidth
              onChange={(e) => setSearchInputValue(e.target.value)}
            />
          </Grid>
          <Divider />
          <List sx={{}}>
            {searchInputValue
              ? filteredUsers(searchInputValue).map((item, i) => (
                  <Box key={i}>
                    <ListItem
                      button
                      key={item.key}
                      onClick={() => onJoinSuccess(item)}
                    >
                      <ListItemIcon>
                        <Avatar alt="Remy Sharp" src={item.avatar} />
                      </ListItemIcon>
                      <ListItemText primary={item.primary} />
                    </ListItem>
                    <Divider />
                  </Box>
                ))
              : users.map((item, i) => (
                  <Box key={i}>
                    <ListItem
                      button
                      key={item.key}
                      onClick={() => onJoinSuccess(item)}
                    >
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
          <Route
            path="/chat/rooms/:roomNumber"
            element={<ChatRoom username={username} room={room} />}
          />
        </Routes>
      </Grid>
    </>
  );
};

export default Friends;
