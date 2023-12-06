import Link from 'next/link';

const FeaturedArticle = ({ article }) => {
  const { headline,publishedAt, slug, featuredImage } = article;
  return (
    <Link href={`/blog/${slug}`} className='featured-items__article'>
      <div className='featured-items__article-img'>
        <img src={featuredImage} alt={`Go read article ${headline}`} />
      </div>
      <div className='featured-items__article-text'>
        <h5>{headline}</h5>
        <p className='copy-small'>{publishedAt}</p>
      </div>
    </Link>
  );
};

export default FeaturedArticle;
