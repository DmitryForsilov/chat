import React from 'react';
import { render } from 'react-dom';
import Channels from './Channels.jsx';

const App = (props) => {
  const { data: { channels, currentChannelId } } = props;

  return (
    <div className="row h-100 pb-3">
      <Channels channels={channels} currentChannelId={currentChannelId} />
    </div>
  );
};

export default (data) => {
  render(
    <App data={data} />,
    document.getElementById('chat'),
  );
};
