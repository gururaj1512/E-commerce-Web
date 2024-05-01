import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from "react-redux";
import { positions, transitions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic';
import { persistor, persistReduxStore } from './store';
import { PersistGate } from 'redux-persist/integration/react';

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={persistReduxStore}>
      <PersistGate loading={null} persistor={persistor}>
        <AlertProvider template={AlertTemplate} {...options}>
          <App />
        </AlertProvider>
      </PersistGate>
  </Provider >
);
