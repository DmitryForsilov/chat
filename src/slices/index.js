import { channelsActions, channelsReducer } from './channels.js';
import { messagesActions, messagesReducer } from './messages.js';
import { modalInfoActions, modalInfoReducer } from './modalInfo.js';

export const actions = {
  ...channelsActions,
  ...messagesActions,
  ...modalInfoActions,
};

export const reducers = {
  channels: channelsReducer,
  messages: messagesReducer,
  modalInfo: modalInfoReducer,
};
