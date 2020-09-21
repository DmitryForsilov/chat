// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/application.scss';
// import faker from 'faker';
// @ts-ignore
import gon from 'gon';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';

import App from './components/App.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

console.log('gon', gon);

App(gon);
