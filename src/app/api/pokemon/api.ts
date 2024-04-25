import axios from 'axios';

const pokeApi = axios.create({
  baseURL: process.env.NEXT_API_URL ?? 'https://pokeapi.co/api/v2',
  timeout: Number(process.env.NEXT_AXIOS_TIMEOUT) ?? 1000,
});
export default pokeApi;
