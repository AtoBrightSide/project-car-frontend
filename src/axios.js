import axios from "axios";

const baseURL = "http://getzauto.herokuapp.com";
const instance = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
  },
});

export default instance;
