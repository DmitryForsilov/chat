/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channelsList: [],
    currentChannelId: null,
  },
  reducers: {
    addChannelSuccess(state, { payload: { channel } }) {
      state.channelsList.push(channel);
    },
    removeChannelSuccess(state, { payload: { channelId } }) {
      const updatedChannels = state.channelsList.filter(({ id }) => id !== channelId);

      state.channelsList = updatedChannels;
    },
    renameChannelSuccess(state, { payload: { channel } }) {
      const currentChannel = state.channelsList.find(({ id }) => id === channel.id);
      currentChannel.name = channel.name;
    },
    toggleChannel(state, { payload: { id } }) {
      state.currentChannelId = id;
    },
  },
});

const addChannel = ({ name }) => async () => {
  const url = routes.channelsPath();

  await axios.post(url, {
    data: {
      attributes: {
        name,
      },
    },
  });
};

const removeChannel = ({ channelId }) => async () => {
  const url = routes.channelPath(channelId);

  await axios.delete(url);
};

const renameChannel = (channel) => async () => {
  const { id, name } = channel;
  const url = routes.channelPath(id);

  await axios.patch(url, {
    data: {
      attributes: {
        name,
      },
    },
  });
};

export const channelsActions = {
  ...channelsSlice.actions,
  addChannel,
  removeChannel,
  renameChannel,
};

export const channelsReducer = channelsSlice.reducer;
