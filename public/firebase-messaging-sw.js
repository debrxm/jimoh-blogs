import firebase from 'firebase/app';
import 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyB-B5beId-sQKbUY099CyuiNccpCsuyqaY',
  authDomain: 'jimoh-s-blog.firebaseapp.com',
  databaseURL: 'https://jimoh-s-blog.firebaseio.com',
  projectId: 'jimoh-s-blog',
  storageBucket: 'jimoh-s-blog.appspot.com',
  messagingSenderId: '665062916345',
  appId: '1:665062916345:web:24f89c41316f1c3d282228',
  measurementId: 'G-5PS580VNYG',
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler((payload) =>
  window.self.registration.showNotification({ data: payload.data.status })
);
