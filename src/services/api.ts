import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.30.187.176:3333',
});

export default api;
