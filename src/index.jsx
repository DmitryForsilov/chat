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
import * as actions from './actions/index.js';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

console.log('gon', gon);

const store = configureStore({
  reducer: rootReducer,
  preloadedState: gon,
});

if (!cookies.get('nickname')) {
  cookies.set('nickname', faker.internet.userName());
}

const socket = io();
socket.on('newMessage', ({ data: { attributes } }) => {
  const message = attributes;

  // @ts-ignore
  store.dispatch(actions.addMessageSuccess({ message }));
});
socket.on('newChannel', ({ data: { attributes } }) => {
  const channel = attributes;

  // @ts-ignore
  store.dispatch(actions.addChannelSuccess({ channel }));
});
socket.on('removeChannel', ({ data: { id } }) => {
  // @ts-ignore
  store.dispatch(actions.removeChannelSuccess({ channelId: id }));
});
socket.on('renameChannel', ({ data: { attributes } }) => {
  const channel = attributes;

  // @ts-ignore
  store.dispatch(actions.renameChannelSuccess({ channel }));
});

render(
  <Provider store={store}>
    <NicknameContext.Provider value={cookies.get('nickname')}>
      <App />
    </NicknameContext.Provider>
  </Provider>,
  document.getElementById('chat'),
);
