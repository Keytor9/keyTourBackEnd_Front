// services/apiservices/UserService.js

import axios from 'axios';
import Api from '../api'

const API_URL = `${Api}/api`;
export const getAllUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};
export const getUserById = async (id) => {
  const token = localStorage.getItem('accessToken');
    const response = await axios.get(`${API_URL}/users/profile/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };