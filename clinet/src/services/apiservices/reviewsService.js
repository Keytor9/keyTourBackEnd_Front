// services/apiservices/UserService.js

import axios from "axios";
import Api from "../api";
import Cookies from 'js-cookie';

const API_URL = `${Api}/api`;
// export const getAllBooking = async () => {
//   const response = await axios.get(`${API_URL}/bookings`);
// //   console.log(response.data.data.data);
//   return response.data;
// };


export const getAllreviews = async () => {
  const token = Cookies.get('tokenadmin'); // Replace 'yourTokenName' with the actual name of your cookie
  const headers = {
    Authorization: `Bearer ${token}`,
    'role': 'admin',
  };

  try {
    const response = await axios.get(`${API_URL}/reviews`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error; // Re-throw the error for further handling
  }
};

export const getAllVendorreviews = async () => {
  const token = Cookies.get('tokenvendor'); // Replace 'yourTokenName' with the actual name of your cookie
  const headers = {
    Authorization: `Bearer ${token}`,
    'role': 'vendor',
  };

  try {
    const response = await axios.get(`${API_URL}/reviews`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error; // Re-throw the error for further handling
  }
};
// export const getUserById = async (id) => {
//   const response = await axios.get(`${API_URL}/users/profile/${id}`);
//   return response.data;
// };
