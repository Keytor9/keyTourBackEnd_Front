import axios from "axios";
import Api from "../api";
import Cookies from 'js-cookie';

const API_URL = `${Api}/api`;

export const getAllContacts = async () => {
  const token = Cookies.get('tokenadmin');
  const headers = {
    Authorization: `Bearer ${token}`,
    'role': 'admin',
  };

  try {
    const response = await axios.get(`${API_URL}/contacts`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
};
