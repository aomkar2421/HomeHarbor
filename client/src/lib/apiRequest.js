// import axios from "axios";

// const apiRequest = axios.create({
//   baseURL: "http://localhost:8800/api/",
//   withCredentials: true,
// });

// export default apiRequest;


import axios from "axios";

const apiRequest = axios.create({
  baseURL: "http://localhost:8800/api/",  // matches your backend server
  withCredentials: true,                  // allows cookies
});

export default apiRequest;
