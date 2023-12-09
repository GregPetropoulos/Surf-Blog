import ArticleIntro from '@/app/_components/Blog/ArticleIntro';
import ArticleOverview from '@/app/_components/Blog/ArticleOverview';
import { fetchStrapiData, processBlogData } from '@/utils/strapi.utils';

const Page = async ({ params }) => {
  const { article: slug } = params;

  //TODO Make this fetch call a hook
  const blogData = await fetchStrapiData('/blog-articles?populate=deep');
  const formattedData = processBlogData(blogData);
//   console.log("FORMATTED DATA",formattedData.find(item=>item.slug===slug));

  //this is  a temp solution will need to use qs
  const articleSlug = formattedData.find((item) => item.slug === slug);
//   console.log("ARTICLEslug",articleSlug);

  return (
    <main>
      {/* {articleSlug.map((article) => (
        <ArticleIntro key={article.id} article={article} />
      ))} */}
      <ArticleIntro  article={articleSlug}/>
      <section className='article-section'>

      <ArticleOverview article={articleSlug}/>
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
