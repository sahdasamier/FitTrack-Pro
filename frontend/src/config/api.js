const API_BASE_URL =
  process.env.REACT_APP_API_URL?.replace(/\/+$/, '') || 'http://localhost:4000';

export { API_BASE_URL };
