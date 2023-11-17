import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true
});

API.getCSRFCookie = async () => {
  await API.get('/sanctum/csrf-cookie');
};

export default API;
