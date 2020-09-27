import React from 'react';
import { connect } from 'react-redux';
import getModal from './modals/index.js';
import * as actions from '../actions/index.js';

const mapStateToProps = (state) => {
  const { modalInfo } = state;

  return { modalInfo };
};

const actionCreators = {
  hideModal: actions.hideModal,
  addChannel: actions.addChannel,
};

const Modal = (props) => {
  const { modalInfo, hideModal, addChannel } = props;

  if (!modalInfo.type) {
    return null;
  }

  const Component = getModal(modalInfo.type);

  return <Component hideModal={hideModal} addChannel={addChannel} />;
};

export default connect(mapStateToProps, actionCreators)(Modal);
