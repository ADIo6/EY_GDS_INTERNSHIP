import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URI || 'http://localhost:4000';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken'); // Or a state management solution
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
    console.log(token);
  }
  return config;
});
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error); // Log for debugging
    return Promise.reject(error);
  }
);

export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/api/v1/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/api/v1/auth/login', userData);
    // console.log("Response data:", response.data);
    const { token,  data: { _id, username } } = response.data;
    
    // Save token and userID to localStorage
    localStorage.setItem('authToken', token);
    localStorage.setItem('userID', _id);
    localStorage.setItem('userName', username);

    console.log("Auth token saved in localStorage:", token);
    console.log("UserID saved in localStorage:", _id);
    console.log("userName saved in localStorage:", username);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
// export const loginUser = async (userData) => {
//   try {
//     const response = await axiosInstance.post('/api/v1/auth/login', userData);
//     const { token, _id, username } = response.data;

//     // Save token and user details to localStorage
//     localStorage.setItem('authToken', token);
//     localStorage.setItem('userID', _id);

//     // Update context with user details
//     const userDetails = { token, _id, username };
//     return userDetails;
//   } catch (error) {
//     throw error.response.data;
//   }
// };
  

export const fetchBookings = async () => {
  try {
    const response = await axiosInstance.get('/api/v1/bookings');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const fetchTours = async () => {
  try {
    const response = await axiosInstance.get('/api/v1/tours');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
// export const fetchTours = async (page = 2, limit = 8) => {
//   try {
//     const response = await axiosInstance.get('/api/v1/tours', {
//       params: { page, limit },
//     });
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || { message: 'An unexpected error occurred.' };
//   }
// };


export const fetchTourById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/v1/tours/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const searchTour = async (searchParams) => {
  try {
    const response = await axiosInstance.get('/api/v1/tours/search/getTourBySearch', {
      params: searchParams,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// export const submitReview = async (tourId, reviewData) => {
//   try {
//     const response = await axiosInstance.post(`/api/v1/reviews/${tourId}`, reviewData);
//     return response.data;
//   } catch (error) {
//     throw error.response.data;
//   }
// };

// export const submitReview = async (tourId, reviewData) => {
//   const userID = localStorage.getItem('userID'); // Or retrieve from your state management solution
//   const payload = { ...reviewData, userID }; // Add userID to the payload

//   try {
//     const response = await axiosInstance.post(`/api/v1/reviews/${tourId}`, payload);
//     return response.data;
//   } catch (error) {
//     throw error.response.data;
//   }
// };
export const submitReview = async (tourId, reviewData) => {
  const userID = localStorage.getItem('userID'); // Retrieve userID from localStorage
  if (!userID) {
    throw new Error("User ID not found. Please log in again.");
  }
  
  console.log("User ID from localStorage:", userID); // Debugging log

  const payload = { ...reviewData, userID }; // Add userID to the payload
  console.log("Payload being sent:", payload); // Debugging log

  try {
    const response = await axiosInstance.post(`/api/v1/reviews/${tourId}`, payload);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createBooking = async (bookingData)=>{
  try{
    const response = await axiosInstance.post('/api/v1/bookings', bookingData);
    return response.data;
    
  }catch(error){
    throw error.response.data;
  }
}
// Add more API functions as needed
