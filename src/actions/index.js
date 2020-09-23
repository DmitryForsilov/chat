import axios from 'axios';
import { createAction } from '@reduxjs/toolkit';
import routes from '../routes.js';

export const addMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const addMessage = (currentChannelId, { nickname, body }) => async (dispatch) => {
  dispatch(addMessageRequest());

  try {
    const url = routes.channelMessagesPath(currentChannelId);

    await axios.post(url, {
      data: {
        attributes: {
          nickname,
          body,
        },
      },
    });
  } catch (error) {
    console.log(error);

    dispatch(addMessageFailure());
  }
};
