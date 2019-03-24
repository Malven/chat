import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER
};

firebase.initializeApp(config);

const db = firebase.firestore();
const rtdb = firebase.database();

export function setupPresence(user) {
  const isOfflineForRTDB = {
    state: 'offline',
    lastChange: firebase.database.ServerValue.TIMESTAMP
  };

  const isOnlineForRTDB = {
    state: 'online',
    lastChanged: firebase.database.ServerValue.TIMESTAMP
  };

  const isOfflineForFirestore = {
    state: 'offline',
    lastChange: firebase.firestore.FieldValue.serverTimestamp()
  };

  const isOnlineForFirestore = {
    state: 'online',
    lastChanged: firebase.firestore.FieldValue.serverTimestamp()
  };

  const rtdbRef = rtdb.ref(`/status/${user.uid}`);
  const userDoc = db.doc(`/users/${user.uid}`);

  rtdb.ref('.info/connected').on('value', async snapshot => {
    if (snapshot.val() === false) {
      userDoc.update({
        status: isOfflineForFirestore
      });
      return;
    }

    await rtdbRef.onDisconnect().set(isOfflineForRTDB);
    rtdbRef.set(isOnlineForRTDB);
    userDoc.update({
      status: isOnlineForFirestore
    });
  });
}

export { db, firebase };
