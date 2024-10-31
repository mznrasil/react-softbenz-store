import axios from 'axios';

const ONE_MINUTE = 60 * 1000;

export const Api = axios.create({
  baseURL: import.meta.env.VITE_APP_MOVIE_API,
  timeout: ONE_MINUTE,
});
