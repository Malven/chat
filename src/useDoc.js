import { useState, useEffect } from 'react';
import { db } from './firebase';

export function useDoc(path) {
  const [doc, setDoc] = useState(null);

  useEffect(() => {
    return db.doc(path).onSnapshot(doc => {
      const user = {
        ...doc.data(),
        id: doc.id
      };
      setDoc(user);
    });
  }, [path]);

  return doc;
}
