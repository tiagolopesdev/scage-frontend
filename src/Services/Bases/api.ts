import axios from "axios";

export const scaleChannel = axios.create({
  baseURL: 'http://localhost:5236/'
});

export const userChannel = axios.create({
  baseURL: 'http://localhost:5122/'
});
