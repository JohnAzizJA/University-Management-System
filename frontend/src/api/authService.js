import axiosInstance from './axios';
import { AUTH_ENDPOINTS } from './endpoints';

export const authService = {
  login: async (username, password) => {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.LOGIN, {
      username,
      password,
    });
    return response.data;
  },

  logout: async (refreshToken) => {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.LOGOUT, {
      refresh_token: refreshToken,
    });
    return response.data;
  },

  getProfile: async () => {
    const response = await axiosInstance.get(AUTH_ENDPOINTS.PROFILE);
    return response.data;
  },

  updateProfile: async (userData) => {
    const response = await axiosInstance.patch(AUTH_ENDPOINTS.PROFILE, userData);
    return response.data;
  },

  changePassword: async (oldPassword, newPassword, newPasswordConfirm) => {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.CHANGE_PASSWORD, {
      old_password: oldPassword,
      new_password: newPassword,
      new_password_confirm: newPasswordConfirm,
    });
    return response.data;
  },

  firstLoginPasswordChange: async (newPassword, newPasswordConfirm) => {
    const response = await axiosInstance.post(
      AUTH_ENDPOINTS.FIRST_LOGIN_PASSWORD_CHANGE,
      {
        new_password: newPassword,
        new_password_confirm: newPasswordConfirm,
      }
    );
    return response.data;
  },
};