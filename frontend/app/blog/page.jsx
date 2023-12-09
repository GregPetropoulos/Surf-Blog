import HighlightArticle from '../_components/Blog/HighlightArticle';
import SubscribeToNewsletter from '../_components/Blog/SubscribeToNewsletter';
import FeaturedItems from '../_components/FeaturedItems/FeaturedItems';
import { fetchStrapiData, processBlogData } from '@/utils/strapi.utils';

const Page = async () => {

  //TODO Make this fetch call a hook
  const blogData = await fetchStrapiData('/blog-articles?populate=deep');
  const formattedData = processBlogData(blogData);

  /*TODO Use two queries qs to handle on the server side for scalability
1. for the highlighted article
2. for all non highlighted article and sorted by published date
*/

  const highlightedArticleData = formattedData.find(
    (item) => item.isHighlightArticle
  );
  const featuredArticlesData = formattedData.filter(
    (item) => !item.isHighlightArticle
  );

  return (
    <main className='blog-page'>
      <HighlightArticle data={highlightedArticleData} />
      <SubscribeToNewsletter />
      <FeaturedItems items={featuredArticlesData} />
    </main>
  );
};
export default Page;
//Needed for after the build it can get fresh updates
export const revalidate = 300