import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const Remove = (props) => {
  const { hideModal, removeChannel, channel } = props;

  const hideModalHandler = () => {
    hideModal();
  };

  const removeChannelHandler = async () => {
    try {
      await removeChannel({ channelId: channel.id });
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
        Are you sure?
        <div className="d-flex justify-content-between">
          <Button className="mr-2" variant="secondary" onClick={hideModalHandler}>Cancel</Button>
          <Button variant="danger" onClick={removeChannelHandler}>Confirm</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
