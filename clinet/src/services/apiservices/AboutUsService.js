import axios from 'axios';
import Cookies from 'js-cookie';

import BASE_URL from '../api'

const AboutUsService = {
  // Fetch all About Us entries
  getAllAboutUs: async () => {
    const token = Cookies.get('token');
    const headers = {
      Authorization: `Bearer ${token}`,
      role: 'admin',
    };
    const response = await axios.get(`${BASE_URL}/api/about-us`, { headers });
    return response.data;
  },

  getAllSetting: async () => {
    const token = Cookies.get('token');
    const headers = {
      Authorization: `Bearer ${token}`,
      role: 'admin',
    };
    const response = await axios.get(`${BASE_URL}/api/app-settings`, { headers });
    console.log(response.data);
    return response.data;
  },

  // Fetch a single About Us entry by ID
  getAboutUsById: async (id) => {
    const token = Cookies.get('tokenadmin');
    const headers = {
      Authorization: `Bearer ${token}`,
      role: 'admin',
    };
    const response = await axios.get(`${BASE_URL}/api/about-us/${id}`, { headers });
    return response.data;
  },

  // Create a new About Us entry with an image
  createAboutUs: async (data) => {
    const token = Cookies.get('tokenadmin');
    const headers = {
      Authorization: `Bearer ${token}`,
      role: 'admin',
      'Content-Type': 'multipart/form-data',
    };
    const formData = new FormData();
    formData.append('title.en', data.title);
    formData.append('description.en', data.description);
    if (data.image) {
      formData.append('image', data.image);
    }
    const response = await axios.post(`${BASE_URL}/api/about-us`, formData, { headers });
    return response.data;
  },

  // Update an existing About Us entry
  updateAboutUs: async ({ id, data }) => {
    const token = Cookies.get('tokenadmin');
    const headers = {
      Authorization: `Bearer ${token}`,
      role: 'admin',
    };
    const response = await axios.put(`${BASE_URL}/api/about-us/${id}`, data, { headers });
    return response.data;
  },

  
  // Update an existing About Us entry
  updateSetting: async ({ id, data }) => {
    const token = Cookies.get('tokenadmin');
    const headers = {
      Authorization: `Bearer ${token}`,
      role: 'admin',
    };
    const response = await axios.put(`${BASE_URL}/api/app-settings`, data, { headers });
    return response.data;
  },

  // Delete an About Us entry
  deleteAboutUs: async (id) => {
    const token = Cookies.get('tokenadmin');
    const headers = {
      Authorization: `Bearer ${token}`,
      role: 'admin',
    };
    const response = await axios.delete(`${BASE_URL}/api/about-us/${id}`, { headers });
    return response.data;
  },
};

export default AboutUsService;
