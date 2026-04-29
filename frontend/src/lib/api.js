import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
});

// Add token to requests if available
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const login = (credentials) => API.post('/auth/login', credentials);
export const register = (userData) => API.post('/auth/register', userData);
export const sendMessage = (messageData) => API.post('/chat/send', messageData);
export const getChatHistory = (userId) => API.get(`/chat/history/${userId}`);
export const changePassword = (data) => API.post('/auth/change-password', data);

// Admin APIs
export const getAdminStats = (userId) => API.get('/admin/stats', { headers: { 'user-id': userId } });
export const toggleUserStatus = (userId, targetId) => API.post('/admin/toggle-status', { targetUserId: targetId }, { headers: { 'user-id': userId } });

export default API;
