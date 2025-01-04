import axios from 'axios';


const API_URL = process.env.REACT_APP_API_URI || 'http://localhost:4000'; 

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/api/v1/auth/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/api/v1/auth/login`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Add more API functions as needed
