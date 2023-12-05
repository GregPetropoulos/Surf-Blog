'use client';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import Link from 'next/link';

const InfoBlock = ({ data }) => {
  const { headline, imageSrc, text, button, showImageRight } = data;
  const RTEButton = () => {
    if (!button) {
      return null;
    }
    return (
      <Link
        href={`/${button.slug}`}
        className={`btn btn--medium btn--${button.color}`}>
        {button.text}
      </Link>
    );
  };
  return (
    <div className={`info ${showImageRight ? 'info--reversed' : ''}`}>
      <img className='info__image' src={imageSrc} alt='' />
      <div className='info__text'>
        <h2 className='info__headline'>{headline}</h2>
        <BlocksRenderer
          content={text}
          blocks={{
            paragraph: ({ children }) => <p className='copy'>{children}</p>
          }}
        />
        <RTEButton />
      </div>
    </div>
  );
};

export default InfoBlock;
