import React from 'react';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import NewMessageForm from './NewMessageForm.jsx';
import Modal from './Modal.jsx';

const App = () => (
  <div className="row h-100 pb-3">
    <Channels />
    <div className="col h-100">
      <div className="d-flex flex-column h-100">
        <Messages />
        <div className="mt-auto">
          <NewMessageForm />
        </div>
      </div>
    </div>
    <Modal />
  </div>
);

export default App;
