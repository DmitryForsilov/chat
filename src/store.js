import { configureStore } from '@reduxjs/toolkit';
import gon from 'gon';
import { reducers } from './slices/index.js';

/* console.log('gon', gon); */

export default () => {
  const { channels, messages, currentChannelId } = gon;
  const store = configureStore({
    reducer: reducers,
    preloadedState: {
      channels: {
        channelsList: channels,
        currentChannelId,
      },
      messages,
    },
  });

  return store;
};
