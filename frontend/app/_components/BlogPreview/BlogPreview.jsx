import { fetchStrapiData, processBlogData } from '@/utils/strapi.utils';
import BlogPreviewItem from './BlogPreviewItem';

const BlogPreview = async () => {
  //TODO Make this fetch call a hook
  const blogData = await fetchStrapiData('/blog-articles?populate=deep');
  const formattedData = processBlogData(blogData);
  const highlighArticle = formattedData.find((item) => item.isHighlightArticle);

  // Show only the 3 most recently published that are not highlighted articles
  const recentlyPublishedArticles = formattedData
    .filter((item) => !item.isHighlightArticle)
    .slice(0, 3);

  const articlesToDisplay = [highlighArticle, ...recentlyPublishedArticles];

  return (
    <div className='blog-preview'>
      <h2 className='blog-preview__headline'>the blog.</h2>

      <div className='blog-preview__container'>
        {articlesToDisplay.map((articleData) => (
          <BlogPreviewItem key={articleData.id} article={articleData} />
        ))}
      </div>
    </div>
  );
};

export default BlogPreview;
