// src/services/authService.js
import axios from 'axios';
import Cookies from 'js-cookie';
import Api from '../api';

const API_URL = `${Api}/api`;
// Replace with your API URL

export const loginVendor = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    }, {
      headers: {
        role: 'vendor' // Add vendor role to the header
      }
    });

    const { token, user } = response.data.data;

    // Store token and other info in cookies
    Cookies.set('tokenvendor', token, { expires: 7, secure: false, sameSite: 'Strict' });
    Cookies.set('uservendor', JSON.stringify(user), { expires: 7, secure: false, sameSite: 'Strict' });

    return { token, user };
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};
export const loginAdmin = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    }, {
      headers: {
        role: 'admin' // Add vendor role to the header
      }
    });

    const { token, user } = response.data.data;

    // Store token and other info in cookies
    Cookies.set('tokenadmin', token, { expires: 7, secure: false, sameSite: 'Strict' });
    Cookies.set('useradmin', JSON.stringify(user), { expires: 7, secure: false, sameSite: 'Strict' });

    return { token, user };
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    }, {
      headers: {
        role: 'user' // Add vendor role to the header
      }
    });

    const { token, user } = response.data.data;

    // Store token and other info in cookies
    Cookies.set('tokenuser', token, { expires: 7, secure: false, sameSite: 'Strict' });
    Cookies.set('useruser', JSON.stringify(user), { expires: 7, secure: false, sameSite: 'Strict' });

    return { token, user };
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};