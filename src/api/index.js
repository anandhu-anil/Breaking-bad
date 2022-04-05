import {get} from './networkUtils';

export const getAllCharacters = () => get(`/api/characters`, false);
export const searchCharacters = text => get(`/api/characters?name=${text}`);
export const getOtherCharacters = text =>
  get(`/api/characters?category=${text}`);
