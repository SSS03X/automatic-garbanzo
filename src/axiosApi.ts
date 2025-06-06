import axios from 'axios';

const API_URL = 'http://ec2-16-16-63-45.eu-north-1.compute.amazonaws.com/api/v1';

const axiosApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosApi.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                console.log('Attempting refresh with:', refreshToken);
                if (!refreshToken) {
                    console.error('No refresh token, redirecting to login');
                    window.location.href = '/login';
                    return Promise.reject(error);
                }
                const { data } = await axios.post(`${API_URL}/token/refresh/`, { refresh: refreshToken });
                console.log('Refresh successful:', data);
                localStorage.setItem('accessToken', data.access);
                localStorage.setItem('refreshToken', data.refresh);
                originalRequest.headers.Authorization = `Bearer ${data.access}`;
                return axiosApi(originalRequest);
            } catch (refreshError) {
                console.error('Refresh failed:', refreshError);
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        console.error('API error:', error.response?.status, error.response?.data);
        return Promise.reject(error);
    }
);

export default axiosApi;
