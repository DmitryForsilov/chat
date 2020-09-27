import { remove } from 'lodash';
import Add from './Add.jsx';
import Remove from './Remove.jsx';
import Rename from './Rename.jsx';

const modals = {
  add: Add,
  remove: Remove,
  rename: Rename,
};

export default (modalType) => modals[modalType];
