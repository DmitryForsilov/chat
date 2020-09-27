import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import { Dropdown, Button } from 'react-bootstrap';
import * as actions from '../actions/index.js';

const mapStateToProps = (state) => {
  const { channels, currentChannelId } = state;

  return { channels, currentChannelId };
};

const actionsCreators = {
  toggleChannel: actions.toggleChannel,
  showModal: actions.showModal,
};

const renderChannel = (channel, currentChannelId, toggleChannel, showModalHandler) => {
  const { id, name, removable } = channel;
  const btnVariant = currentChannelId === id ? 'primary' : 'light';
  const classes = cn({
    'text-left nav-link': true,
    'btn-block mb-2': !removable,
    'flex-grow-1': removable,
  });

  const toggleChannelHandler = () => {
    if (id !== currentChannelId) {
      toggleChannel({ id });
    }
  };

  const renderButton = () => (
    <Button className={classes} variant={btnVariant} onClick={toggleChannelHandler}>{name}</Button>
  );

  const renderButtonWithDropdown = () => (
    <Dropdown className="d-flex mb-2 btn-group">
      {renderButton()}
      <Dropdown.Toggle split variant={btnVariant} className="flex-grow-0" />
      <Dropdown.Menu>
        <Dropdown.Item onClick={showModalHandler('remove', channel)}>Remove</Dropdown.Item>
        <Dropdown.Item onClick={showModalHandler('rename', channel)}>Rename</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  return (
    <li key={id} className="nav-item">
      {removable ? renderButtonWithDropdown() : renderButton()}
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

  const showModalHandler = (type, channel) => () => {
    showModal({ type, channel });
  };

  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>Channels</span>
        <button type="button" className="ml-auto p-0 btn btn-link" onClick={showModalHandler('add')}>+</button>
      </div>
      {
        channels.length > 0 && (
          <ul className="nav flex-column nav-pills nav-fill">
            {
              channels.map((channel) => renderChannel(
                channel, currentChannelId, toggleChannel, showModalHandler,
              ))
            }
          </ul>
        )
      }
    </div>
  );
};

export default connect(mapStateToProps, actionsCreators)(Channels);
