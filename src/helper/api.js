import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:4242/api',
});

export default api;
