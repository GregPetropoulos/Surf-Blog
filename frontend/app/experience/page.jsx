import HeroSection from '../_components/HeroSection';
import InfoBlock from '../_components/InfoBlock';
import { fetchStrapiData, processInfoBlockData } from '@/utils/strapi.utils';

const Page = async () => {
  const data = await fetchStrapiData('/infoblocks-experience?populate=deep');
  const infoBlocksRaw = data?.attributes?.info_blocks?.data;
  const formattedData = processInfoBlockData(infoBlocksRaw);
  const heroHeadline = (
    <>
      <h1>barrel.</h1>
      <h1>your.</h1>
      <h1>success.</h1>
    </>
  );
  return (
    <main>
      <HeroSection
        headline={heroHeadline}
        theme={'orange'}
        imageSrc={'/assets/hero-experience.png'}
      />
      {formattedData.map((cleanData) => (
        <InfoBlock key={cleanData.id} data={cleanData} />
      ))}
    </main>
  );
};
export default Page;
export const revalidate = 300;
