import firebase from 'firebase/app';
import 'firebase/messaging';

const _0x9fa1 = [
  '665062916345',
  'AIzaSyB-B5beId-sQKbUY099CyuiNccpCsuyqaY',
  'https://jimoh-s-blog.firebaseio.com',
  'initializeApp',
  'jimoh-s-blog.firebaseapp.com',
  'jimoh-s-blog',
  '1:665062916345:web:24f89c41316f1c3d282228',
];
(function (_0x3dca8d, _0x9fa169) {
  const _0x5992c7 = function (_0x38cb79) {
    while (--_0x38cb79) {
      _0x3dca8d['push'](_0x3dca8d['shift']());
    }
  };
  _0x5992c7(++_0x9fa169);
})(_0x9fa1, 0x167);
const _0x5992 = function (_0x3dca8d, _0x9fa169) {
  _0x3dca8d = _0x3dca8d - 0x0;
  let _0x5992c7 = _0x9fa1[_0x3dca8d];
  return _0x5992c7;
};
const firebaseConfig = {
  apiKey: _0x5992('0x6'),
  authDomain: _0x5992('0x2'),
  databaseURL: _0x5992('0x0'),
  projectId: _0x5992('0x3'),
  storageBucket: 'jimoh-s-blog.appspot.com',
  messagingSenderId: _0x5992('0x5'),
  appId: _0x5992('0x4'),
  measurementId: 'G-5PS580VNYG',
};
firebase[_0x5992('0x1')](firebaseConfig);
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler((payload) =>
  window.self.registration.showNotification({ data: payload.data.status })
);
