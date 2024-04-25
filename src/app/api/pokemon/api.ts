import axios from 'axios';

const pokeApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  timeout: Number(process.env.NEXT_AXIOS_TIMEOUT) ?? 1000,
});
export default pokeApi;
