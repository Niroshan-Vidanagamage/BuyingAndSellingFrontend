// File: src/api/client.tsx
import axios from 'axios';

const baseURL =
  process.env.REACT_APP_API_BASE?.replace(/\/+$/, '') || 'http://localhost:4000/api/v1';

export const api = axios.create({ baseURL });

// Attach JWT from localStorage if present
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (res) => res,
    async (err) => {
    // Basic 401 handling – optionally add refresh-token flow here
    if (err?.response?.status === 401) {
        localStorage.removeItem('access_token');
        // window.location.href = '/login';
    }
    return Promise.reject(err);
    }
);

export type Listing = {
    _id: string;
    title: string;
    description?: string;
    category: 'HOUSES_LANDS'|'ELECTRONICS'|'FURNITURE_HOUSEWARE'|'SPORTS_EQUIPMENT'|'VEHICLES';
    price: number;
    condition: 'new'|'used';
    images?: { key: string; url: string; w?: number; h?: number; kind: 'orig'|'thumb' }[];
    locationCity?: string;
    sellerId: string;
    status: 'active'|'draft'|'deleted';
    createdAt: string;
    updatedAt: string;
};

export type User = {
    _id: string;
    name: string;
    email: string;
    phone: string;
    city?: string;
};