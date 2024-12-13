import axios from "axios";

const API = axios.create({
     baseURL: "https://mini-proj-vehicle-managment.vercel.app/api",

      });
// connect with the server and get the vehicle information

export default API;
