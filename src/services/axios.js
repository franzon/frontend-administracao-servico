import axios from 'axios';

const FRONTEND_URL_PRODUCTION = 'https://scoreboard.tech';
const FRONTEND_URL_LOCAL = 'http://127.0.0.1:3333';

export const FRONTEND_URL = process.env.NODE_ENV === 'production' ? FRONTEND_URL_PRODUCTION : FRONTEND_URL_LOCAL;

const API_URL_PRODUCTION = 'https://api.scoreboard.tech';
const API_URL_LOCAL = 'http://127.0.0.1:3333';

const API_URL = process.env.NODE_ENV === 'production' ? API_URL_PRODUCTION : API_URL_LOCAL;

console.log('[info]', `Configurando axios para ${API_URL}`);

const client = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = token || '';
  return config;
});

export default client;
