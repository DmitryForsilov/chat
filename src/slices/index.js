import { channelsActions, channelsReducer } from './channels.js';
import { messagesActions, messagesReducer } from './messages.js';
import { currentChannelIdActions, currentChannelIdReducer } from './currentChannelId.js';
import { modalInfoActions, modalInfoReducer } from './modalInfo.js';

export const actions = {
  ...channelsActions,
  ...messagesActions,
  ...currentChannelIdActions,
  ...modalInfoActions,
};

export const reducers = {
  channels: channelsReducer,
  messages: messagesReducer,
  currentChannelId: currentChannelIdReducer,
  modalInfo: modalInfoReducer,
};
