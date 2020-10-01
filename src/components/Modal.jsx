import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import getModal from './modals/index.js';
import { actions } from '../slices/index.js';

const Modal = () => {
  const modalInfo = useSelector((state) => state.modalInfo);
  const dispatch = useDispatch();

  if (!modalInfo.type) {
    return null;
  }

  const hideModalHandler = () => {
    dispatch(actions.hideModal());
  };

  const Component = getModal(modalInfo.type);

  return (
    <Component
      channel={modalInfo.channel}
      hideModalHandler={hideModalHandler}
    />
  );
};

export default Modal;
