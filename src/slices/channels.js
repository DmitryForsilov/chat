import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    addChannelSuccess(state, { payload: { channel } }) {
      return [...state, channel];
    },
    removeChannelSuccess(state, { payload: { channelId } }) {
      const updatedChannels = state.filter(({ id }) => id !== channelId);

      return updatedChannels;
    },
    renameChannelSuccess(state, { payload: { channel } }) {
      const filteredChannels = state.filter(({ id }) => id !== channel.id);
      const updatedChannels = [...filteredChannels, channel];

      return updatedChannels;
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
