import { createReducer } from '@reduxjs/toolkit';
import * as actions from '../actions/index.js';

const channelsReducer = createReducer([], (builder) => {
  builder
    .addCase(
      actions.addChannelSuccess, (state, { payload: { channel } }) => [...state, channel],
    )
    .addCase(
      actions.removeChannelSuccess, (state, { payload: { channelId } }) => {
        const updatedChannels = state.filter(({ id }) => id !== channelId);

        return updatedChannels;
      },
    )
    .addCase(
      actions.renameChannelSuccess, (state, { payload: { channel } }) => {
        const filteredChannels = state.filter(({ id }) => id !== channel.id);
        const updatedChannels = [...filteredChannels, channel];

        return updatedChannels;
      },
    );
});

const messagesReducer = createReducer([], (builder) => {
  builder
    .addCase(
      actions.addMessageSuccess, (state, { payload: { message } }) => [...state, message],
    )
    .addCase(
      actions.removeChannelSuccess, (state, { payload: { channelId } }) => {
        const updatedMessages = state.filter((message) => message.channelId !== channelId);

        return updatedMessages;
      },
    );
});

const currentChannelIdReducer = createReducer(null, (builder) => {
  builder.addCase(
    actions.toggleChannel, (state, { payload: { id } }) => id,
  );
});

const modalInfoReducer = createReducer({ type: null, channel: null }, (builder) => {
  builder
    .addCase(
      actions.showModal, (state, { payload: { type, channel } }) => ({ type, channel }),
    )
    .addCase(
      actions.hideModal, () => ({ type: null, channel: null }),
    );
});

export default {
  channels: channelsReducer,
  messages: messagesReducer,
  currentChannelId: currentChannelIdReducer,
  modalInfo: modalInfoReducer,
};
