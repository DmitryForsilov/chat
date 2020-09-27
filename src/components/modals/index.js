import Add from './Add.jsx';

const modals = {
  add: Add,
};

export default (modalType) => modals[modalType];
