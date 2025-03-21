const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.onUserStatusChanged = functions.database
  .ref('/status/{userId}')
  .onUpdate((change, context) => {
    const eventStatus = change.after.val();
    const userDoc = db.doc(`users/${context.params.userId}`);

    return change.after.ref.once('value').then(snapshot => {
      const status = snapshot.val();

      if (status.lastChanged > eventStatus.lastChanged) {
        return null;
      }

      // eventStatus.lastChanged = new Date(eventStatus.lastChanged);
      userDoc.update({
        status: eventStatus
      });
    });
  });
