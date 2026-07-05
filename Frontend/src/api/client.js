import axios from 'axios';
import { API_BASE_URL } from './config';

const client = axios.create({
  baseURL: 'https://visualization-dashboard-2-14y0.onrender.com/api',
  timeout: 15000,
});

export default client;
