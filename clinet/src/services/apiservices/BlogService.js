import axios from 'axios';
import Cookies from 'js-cookie';

import BASE_URL from '../api';

const BlogService = {
  // Fetch all blog entries
  getAllBlogs: async () => {
    const token = Cookies.get('tokenadmin');
    const headers = {
      Authorization: `Bearer ${token}`,
      role: 'admin',
    };
    const response = await axios.get(`${BASE_URL}/api/blogs`, { headers });
    return response.data;
  },

  // Fetch a single blog entry by ID
  getBlogById: async (id) => {
    const token = Cookies.get('tokenadmin');
    const headers = {
      Authorization: `Bearer ${token}`,
      role: 'admin',
    };
    const response = await axios.get(`${BASE_URL}/api/blogs/${id}`, { headers });
    return response.data;
  },

  // Create a new blog entry with an image
  createBlog: async (data) => {
    const token = Cookies.get('tokenadmin');
    const headers = {
      Authorization: `Bearer ${token}`,
      role: 'admin',
      'Content-Type': 'multipart/form-data',
    };
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    if (data.image) {
      formData.append('image', data.image);
    }
    const response = await axios.post(`${BASE_URL}/api/blogs`, formData, { headers });
    return response.data;
  },

  // Update an existing blog entry
  updateBlog: async ({ id, data }) => {
    const token = Cookies.get('tokenadmin');
    const headers = {
      Authorization: `Bearer ${token}`,
      role: 'admin',
    };
    const response = await axios.put(`${BASE_URL}/api/blogs/${id}`, data, { headers });
    return response.data;
  },

  // Delete a blog entry
  deleteBlog: async (id) => {
    const token = Cookies.get('tokenadmin');
    const headers = {
      Authorization: `Bearer ${token}`,
      role: 'admin',
    };
    const response = await axios.delete(`${BASE_URL}/api/blogs/${id}`, { headers });
    return response.data;
  },
};

export default BlogService;


