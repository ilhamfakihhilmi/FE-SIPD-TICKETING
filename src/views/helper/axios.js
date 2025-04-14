import axios from 'axios'

export const instance = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  baseURL: import.meta.env.VITE_BASE_URL
})


