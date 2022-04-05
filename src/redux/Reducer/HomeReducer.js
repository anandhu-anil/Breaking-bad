import {SET_SINGLE_CHAR_DATA} from '../Type';

const initialState = {
  singleCharacter: {},
};

const singleCharacterDetails = (state, data) => {
  let newState = {...state};
  newState.singleCharacter = data;
  return newState;
};

function HomeReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_CHAR_DATA:
      return singleCharacterDetails(state, action.payload);
    default:
      return state;
  }
}

export default HomeReducer;
