// src/services/apiService.ts
import axios from 'axios';
import type { AxiosResponse , AxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: import.meta.env.host_url || 'http://localhost:5000',
  timeout: 10000,
});

api.interceptors.request.use(// ...existing code...
(config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    // If headers is an AxiosHeaders instance, use set method
    if (typeof config.headers.set === 'function') {
      config.headers.set('Authorization', `Bearer ${token}`);
    } else {
      // Fallback for plain object headers
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return config;
})
// ...existing code...);

const get = <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
  api.get(url, config);

const post = <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
  api.post(url, data, config);

const put = <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
  api.put(url, data, config);

const del = <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
  api.delete(url, config);

export default {
  get,
  post,
  put,
  delete: del,
};
