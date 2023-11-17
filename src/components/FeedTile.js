import React from 'react';

const FeedTile = ({ feed, onMakeDefault, onDelete }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5 className="card-title">
              {feed.name}
              {feed.is_default && (
                <span className="badge bg-success ms-2">Default</span>
              )}
            </h5>
            <div className="mb-2">
              {feed.categories.map((category, index) => (
                <span key={category.id} className="badge bg-secondary me-1">
                  {category.category}
                </span>
              ))}
            </div>
          </div>
          <div>
            {!feed.is_default && (
              <button className="btn btn-outline-primary btn-sm me-2" onClick={onMakeDefault}>
                Make Default
              </button>
            )}
            <button className="btn btn-outline-danger btn-sm" onClick={onDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedTile;