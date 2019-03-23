import { useState, useEffect } from 'react';
import { db } from './firebase';

export function useCollection(path, orderBy, where = []) {
  const [docs, setDocs] = useState([]);

  const [queryField, queryOperator, queryValue] = where;

  useEffect(() => {
    let collection = db.collection(path);

    if (orderBy) {
      collection = collection.orderBy(orderBy);
    }

    if (queryField) {
      collection = collection.where(queryField, queryOperator, queryValue);
    }

    return collection.onSnapshot(snapshot => {
      const dataDocs = [];
      snapshot.forEach(doc => {
        dataDocs.push({ ...doc.data(), id: doc.id });
      });
      setDocs(dataDocs);
    });
  }, [orderBy, path, queryField, queryOperator, queryValue]);

  return docs;
}
