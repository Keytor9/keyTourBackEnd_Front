import axios from 'axios';
import Api from '../api'
import Cookies from 'js-cookie';

const API_URL = `${Api}/api/vendors`;
const API_URL_1 = `${Api}/api/admin`;


const token = Cookies.get('tokenadmin');
// const parsedData = JSON.parse(token);
// const token_admin = parsedData.name;
// console.log(token);


// Fetch all vendors
export const getVendors = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};


// Get vendor by ID
export const getVendorById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'role': 'admin',
      },
    });
    return response.data; // Assuming the API returns vendor data in `data` field
  } catch (error) {
    throw new Error('Error fetching vendor data: ' + error.message);
  }
};
export const getAdminById = async (id) => {
  const token = Cookies.get('tokenadmin');
    try {
      const response = await axios.get(`${API_URL_1}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'role': 'admin',
        },
      });
      console.log(response)
      return response.data;
    } catch (error) {
      console.log(error)
      throw new Error(error.response?.data?.message || 'Error creating tour');
    }
  };



export const updateVendorCommission = async ({ id, commission }) => {
    const response = await axios.put(`${API_URL}/${id}`, { commission });
    return response.data;
  };
// Update vendor status
export const updateVendorStatus = async ({ id, status }) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}/status`, { status });
    return response.data;
  } catch (error) {
    throw new Error('Error updating vendor status: ' + error.message);
  }
};

// Optionally, you can export more CRUD methods if needed

export const getAllVendors = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching all vendors: ' + error.message);
  }
};

export const createVendor = async (vendorData) => {
  try {
    const response = await axios.post(`${API_URL}`, vendorData);
    return response.data;
  } catch (error) {
    throw new Error('Error creating vendor: ' + error.message);
  }
};

export const deleteVendor = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error deleting vendor: ' + error.message);
  }
};

export const deleteAdmin = async (id) => {
  try {
    const response = await axios.delete(`http://185.170.198.81/api/admin/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'role': 'admin',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error deleting vendor: ' + error.message);
  }
};

export const updateVendor = async (id, vendorData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, vendorData);
    return response.data;
  } catch (error) {
    throw new Error('Error deleting vendor: ' + error.message);
  }
};

export const blockVendor = async (id, vendorData) => {
  try {
    const response = await axios.put(`http://185.170.198.81/api/auth/block/${id}`, vendorData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'role': 'admin',
        'roling': 'vendor',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error Update vendor: ' + error.message);
  }
};

export const blockUser = async (id, vendorData) => {
  try {
    const response = await axios.put(`http://185.170.198.81/api/auth/block/${id}`, vendorData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'role': 'admin',
        'roling': 'user ',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error Update vendor: ' + error.message);
  }
};

export const updateAdmin = async (id, vendorData) => {
  const token = Cookies.get('tokenadmin');
    try {
      const response = await axios.get(`${API_URL_1}/${id}`,vendorData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'role': 'admin',
        },
      });
      return response.data;
    } catch (error) {
      console.log(error)
      throw new Error(error.response?.data?.message || 'Error creating tour');
    }
  };
