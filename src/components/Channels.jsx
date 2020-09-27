import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';

const mapStateToProps = (state) => {
  const { channels, currentChannelId } = state;

  return { channels, currentChannelId };
};

const actionsCreators = {
  toggleChannel: actions.toggleChannel,
  showModal: actions.showModal,
};

const renderChannel = ({ id, name }, currentChannelId, toggleChannel) => {
  const btnThemeClass = `btn-${currentChannelId === id ? 'primary' : 'light'}`;
  const classes = cn({
    'nav-link btn-block mb-2 text-left btn': true,
    [btnThemeClass]: true,
  });

  const toggleChannelHandler = () => {
    if (id !== currentChannelId) {
      toggleChannel({ id });
    }
  };

  return (
    <li key={id} className="nav-item">
      <button type="button" className={classes} onClick={toggleChannelHandler}>{name}</button>
    </li>
  );
};

const Channels = (props) => {
  const {
    channels,
    currentChannelId,
    toggleChannel,
    showModal,
  } = props;

  const showModalHandler = () => {
    showModal({ type: 'add' });
  };

  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>Channels</span>
        <button type="button" className="ml-auto p-0 btn btn-link" onClick={showModalHandler}>+</button>
      </div>
      {
        channels.length > 0 && (
          <ul className="nav flex-column nav-pills nav-fill">
            {channels.map((channel) => renderChannel(channel, currentChannelId, toggleChannel))}
          </ul>
        )
      }
    </div>
  );
};

export default connect(mapStateToProps, actionsCreators)(Channels);
