export const API_URL = import.meta.env.VITE_API_URL || 'https://api.example.com';

export const DEFAULT_TIMEOUT = 30000;

export const ENDPOINTS = {
  PROMPT: '/prompt',
};

export const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};
