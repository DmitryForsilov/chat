import React from 'react';
import { useSelector } from 'react-redux';

const renderMessage = (message) => {
  const { nickname, id, body } = message;

  return (
    <div key={id}>
      <b>{nickname}</b>
      :
      {` ${body}`}
    </div>
  );
};

const Messages = () => {
  const messages = useSelector((state) => state.messages);
  const currentChannelId = useSelector(({ channels }) => channels.currentChannelId);
  const currentMessages = messages.filter(({ channelId }) => channelId === currentChannelId);

  return (
    <div id="messages-box" className="chat-messages overflow-auto mb-3">
      {currentMessages.length > 0 && currentMessages.map((message) => renderMessage(message))}
    </div>
  );
};

export default Messages;
