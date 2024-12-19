import axios from "axios";

export const axiosConfig = axios.create({
  baseURL: "http://dog.addictaco.com/", //replace with your BaseURL
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "fab6c94fc0044b53bf5e886a8fef1325",
  },
});

axiosConfig.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken"); // get stored access token
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`; // set in header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosConfig.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      const accessToken = localStorage.getItem("accessToken");
      const formData = {
        refreshToken: refreshToken,
        accessToken: accessToken,
      };
      if (refreshToken) {
        try {
          const response = await axios.post(
            `http://dog.addictaco.com/api/v2/auth/refresh`,
            formData,
            {
              headers: {
                "Content-Type": "application/json",
                "x-api-key": "fab6c94fc0044b53bf5e886a8fef1325",
              },
            }
          );
          // don't use axios instance that already configured for refresh token api call
          const newAccessToken = response.data.accessToken;
          localStorage.setItem("accessToken", newAccessToken); //set new access token
          localStorage.setItem("refreshToken", refreshToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originalRequest); //recall Api with new token
        } catch (error) {
          // Handle token refresh failure
          // mostly logout the user and re-authenticate by login again
          localStorage.clear(); // Optionally clear local storage
          // Use a global mechanism to trigger logout and redirect to login
          window.location.href = "/"; // Redirect to login or home page
        }
      }
    }
    return Promise.reject(error);
  }
);