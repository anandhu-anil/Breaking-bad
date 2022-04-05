import {createStore, combineReducers} from 'redux';
import HomeReducer from './Reducer/HomeReducer';

const rootReducer = combineReducers({
  home: HomeReducer,
});
export const configureStore = createStore(rootReducer);
