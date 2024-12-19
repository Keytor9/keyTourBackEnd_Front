import axios from "axios";
import Api from "../api";

const API_URL = `${Api}/api`;
const userId = localStorage.getItem("id");
console.log(userId);

export const getAbout = async () => {
  const response = await axios.get(`${API_URL}/about-us`);
  return response.data.data;
};

export const getSetting = async () => {
  const response = await axios.get(`${API_URL}/app-settings`);
  return response.data;
};

export const getGuide = async () => {
  const response = await axios.get(`${API_URL}/blogs`);
  return response.data;
};

export const getPopular = async () => {
  const response = await axios.get(`${API_URL}/homescreen`);
  return response.data;
};

export const getUser = async () => {
  const response = await axios.get(
    `${API_URL}/users/profile/${userId}`
  );
  return response.data;
};

export const updateUser = async () => {
  const response = await axios.patch(
    `${API_URL}/users/profile/${userId}`
  );
  return response.data;
};



