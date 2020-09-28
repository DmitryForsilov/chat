import gon from 'gon';
import cookies from 'js-cookie';
import io from 'socket.io-client';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import faker from 'faker';
import NicknameContext from './components/NicknameContext.jsx';
import App from './components/App.jsx';
import { reducers, actions } from './slices/index.js';

console.log('gon', gon);

const createStore = () => {
  const store = configureStore({
    reducer: reducers,
    preloadedState: gon,
  });

  return store;
};

const getNickname = () => cookies.get('nickname');
const setNickname = () => {
  if (!getNickname()) {
    cookies.set('nickname', faker.internet.userName());
  }
};

const initSocket = (store) => {
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
};

export default () => {
  const store = createStore();

  setNickname();
  initSocket(store);
  render(
    <Provider store={store}>
      <NicknameContext.Provider value={getNickname()}>
        <App />
      </NicknameContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
