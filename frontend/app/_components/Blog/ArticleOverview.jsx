import Link from 'next/link';
import React from 'react';

const ArticleOverview = ({ article }) => {
  const headlines = article.articleContent.filter(
    (component) => component.__component === 'blog-article.headline'
  );

  return (
    <div className='article-overview'>
      <div className='article-overview__info'>
        <h3 className='article-overview__headline'>In this blog</h3>
        <h5 className='article-overview__excerpt'>{article.excerpt}</h5>
      </div>
      <ol className='article-overview__content'>
        {headlines.map((headline, idx) => (
          <li key={headline.id}>
            <Link href={`#${headline.slug}`}>
              {idx + 1}.{headline.headline}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ArticleOverview;
