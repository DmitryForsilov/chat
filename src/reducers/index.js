import { createReducer } from '@reduxjs/toolkit';
import * as actions from '../actions/index.js';

const channelsReducer = createReducer([], (builder) => {
  builder
    .addCase(
      actions.addChannelSuccess, (state, { payload: { channel } }) => [...state, channel],
    );
});

const messagesReducer = createReducer([], (builder) => {
  builder.addCase(
    actions.addMessageSuccess, (state, { payload: { message } }) => [...state, message],
  );
});

const currentChannelIdReducer = createReducer(null, (builder) => {
  builder.addCase(
    actions.toggleChannel, (state, { payload: { id } }) => id,
  );
});

const modalInfoReducer = createReducer({ type: null }, (builder) => {
  builder
    .addCase(
      actions.showModal, (state, { payload: { type } }) => ({ type }),
    )
    .addCase(
      actions.hideModal, () => ({ type: null }),
    );
});

export default {
  channels: channelsReducer,
  messages: messagesReducer,
  currentChannelId: currentChannelIdReducer,
  modalInfo: modalInfoReducer,
};
