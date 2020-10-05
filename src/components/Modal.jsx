import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import getModalBody from './modalBodies/index.js';
import { actions } from '../slices/index.js';

const ModalComponent = () => {
  const modalInfo = useSelector((state) => state.modalInfo);
  const dispatch = useDispatch();

  const { type, channel } = modalInfo;

  if (!type) {
    return null;
  }

  const modalTitlesByType = {
    add: 'Add channel',
    remove: 'Remove channel',
    rename: 'Rename channel',
  };

  const hideModalHandler = () => {
    dispatch(actions.hideModal());
  };

  const BodyComponent = getModalBody(type);

  return (
    <Modal show onHide={hideModalHandler}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitlesByType[type]}</Modal.Title>
      </Modal.Header>
      <BodyComponent channel={channel} hideModalHandler={hideModalHandler} />
    </Modal>
  );
};

export default ModalComponent;
