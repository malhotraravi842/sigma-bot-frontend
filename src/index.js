import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import './assets/scss/main.scss';
import rootReducer from './reducers';
// eslint-disable-next-line
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

const store = createStore(rootReducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
