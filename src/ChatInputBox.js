import React from 'react';
import { db } from './firebase';

function ChatInputBox({ user, channelId }) {
  return (
    <form
      onSubmit={e => {
        const value = e.target.elements[0].value;
        db.collection('channels')
          .doc(channelId)
          .collection('messages')
          .add({
            user: db.collection('users').doc(user.uid),
            text: value,
            created: new Date()
          });
        e.target.reset();
        e.preventDefault();
      }}
      className="ChatInputBox"
    >
      <input className="ChatInput" placeholder="Message #general" />
    </form>
  );
}

export default ChatInputBox;
