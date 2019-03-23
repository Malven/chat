import { useState, useEffect } from 'react';
import { db, firebase, setupPresence } from './firebase';

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        const newUser = {
          displayName: firebaseUser.displayName,
          photoUrl: firebaseUser.photoURL,
          uid: firebaseUser.uid
        };
        setUser(newUser);
        db.collection('users')
          .doc(newUser.uid)
          .set(newUser, { merge: true });

        setupPresence(newUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  return user;
}
