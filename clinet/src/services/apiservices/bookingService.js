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
export const getBookingById = async (id) => {
  const token = Cookies.get('tokenadmin');
  const headers = {
    Authorization: `Bearer ${token}`,
    'role': 'admin',
  };

  try {
    const response = await axios.get(`${API_URL}/bookings/${id}`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching booking by ID:', error);
    throw error;
  }
};

export const getAllBooking = async () => {
  const token = Cookies.get('tokenadmin'); // Replace 'yourTokenName' with the actual name of your cookie
  const headers = {
    Authorization: `Bearer ${token}`,
    'role': 'admin',
  };

  try {
    const response = await axios.get(`${API_URL}/bookings`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error; // Re-throw the error for further handling
  }
};

export const getAllAdmins = async () => {
  const token = Cookies.get('tokenadmin'); // Replace 'yourTokenName' with the actual name of your cookie
  const headers = {
    Authorization: `Bearer ${token}`,
    'role': 'admin',
  };

  try {
    const response = await axios.get(`${API_URL}/admin`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching admins:', error);
    throw error; // Re-throw the error for further handling
  }
};
export const getAllVendorsBooking = async () => {
  const token = Cookies.get('tokenvendor'); 
  console.log(token)// Replace 'yourTokenName' with the actual name of your cookie
  const headers = {
    Authorization: `Bearer ${token}`,
    'role': 'vendor',
  };

  try {
    const response = await axios.get(`${API_URL}/bookings`, { headers });
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



export const getAllFAQs = async () => {
  const token = Cookies.get('tokenadmin'); // Replace 'yourTokenName' with the actual name of your cookie
  const headers = {
    Authorization: `Bearer ${token}`,
    'role': 'admin',
  };

  try {
    const response = await axios.get(`${API_URL}/faqs`, { headers });
    console.log(response);
    return response.data.analysis.results;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error; // Re-throw the error for further handling
  }
};