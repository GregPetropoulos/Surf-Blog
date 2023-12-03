import Link from 'next/link';
const HeroSection = ({ imageSrc, headline, theme = 'turquoise' }) => {
  return (
    <section className='hero'>
      <div className='hero__background'>
        <img src={imageSrc || '/assets/hero-image.png'} alt='' />
      </div>
      <div className={`hero__headline hero__headline--${theme}`}>
        {headline}
      </div>
      <button className={`btn btn--medium btn--${theme}`}>
        <Link href='/events'>BOOK NOW</Link>
      </button>
      <img
        className={`hero__logo hero__logo--${theme}`}
        src={'/assets/logo.svg'}
        alt=''
      />
    </section>
  );
};

export default HeroSection;
