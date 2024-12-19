import axios from 'axios';
import Api from '../api';
import Cookies from 'js-cookie';

const API_URL = `${Api}/api/destinations`;
const token = Cookies.get('token'); 

export const getDestinations = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getAllDestinations = async () => {
    // const response = await axios.get(`${API_URL}/categories?page=${params.page}&limit=${params.limit}&sort=${params.sort}`);
    const response = await axios.get(`${API_URL}`);
  
  
    return response.data;
  };
  

export const getAllDestinationsCountry = async () => {
  const token = localStorage.getItem('accessToken');
  const response = await axios.get(`http://185.170.198.81/api/tours?fields=destination `, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createDestination = async (newDestination) => {
  const response = await axios.post(API_URL, newDestination);
  return response.data;
};
export const createTour = async (formdata) => {
const token = Cookies.get('tokenvendor'); 

  try {
    const response = await axios.post(`${Api}/api/tours`, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
        'role': 'vendor',
        // Assuming you're using a token for authentication
      },
    });
    console.log(response)
    return response.data;
  } catch (error) {
    // return error;
    console.log(error)
    throw  error;
  }
};
export const updateDestination = async (id, updatedDestination) => {
  console.log(id)

  const response = await axios.put(`${API_URL}/${id.id}`, id.FormData);
  return response.data;
};

export const deleteDestination = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
