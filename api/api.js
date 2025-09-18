// api.js
import axios from "axios";

// Replace with your Raspberry Pi's IP or hostname
const API_URL = "http://172.16.1.8:5000";

const api = axios.create({
	baseURL: API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

export default api;
