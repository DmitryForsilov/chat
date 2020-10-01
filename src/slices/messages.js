import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';
import { channelsActions } from './channels.js';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessageSuccess(state, { payload: { message } }) {
      state.push(message);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        channelsActions.removeChannelSuccess, (state, { payload: { channelId } }) => state
          .filter((message) => message.channelId !== channelId),
      );
  },
});

const addMessage = (currentChannelId, { nickname, body }) => async () => {
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

export const messagesActions = {
  ...messagesSlice.actions,
  addMessage,
};

export const messagesReducer = messagesSlice.reducer;
