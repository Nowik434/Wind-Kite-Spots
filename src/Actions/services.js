import { authHeader } from "./authenticationActions";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getSpotsAction = (token) => {
  console.log("fdsfdsf", token);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return axios.get(`${API_URL}/spots/?populate=*`);
};

// const getPinsAction = (email) => {
//   const qs = require('qs');
//   const query = qs.stringify({
//     populate: '*',
//     filters: {
//       user: {
//         email: {
//           $eq: email,
//         },
//       }
//     },
//   }, {
//     encodeValuesOnly: true,
//   });
//   return axios.get(`${API_URL}/pins?${query}`);
// };

const userService = {
  getPublicContent,
  // getPinsAction,
  getSpotsAction,
};
export default userService;
