import cookies from 'js-cookie';
import io from 'socket.io-client';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import faker from 'faker';
import createStore from './store.js';
import NicknameContext from './NicknameContext.js';
import App from './components/App.jsx';
import { actions } from './slices/index.js';

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
