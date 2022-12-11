import io from "socket.io-client";
let STRAPI_ENDPOINT;

if (process.env.NODE_ENV !== "production") {
  STRAPI_ENDPOINT = "http://localhost:1337";
} else {
  STRAPI_ENDPOINT = process.env.REACT_APP_UPLOADS_URL;
}

export const socket = io(STRAPI_ENDPOINT);

// import io from "socket.io-client";
// let STRAPI_ENDPOINT;

// if (process.env.NODE_ENV !== "production") {
//   STRAPI_ENDPOINT = "http://localhost:1337";
// } else {
//   STRAPI_ENDPOINT = process.env.REACT_APP_UPLOADS_URL;
// }

// export const socket = io(STRAPI_ENDPOINT, {
//   auth: {
//     token: JSON.parse(localStorage.getItem("user")).jwt,
//   },
// });
