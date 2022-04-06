import {SET_SINGLE_CHAR_DATA, SET_FAVORITES, REMOVE_FAVORITES} from '../Type';

const initialState = {
  singleCharacter: {},
  favorites: [],
};

const singleCharacterDetails = (state, data) => {
  let newState = {...state};
  newState.singleCharacter = data;
  return newState;
};

function getUnique(arr, comp) {
  const unique = arr
    .map(e => e[comp])
    // store the indexes of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)
    // eliminate the false indexes & return unique objects
    .filter(e => arr[e])
    .map(e => arr[e]);
  return unique;
}

const setFavoritesHandler = (state, data) => {
  let favData = getUnique([...state.favorites, data], 'char_id');
  let newState = {...state};
  newState.favorites = favData;
  return newState;
};
const removeFavoritesHandler = (state, data) => {
  let filteredArray = state.favorites.filter(f => f.char_id !== data);
  let newState = {...state};
  newState.favorites = filteredArray;
  return newState;
};

function HomeReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_CHAR_DATA:
      return singleCharacterDetails(state, action.payload);
    case SET_FAVORITES:
      return setFavoritesHandler(state, action.payload);
    case REMOVE_FAVORITES:
      return removeFavoritesHandler(state, action.payload);
    default:
      return state;
  }
}

export default HomeReducer;
