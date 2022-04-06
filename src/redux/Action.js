import {SET_SINGLE_CHAR_DATA, SET_FAVORITES, REMOVE_FAVORITES} from './Type';

export const setSingleCharData = data => ({
  type: SET_SINGLE_CHAR_DATA,
  payload: data,
});

export const setFavorites = data => ({
  type: SET_FAVORITES,
  payload: data,
});

export const removeFavorites = data => ({
  type: REMOVE_FAVORITES,
  payload: data,
});
