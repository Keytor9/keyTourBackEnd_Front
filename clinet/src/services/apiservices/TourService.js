import axios from 'axios';
import Api from '../api'
import Cookies from 'js-cookie';
const API_URL = `${Api}/api`;
const token = Cookies.get('token'); 
export const getTours = async () => {
const token = Cookies.get('tokenadmin'); 

  // const response = await axios.get(`${API_URL}/categories?page=${params.page}&limit=${params.limit}&sort=${params.sort}`);
  // const response = await axios.get(`${API_URL}/tours`);

  try {
    const response = await axios.get(`${Api}/api/tours?sort=-created_at,note`, {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
        'role': 'admin',
        // Assuming you're using a token for authentication
      },
    });
    console.log(response)
    return response.data;
  } catch (error) {
    console.log(error)
    throw new Error(error.response?.data?.message || 'Error creating tour');
  }


  // return response.data;
};















export const updateTour = async (tourId, updatedData) => {
  console.log(tourId)
  const token = Cookies.get('tokenvendor');
  try {
    const response = await axios.put(`${API_URL}/tours/${tourId.tourId}`, tourId.updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
        role: 'vendor', // Assuming you're using a role-based system
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating tour:', error);
    throw new Error(error.response?.data?.message || 'Error updating tour');
  }
};


export const updateTourAdmin = async (tourId, updatedData) => {
  console.log(tourId)
  const token = Cookies.get('tokenadmin');
  try {
    const response = await axios.put(`${API_URL}/tours/${tourId.tourId}`, tourId.updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
        role: 'admin', // Assuming you're using a role-based system
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating tour:', error);
    throw new Error(error.response?.data?.message || 'Error updating tour');
  }
};



export const resendTourRequest = async (tourId) => {
  const token = Cookies.get('tokenvendor'); // or 'tokenvendor', depending on your use case
  try {
    const response = await axios.patch(`${API_URL}/tours/resend-tour/${tourId}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
        role: 'vendor', // Assuming you're using a role-based system
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error resending tour:', error);
    throw new Error(error.response?.data?.message || 'Error resending tour');
  }
};






export const cancelTour = async ({ tourId, vendorId }) => {
  const response = await axios.patch(`${API_URL}/tours/cancel-tour`, {
    tourId,
    vendorId,
  });
  return response.data;
};

export const fullyTour = async ({ tourId, vendorId }) => {
  const response = await axios.patch(`${API_URL}/tours/fully-tour`, {
    tourId,
    vendorId,
  });
  return response.data;
};

export const deleteTour = async (tourId) => {
  const token = Cookies.get('tokenvendor'); // or 'tokenvendor' depending on the role
  try {
    const response = await axios.delete(`${API_URL}/tours/${tourId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        role: 'vendor', // Assuming you're using a role-based system

      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting tour:', error);
    throw new Error(error.response?.data?.message || 'Error deleting tour');
  }
};






export const getToursUser = async () => {
  // const response = await axios.get(`${API_URL}/categories?page=${params.page}&limit=${params.limit}&sort=${params.sort}`);
  // const response = await axios.get(`${API_URL}/tours`);

  try {
    const response = await axios.get(`${Api}/api/tours`, {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        // Authorization: `Bearer ${token}`,
        // 'role': 'admin',
        // Assuming you're using a token for authentication
      },
    });
    console.log(response)
    return response.data;
  } catch (error) {
    console.log(error)
    throw new Error(error.response?.data?.message || 'Error creating tour');
  }


  // return response.data;
};
export const getvendorstour = async (formdata) => {
  try {
    const token = Cookies.get('tokenvendor'); 
    const vendor = JSON.parse(Cookies.get('uservendor'));
    const response = await axios.get(`${Api}/api/tours?vendor=${vendor._id}&sort=-created_at`, {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
        'role': 'vendor',
        // Assuming you're using a token for authentication
      },
    });
    console.log(response)
    return response.data;
  } catch (error) {
    console.log(error)
    throw new Error(error.response?.data?.message || 'Error creating tour');
  }
};
export const getAllTourByDestinations = async (id) => {
  console.log(id)
  
  const token = localStorage.getItem('accessToken');
  const response = await axios.get(`${API_URL}/tours?destination=${id}`, {
    headers: {
      // 'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data;
};

export const getToursForWeb = async () => {
  // const response = await axios.get(`${API_URL}/categories?page=${params.page}&limit=${params.limit}&sort=${params.sort}`);
  const response = await axios.get(`${API_URL}/tours?status=accepted`);


  return response.data;
};
export const getTourById = async (id) => {
  // console.log(id)
  // const response = await axios.get(`${API_URL}/tours/${id}`);
  // // console.log(response)
  // return response.data;
  try {
    const token = Cookies.get('tokenvendor'); 
    const vendor = JSON.parse(Cookies.get('uservendor'));
    const response = await axios.get(`${API_URL}/tours/${id}`, {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
        'role': 'admin',
        // Assuming you're using a token for authentication
      },
    });
    console.log(response)
    return response.data;
  } catch (error) {
    console.log(error)
    throw new Error(error.response?.data?.message || 'Error creating tour');
  }
};
export const getCancelById = async (id) => {
  // console.log(id)
  // const response = await axios.get(`${API_URL}/tours/${id}`);
  // // console.log(response)
  // return response.data;
  try {
    const token = Cookies.get('tokenvendor'); 
    const vendor = JSON.parse(Cookies.get('uservendor'));
    const response = await axios.get(`${API_URL}/tours/${id}/bookings`, {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
        'role': 'admin',
        // Assuming you're using a token for authentication
      },
    });
    console.log(response)
    return response.data;
  } catch (error) {
    console.log(error)
    throw new Error(error.response?.data?.message || 'Error creating tour');
  }
};

export const addCategory = async (category) => {
  const response = await axios.post(`${API_URL}/categories`, category);
  return response.data;
};

export const updateTourStatus = async (tourId, status) => {
  const response = await axios.post(`${API_URL}/tours/update-status`, {
    tourId,
    status,
  });
  return response.data;
};
export const updateCategory = async (id, category) => {
  const response = await axios.put(`${API_URL}/categories/${id}`, category);
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await axios.delete(`${API_URL}/categories/${id}`);
  console.log(response)
  return response.data;
};

export const getSubcategories = async (params) => {
  console.log(params)
  const response = await axios.get(`${API_URL}/subcategory`, { params });
  return response.data;
};

export const getSubcategoryById = async (id) => {
  const response = await axios.get(`${API_URL}/subcategories/${id}`);
  return response.data;
};

export const addSubcategory = async (subcategory) => {
  const response = await axios.post(`${API_URL}/subcategory`, subcategory);
  return response.data;
};

export const updateSubcategory = async (id, subcategory) => {
  const response = await axios.put(`${API_URL}/subcategory/${id}`, subcategory, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteSubcategory = async (id) => {
  const response = await axios.delete(`${API_URL}/subcategories/${id}`);
  return response.data;
};
