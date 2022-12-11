module.exports = ({ env }) => ({
  "users-permissions": {
    config: {
      jwt: {
        expiresIn: "25m",
      },
    },
  },
  email: {
    config: {
      provider: "sendgrid",
      providerOptions: {
        apiKey: env("SENDGRID_API_KEY"),
      },
      settings: {
        defaultFrom: "pawel.sluzbowy@interia.pl",
        defaultReplyTo: "pawel.sluzbowy@interia.pl",
        testAddress: "pawel.sluzbowy@interia.pl",
      },
    },
  },
  io: {
    enabled: true,
    config: {
      IOServerOptions: {
        cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
      },
      contentTypes: {
        message: "*",
        chat: ["create"],
      },
      events: [
        {
          name: "connection",
          handler: ({ strapi }, socket) => {
            console.log("SOCKET HI");

            strapi.log.info(`[io2] new connection with id ${socket.id}`);
          },
        },
        {
          name: "join",
          handler: ({ strapi }, { username, room }, socket) => {
            console.log("User Connected", username, room);

            strapi.log.info(` ${username} ${room} `);
            strapi.log.info(`[io] new connection withfdsfds id ${socket.id}`);
          },
        },
        {
          name: "send-message",
          handler: ({ strapi }, message, socket) => {
            console.log("MESSAGE", message, socket);

            strapi.log.info(`[io2] new connection with id ${socket.id}`);
          },
        },
      ],
    },
  },
});
