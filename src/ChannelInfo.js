import React from 'react';
import { useDoc } from './useDoc';

function ChannelInfo({ channelId }) {
  const channel = useDoc(`channels/${channelId}`);
  return (
    <div className="ChannelInfo">
      <div className="Topic">
        Topic:{' '}
        <input className="TopicInput" defaultValue={channel && channel.topic} />
      </div>
      <div className="ChannelName">{`# ${channelId}`}</div>
    </div>
  );
}

export default ChannelInfo;
