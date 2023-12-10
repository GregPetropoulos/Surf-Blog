import React from 'react';
import { formatDate } from '@/utils/strapi.utils';

const ArticleIntro = ({ article }) => {
  return (
    <div
      className={`article-intro article-intro__text-color-${article.textColor}`}>
      <div className='article-intro__background'>
        <img src={article.featuredImage} atl='' />
      </div>
      <h3 className='article-intro__headline'>{article.headline}</h3>
      <p className='copy-small bold'>{formatDate(article.publishedAt)}</p>
      <p className='copy-small'>{article.author}</p>
    </div>
  );
};

export default ArticleIntro;
