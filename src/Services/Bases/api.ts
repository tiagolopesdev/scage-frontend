import axios from "axios";

export const userChannel = axios.create({
  baseURL: 'http://localhost:5122/'
});
