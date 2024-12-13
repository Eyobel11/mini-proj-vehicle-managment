import axios from "axios";

const API = axios.create({
     baseURL: "http://localhost:5000/api",

      });
// connect with the server and get the vehicle information

export default API;
