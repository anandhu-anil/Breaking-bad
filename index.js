import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {configureStore, persistor} from './src/redux/Store';
import {PersistGate} from 'redux-persist/lib/integration/react';

const ReduxWrapper = () => (
  <Provider store={configureStore}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent(appName, () => ReduxWrapper);
