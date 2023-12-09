'use client';
import React from 'react';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { formatDate } from '@/utils/strapi.utils';

const ArticleIntro = ({ article }) => {
  console.log(article);
  // console.log(...article.articleContent.map(item=> item.paragraph))
  // headline,paragraph,imageWithParagraph,image,landscapeImage
  return (
    <div className='article-intro'>
      <div className='article-intro__background'>
        <img src={article.featuredImage} atl='' />
      </div>
      <h3 className='article-intro__headline'>
        <span className={`article-intro__color-${article.headlineColor}`}>
          {article.headline}
        </span>
      </h3>
      <p className='copy-small bold'>{formatDate(article.publishedAt)}</p>
      <p className='copy-small'>{article.author}</p>

      {/* {article.articleContent.map((item) => {
        // console.log(item.__component==='headline')
        // console.log(item.__component==='blog-article.headline')
        console.log(item.__component);
        console.log(item);
        return <h2 className=''>{item.headline}</h2>;
      })} */}
    </div>
  );
};

export default ArticleIntro;
