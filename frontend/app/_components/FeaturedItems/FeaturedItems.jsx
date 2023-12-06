import FeaturedArticle from './FeaturedArticle';
const FeaturedItems = ({ headline, items }) => {
  return (
    <section className='featured-items'>
      <h3 className='featured-items__headline'>
        {headline || 'Our featured articles'}
      </h3>
      <div className='featured-items__container'>
        {items.map((el) => (
          <FeaturedArticle key={el.slug} article={el} />
        ))}
      </div>
      <button className='btn btn--medium btn--turquoise'>See more</button>
    </section>
  );
};

export default FeaturedItems;
