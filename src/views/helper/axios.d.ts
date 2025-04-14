// src/views/helper/axios.ts
import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // Use your base URL from .env
  // Additional configuration can go here
});

export { instance };
