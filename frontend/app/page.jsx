import HeroSection from './_components/HeroSection';
import InfoBlock from './_components/InfoBlock';
import { fetchStrapiData, processInfoBlockData } from '@/utils/strapi.utils';
// TODO Abstract infoBlock logic into a hook since it's similar to the experience page

const Home = async () => {
  const data = await fetchStrapiData('/infoblocks-landing?populate=deep');
  const infoBlocksRaw = data?.attributes?.info_blocks?.data;
  const formattedData = processInfoBlockData(infoBlocksRaw);

  const heroHeadline = (
    <>
      <h1>barrel.</h1>
      <h1>your.</h1>
      <h1>success.</h1>
    </>
  );
  console.log(formattedData);
  return (
    <main>
      <HeroSection headline={heroHeadline} />
      {formattedData.map((cleanData) => (
        <InfoBlock key={cleanData.id} data={cleanData} />
      ))}
    </main>
  );
};
export default Home;
export const revalidate = 300;
