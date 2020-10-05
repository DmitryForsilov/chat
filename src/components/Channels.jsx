import React from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown, Button } from 'react-bootstrap';
import { actions } from '../slices/index.js';

const renderChannel = (channel, currentChannelId, toggleChannelHandler, showModalHandler) => {
  const { id, name, removable } = channel;
  const btnVariant = currentChannelId === id ? 'primary' : 'light';
  const classes = cn({
    'text-left nav-link': true,
    'btn-block mb-2': !removable,
    'flex-grow-1': removable,
  });

  const renderButton = () => (
    <Button
      className={classes}
      variant={btnVariant}
      onClick={toggleChannelHandler(id)}
    >
      {name}
    </Button>
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

const Channels = () => {
  const channelsList = useSelector(({ channels }) => channels.channelsList);
  const currentChannelId = useSelector(({ channels }) => channels.currentChannelId);
  const dispatch = useDispatch();

  const showModalHandler = (type, channel) => () => {
    dispatch(actions.showModal({ type, channel }));
  };

  const toggleChannelHandler = (id) => () => {
    dispatch(actions.toggleChannel({ id }));
  };

  return (
    <div className="col-4 col-sm-3 border-right p-2">
      <div className="d-flex mb-2">
        <span>Channels</span>
        <button type="button" className="ml-auto p-0 btn btn-link" onClick={showModalHandler('add')}>+</button>
      </div>
      {
        channelsList.length > 0 && (
          <ul className="nav flex-column nav-pills nav-fill">
            {
              channelsList.map((channel) => renderChannel(
                channel, currentChannelId, toggleChannelHandler, showModalHandler,
              ))
            }
          </ul>
        )
      }
    </div>
  );
};

export default Channels;
