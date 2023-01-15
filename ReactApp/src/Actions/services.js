import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getSpotsAction = (token) => {
  console.log("get spots action", token);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return axios.get(`${API_URL}/spots/?populate=*`);
};

const updateActiveUsersAction = (id, token, payload) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return axios.put(`${API_URL}/spots/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    data: { activeUsers: payload },
  });
};

const userService = {
  getPublicContent,
  updateActiveUsersAction,
  getSpotsAction,
};
export default userService;
