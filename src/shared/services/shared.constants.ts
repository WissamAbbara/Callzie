// This file is a shared file between all component,
// this File hold the constants used widely.
// this file will make future changes easy (only from here).
export const API_CONST = {
  BASE_URL: 'http://localhost:54012/api/',
  ACTIONS: {
    LOGIN: 'Authenticate/login',
    USER_INFO: 'User/getUserInfo',
    REGISTER: 'Authenticate/register',
    ALL_USERS: 'User/getAllUsers',
    USER: 'User/editUser/',
    DELETE: 'User/deleteUser/'
  }
};
export const STORAGE = {
  TOKEN: 'token',
  USER: 'user'
};
export const ROUTES = {
  LOGIN: '/login',
  HOME: '/home'
};
