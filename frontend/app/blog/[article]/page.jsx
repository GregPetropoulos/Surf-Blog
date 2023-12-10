import ArticleIntro from '@/app/_components/Blog/ArticleIntro';
import ArticleOverview from '@/app/_components/Blog/ArticleOverview';
import ArticleComponent from '@/app/_components/Blog/ArticleComponent';
import { fetchStrapiData, processBlogData } from '@/utils/strapi.utils';
import FeaturedItems from '@/app/_components/FeaturedItems/FeaturedItems';

const Page = async ({ params }) => {
  const { article: slug } = params;

  //TODO Make this fetch call a hook
  const blogData = await fetchStrapiData('/blog-articles?populate=deep');
  const formattedData = processBlogData(blogData);

  //this is  a temp solution will need to use qs
  const articleSlug = formattedData.find((item) => item.slug === slug);
  const allOtherArticles = formattedData.filter((item) => item.slug !== slug);
  return (
    <main>
      <ArticleIntro article={articleSlug} />
      <section className='article-section'>
        <ArticleOverview article={articleSlug} />
        {articleSlug.articleContent.map((component) => (
          <ArticleComponent key={component.id} component={component} />
        ))}
        <FeaturedItems
          items={allOtherArticles}
          headline={'Explore our other articles'}
        />
      </section>
    </main>
  );
};
export default Page;

//Generates a page based of slug and passes params to the page
export const generateStaticParams = async () => {
  const articles = await fetchStrapiData('/blog-articles');
  return articles.map((article) => ({
    article: article?.attributes?.slug
  }));
};
//Needed for after the build it can get fresh updates every 300 seconds
export const revalidate = 300;
