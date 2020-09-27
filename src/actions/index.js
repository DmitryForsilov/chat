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

export const addChannelSuccess = createAction('CHANNEL_ADD');
export const addChannel = ({ name }) => async () => {
  const url = routes.channelsPath();

  await axios.post(url, {
    data: {
      attributes: {
        name,
      },
    },
  });
};
export const toggleChannel = createAction('CHANNEL_TOGGLE');

export const showModal = createAction('MODAL_SHOW');
export const hideModal = createAction('MODAL_HIDE');
