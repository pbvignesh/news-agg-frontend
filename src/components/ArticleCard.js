import React from 'react';
import './ArticleCard.css';

const ArticleCard = ({ id, title, description, url, author, source, category, publishedDate }) => {
  return (
    <div className="card article-card shadow-sm mb-4">
      <div className="card-body">
        <h5 className="card-title"><a href={url} target='_blank' rel="noreferrer">{title}</a></h5>
        {author && <h6 className="card-subtitle mb-2 text-muted">by {author}</h6>}
        <p className="card-text">{description}</p>
        <div className="d-flex justify-content-between align-items-center">
          <span className="badge bg-secondary">{source}</span>
          <span className="badge bg-info">{category}</span>
        </div>
        <div className="d-flex justify-content-end">
          <small className="text-muted">{publishedDate}</small>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
