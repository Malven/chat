import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';

const config = {};

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

  const rtdbRef = rtdb.ref(`/status/${user.uid}`);

  rtdb.ref('.info/connected').on('value', async snapshot => {
    if (snapshot.val() === false) {
      return;
    }

    await rtdbRef.onDisconnect().set(isOfflineForRTDB);
    rtdbRef.set(isOnlineForRTDB);
  });
}

export { db, firebase };
