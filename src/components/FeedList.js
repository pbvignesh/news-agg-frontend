import React from 'react';
import FeedTile from './FeedTile';

const FeedList = ({ feeds, onMakeDefault, onDelete }) => {
  return (
    <div className="mt-4">
      {feeds.map((feed) => (
        <FeedTile
          key={feed.id}
          feed={feed}
          onMakeDefault={() => onMakeDefault(feed.id)}
          onDelete={() => onDelete(feed.id)}
        />
      ))}
    </div>
  );
};

export default FeedList;
