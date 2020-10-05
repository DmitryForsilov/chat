import Add from './Add.jsx';
import Remove from './Remove.jsx';
import Rename from './Rename.jsx';

const modalBodies = {
  add: Add,
  remove: Remove,
  rename: Rename,
};

export default (modalType) => modalBodies[modalType];
