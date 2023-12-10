'use client';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

const ImageTextComponent = ({ component }) => {
  const { paragraph, isLandscape, image, imageCaption, imageShowsRight } =
    component;
  const imageUrl = image?.data?.attributes?.url;
  return (
    <div
      className={`article-text-image ${
        isLandscape ? '' : 'article-text-image--portrait'
      } ${imageShowsRight ? '' : 'article-text-image--reversed'}`}>
      <div className='article-text-image__block'>
        <BlocksRenderer
          content={paragraph}
          blocks={{
            paragraph: ({ children }) => (
              <p className='copy article-text-image__text article-paragraph'>
                {children}
              </p>
            ),
            'list-item': ({ children }) => (
              <li className='copy article-text-image__text article-paragraph__list'>
                {children}
              </li>
            )
          }}
        />
      </div>
      <div className='article-text-image__container'>
        <div className='article-text-image__image'>
          <img
            src={process.env.NEXT_PUBLIC_STRAPI_BASE_URL + imageUrl}
            alt=''
          />
        </div>
        {imageCaption && (
          <p className='article-text-image__caption copy-small'>
            {imageCaption}
          </p>
        )}
      </div>
    </div>
  );
};

export default ImageTextComponent;
