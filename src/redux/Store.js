import {createStore, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
import HomeReducer from './Reducer/HomeReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [''],
  stateReconciler: autoMergeLevel1,
};
const rootReducer = combineReducers({
  home: HomeReducer,
});
const pReducer = persistReducer(persistConfig, rootReducer);
export const configureStore = createStore(pReducer);
export const persistor = persistStore(configureStore);
