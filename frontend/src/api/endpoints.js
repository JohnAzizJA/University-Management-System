export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login/',
  LOGOUT: '/auth/logout/',
  REFRESH: '/auth/token/refresh/',
  PROFILE: '/profile/',
  CHANGE_PASSWORD: '/auth/change-password/',
  FIRST_LOGIN_PASSWORD_CHANGE: '/auth/first-login-password-change/',
};

export const USER_ENDPOINTS = {
  CREATE: '/users/create/',
  LIST: '/users/',
  DETAIL: (id) => `/users/${id}/`,
};