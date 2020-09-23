// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/application.scss';
import faker from 'faker';
// @ts-ignore
import gon from 'gon';
import cookies from 'js-cookie';
import io from 'socket.io-client';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import NicknameContext from './components/NicknameContext.jsx';
import App from './components/App.jsx';
import rootReducer from './reducers/index.js';
import { addMessageSuccess } from './actions/index.js';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

console.log('gon', gon);

const store = configureStore({
  reducer: rootReducer,
  preloadedState: gon,
});

cookies.set('nickname', faker.internet.userName());

const socket = io();
socket.on('newMessage', ({ data: { attributes } }) => {
  const message = attributes;

  // @ts-ignore
  store.dispatch(addMessageSuccess({ message }));
});

render(
  <Provider store={store}>
    <NicknameContext.Provider value={cookies.get('nickname')}>
      <App />
    </NicknameContext.Provider>
  </Provider>,
  document.getElementById('chat'),
);
