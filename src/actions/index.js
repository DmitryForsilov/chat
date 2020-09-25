import axios from 'axios';
import { createAction } from '@reduxjs/toolkit';
import routes from '../routes.js';

export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');

export const addMessage = (currentChannelId, { nickname, body }) => async () => {
  const url = routes.channelMessagesPath(currentChannelId);

  await axios.post(url, {
    data: {
      attributes: {
        nickname,
        body,
      },
    },
  });
};

export const toggleChannel = createAction('CHANNEL_TOGGLE');
