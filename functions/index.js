const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const bot = {
  displayName: 'Cleverbot',
  photoUrl: 'https://i.imgur.com/oW1dGDI.jpg',
  uid: 'cleverbot',
  status: {
    lastChanged: new Date(),
    state: 'online'
  },
  channels: {
    general: true
  }
};

db.collection('users')
  .doc(bot.uid)
  .set(bot, { merge: true });

exports.onCleverbotMessage = functions.firestore
  .document('channels/general/messages/{messageId}')
  .onCreate((doc, context) => {
    const message = doc.data();
    if (
      !message.text.startsWith('@Cleverbot') ||
      !message.text.startsWith('@cleverbot')
    ) {
      return null;
    }

    return db.collection('channels/general/messages').add({
      text: 'hey',
      user: db.collection('users').doc('cleverbot'),
      created: new Date(Date.now() + 1000)
    });
  });

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
