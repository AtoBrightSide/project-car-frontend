import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://ga-server-1763.onrender.com",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const getCarsAPI = async (pageNumber = 1, filterOptions = {}) => {
  try {
    // Build query params
    const params = { page: pageNumber, ...filterOptions };

    // Remove empty params
    Object.keys(params).forEach((key) => {
      if (
        params[key] === "" ||
        params[key] === undefined ||
        params[key] === null
      ) {
        delete params[key];
      }
    });

    const { data } = await apiClient.get("/cars/", { params });
    return data;
  } catch (error) {
    console.error("Failed to fetch cars:", error);
    throw error;
  }
};
