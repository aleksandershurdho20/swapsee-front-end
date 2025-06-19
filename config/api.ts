import { interceptorRequest, interceptorResponse } from '@/helpers/interceptors';
import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api/',
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use(interceptorRequest);

api.interceptors.response.use(
    interceptorResponse.onFulfilled,
    interceptorResponse.onRejected
  );
  
export default api;