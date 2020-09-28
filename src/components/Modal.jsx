import React from 'react';
import { connect } from 'react-redux';
import getModal from './modals/index.js';
import { actions } from '../slices/index.js';

const mapStateToProps = (state) => {
  const { modalInfo } = state;

  return { modalInfo };
};

const actionCreators = {
  hideModal: actions.hideModal,
  addChannel: actions.addChannel,
  removeChannel: actions.removeChannel,
  renameChannel: actions.renameChannel,
};

const Modal = (props) => {
  const {
    modalInfo,
    hideModal,
    addChannel,
    removeChannel,
    renameChannel,
  } = props;

  if (!modalInfo.type) {
    return null;
  }

  const Component = getModal(modalInfo.type);

  return (
    <Component
      channel={modalInfo.channel}
      hideModal={hideModal}
      addChannel={addChannel}
      removeChannel={removeChannel}
      renameChannel={renameChannel}
    />
  );
};

export default connect(mapStateToProps, actionCreators)(Modal);
