
'use client';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

const ArticleParagraph = ({paragraph}) => {
    console.log(paragraph)
  return (
<BlocksRenderer
          content={paragraph.paragraph}
          blocks={{
            paragraph: ({ children }) => (
            <p className='copy article-paragraph'>
                {children}
              </p>
            ),
            'list-item': ({ children }) => (
              <li className='copy article-paragraph__list'>
                {children}
              </li>
            )
          }}
        />
  )
}

export default ArticleParagraph