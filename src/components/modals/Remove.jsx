import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { actions } from '../../slices/index.js';

const Remove = (props) => {
  const { hideModalHandler, channel } = props;
  const dispatch = useDispatch();

  const removeChannelHandler = async () => {
    try {
      await dispatch(actions.removeChannel({ channelId: channel.id }));
      hideModalHandler();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Modal show onHide={hideModalHandler}>
      <Modal.Header closeButton>
        <Modal.Title>Remove channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure?</p>
        <div className="d-flex justify-content-between">
          <Button className="mr-2" variant="secondary" onClick={hideModalHandler}>Cancel</Button>
          <Button variant="danger" onClick={removeChannelHandler}>Confirm</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
