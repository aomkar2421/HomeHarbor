// import axios from "axios";

// const apiRequest = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   withCredentials: true,                  
// });

// export default apiRequest;


import axios from "axios";

const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Add request interceptor to include token from localStorage
apiRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiRequest;