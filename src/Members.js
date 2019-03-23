import React from 'react';
import { useCollection } from './useCollection';

function Members({ channelId }) {
  const members = useCollection('users', 'displayName', [
    `channels.${channelId}`,
    '==',
    true
  ]);

  return (
    <div className="Members">
      <div>
        {members.map(member => (
          <div key={member.uid} className="Member">
            <div className="MemberStatus online" />
            {member.displayName}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Members;
