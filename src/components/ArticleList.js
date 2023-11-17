import React from 'react';
import ArticleCard from './ArticleCard';

const ArticleList = ({ articles }) => {
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col">
          {articles.map((article, index) => (
            <div className="col-md-8 col-lg-6 col-xl-5 mb-4 mx-auto" key={article.id}>
                <ArticleCard {...article} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleList;

