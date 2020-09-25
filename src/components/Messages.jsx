import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { messages } = state;

  return { messages };
};

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

const Messages = (props) => {
  const { messages } = props;

  return (
    <div id="messages-box" className="chat-messages overflow-auto mb-3">
      {messages.length > 0 && messages.map((message) => renderMessage(message))}
    </div>
  );
};

export default connect(mapStateToProps, null)(Messages);
