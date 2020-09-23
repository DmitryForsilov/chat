import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { channels, currentChannelId } = state;

  return { channels, currentChannelId };
};

const renderChannel = ({ id, name }, currentChannelId) => {
  const classes = cn({
    'nav-link btn-block mb-2 text-left btn': true,
    'btn-primary': currentChannelId === id,
    'btn-light': !(currentChannelId === id),
  });

  return (
    <li key={id} className="nav-item">
      <button type="button" className={classes}>{name}</button>
    </li>
  );
};

const Channels = (props) => {
  const { channels, currentChannelId } = props;

  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>Channels</span>
        <button type="button" className="ml-auto p-0 btn btn-link">+</button>
      </div>
      {
        channels.length > 0 && (
          <ul className="nav flex-column nav-pills nav-fill">
            {channels.map((channel) => renderChannel(channel, currentChannelId))}
          </ul>
        )
      }
    </div>
  );
};

export default connect(mapStateToProps, null)(Channels);
