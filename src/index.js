// @ts-check
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/application.scss';
// @ts-ignore
import runApp from './runApp.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

runApp();
