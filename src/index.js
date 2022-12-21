"use strict";

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/* { strapi } */) {
    //strapi.server.httpServer is the new update for Strapi V4
    var io = require("socket.io")(strapi.server.httpServer, {
      cors: {
        // cors setup
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
      },
    });
    // io.use((socket, next) => {
    //   const username = socket.handshake.auth.username;
    //   console.log("nnnnnnnnnnnnnnnnnnnnn", username, socket.username);
    //   if (!username) {
    //     return next(new Error("invalid username"));
    //   }
    //   socket.username = username;
    //   next();
    // });
    io.on("connection", function (socket) {
      //Listening for a connection from the frontend
      socket.on("join", ({ username, room }) => {
        // Listening for a join connection
        console.log("user connected", room);
        console.log("username is ", username, " and room is ", room);
        if (username) {
          socket.join(room); // Adding the user to the group
          socket.emit("welcome", {
            // Sending a welcome message to the User
            user: "bot",
            text: `${username}, Welcome to the chat, in room ${room}`,
            userData: username,
          });
        } else {
          console.log("An error occurred");
        }
      });
      socket.on("sendMessage", async (data) => {
        // socket.emit("message", "gfdgfdgfd");
        console.log("data from sendMessage server", data);
        // Listening for a sendMessage connection
        let strapiData = {
          // Generating the message data to be stored in Strapi
          data: {
            user: data.user,
            message: data.message,
            room: data.room,
          },
        };
        var axios = require("axios");
        await axios
          .post("http://localhost:1337/api/messages", strapiData) //Storing the messages in Strapi
          .then((e) => {
            socket.broadcast.to(data.room).emit(
              "message",
              {
                //Sending the message to the group
                user: data.username,
                text: data.message,
                room: data.room,
              },
              console.log("//////", data)
            );
          })
          .catch((e) => console.log("error", e.message));
      });
    });
  },
};
