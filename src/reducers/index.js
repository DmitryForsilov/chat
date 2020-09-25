import { createReducer } from '@reduxjs/toolkit';
import * as actions from '../actions/index.js';

const messagesReducer = createReducer([], (builder) => {
  builder
    .addCase(actions.addMessageSuccess, (state, { payload: { message } }) => [...state, message]);
});

const channelsReducer = createReducer([], () => {

});

const currentChannelIdReducer = createReducer(null, () => {

});

export default {
  channels: channelsReducer,
  messages: messagesReducer,
  currentChannelId: currentChannelIdReducer,
};
