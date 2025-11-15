import axiosInstance from './axios';
import { USER_ENDPOINTS } from './endpoints';

export const userService = {
  createUser: async (userData) => {
    const response = await axiosInstance.post(USER_ENDPOINTS.CREATE, userData);
    return response.data;
  },

  getUsers: async (userType = null) => {
    const params = userType ? { user_type: userType } : {};
    const response = await axiosInstance.get(USER_ENDPOINTS.LIST, { params });
    return response.data;
  },

  getUserDetail: async (userId) => {
    const response = await axiosInstance.get(USER_ENDPOINTS.DETAIL(userId));
    return response.data;
  },

  updateUser: async (userId, userData) => {
    const response = await axiosInstance.patch(
      USER_ENDPOINTS.DETAIL(userId),
      userData
    );
    return response.data;
  },

  deleteUser: async (userId) => {
    const response = await axiosInstance.delete(USER_ENDPOINTS.DETAIL(userId));
    return response.data;
  },
};