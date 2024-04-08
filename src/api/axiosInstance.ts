import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';
export const axiosInstance = axios.create({
  baseURL: 'http://5.141.235.46:5555/api',
  timeout: 10000,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  withCredentials: true,
});

export type ID = number;
