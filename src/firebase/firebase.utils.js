import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/messaging';

// const firebaseConfig = {
//   apiKey: 'AIzaSyB-B5beId-sQKbUY099CyuiNccpCsuyqaY',
//   authDomain: 'jimoh-s-blog.firebaseapp.com',
//   databaseURL: 'https://jimoh-s-blog.firebaseio.com',
//   projectId: 'jimoh-s-blog',
//   storageBucket: 'jimoh-s-blog.appspot.com',
//   messagingSenderId: '665062916345',
//   appId: '1:665062916345:web:24f89c41316f1c3d282228',
//   measurementId: 'G-5PS580VNYG',
// };

// firebase.initializeApp(firebaseConfig);
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
messaging.usePublicVapidKey(
  'BE4oQwQ6SFWpjja5sxorXs4G9GRN4-KC-4dNrt3-1zlcXlRBtK7Zyo_NlO7fhR3ZVuA-UNO1py_McchXKtEge5U'
);
messaging
  .requestPermission()
  .then(() => messaging.getToken())
  .then((token) => {
    console.log(token);
  })
  .catch((error) => console.log(error));

messaging.onMessage((payload) => {
  console.log(payload);
});
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email, photoURL, emailVerified } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        photoURL,
        emailVerified,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const getAllComments = async ({ collection, documente }) => {
  const commentRef = firestore.doc(`${collection}/${documente}`);
  const snapShot = await commentRef.get();
  if (snapShot.exists) {
    try {
      return commentRef;
    } catch (error) {
      console.log('error creating user', error.message);
    }
  } else {
    return null;
  }
};
export const updateViews = async ({ collection, title, userIp }) => {
  const viewRef = firestore.doc(`${collection}/${title}`);
  const newView = [];
  newView.push(userIp);
  const snapShot = await viewRef.get();
  if (!snapShot.exists) {
    try {
      await viewRef.set({
        views: newView,
      });

      return viewRef;
    } catch (error) {
      console.log('error adding view to database', error.message);
    }
  } else {
    let oldView = [];
    oldView = snapShot.data().views;
    oldView.push(userIp);
    try {
      if (snapShot.data().views.includes(userIp) === false) {
        await viewRef.update({
          views: oldView,
        });
      }
      return viewRef;
    } catch (error) {
      console.log('error adding view to database', error.message);
    }
  }
};
export const addAReply = async ({ collection, d_ata, commentId, blogName }) => {
  const addReplyRef = firestore.doc(`${collection}/${blogName}`);
  const snapShot = await addReplyRef.get();
  const { comments } = snapShot.data();
  const updatedComment = [];
  comments.forEach(async (item) => {
    if (item.id === commentId) {
      const { replies } = item;
      let oldReply = [];
      oldReply = replies;
      oldReply.push(d_ata);
      updatedComment.push(item);
    }
    if (item.id !== commentId) {
      updatedComment.push(item);
    }
  });
  try {
    await addReplyRef.update({
      comments: updatedComment,
    });
    return addReplyRef;
  } catch (error) {
    console.log('error Updating comment', error.message);
  }
};
export const addAComment = async ({ collection, d_ata }) => {
  // console.log(collection, d_ata);
  const addCommentRef = firestore.doc(`${collection}/${d_ata.post}`);
  const newComment = [];
  newComment.push(d_ata);
  const snapShot = await addCommentRef.get();
  if (!snapShot.exists) {
    try {
      await addCommentRef.set({
        comments: newComment,
      });
      return addCommentRef;
    } catch (error) {
      console.log('error adding comment to database', error.message);
    }
  } else {
    let oldComment = [];
    oldComment = snapShot.data().comments;
    oldComment.push(d_ata);
    try {
      await addCommentRef.update({
        comments: oldComment,
      });
      return addCommentRef;
    } catch (error) {
      console.log('error adding comment to database', error.message);
    }
  }
};

const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export default firebase;
