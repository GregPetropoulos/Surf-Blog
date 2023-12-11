import axios from 'axios';

const STRAPI_BASE_URL = process.env.STRAPI_BASE_URL || 'http://127.0.0.1:1337';

export const fetchStrapiData = async (route) => {
  const url = `${STRAPI_BASE_URL}/api${route}`;
  try {
    const response = await axios.get(url);

    if (response?.statusText === 'OK') {
      return await response.data.data;
    } else {
      throw new Error(
        `Response status code : ${response.status} ${response.statusText}`
      );
    }
  } catch (err) {
    console.log(err);
    throw new Error(`GET ${url} failed`);
  }
};
export const processInfoBlockData = (rawData) => {
  return rawData.map((block) => {
    return {
      ...block.attributes,
      headline: block?.attributes?.headline,
      button: block?.attributes?.button,
      text: block.attributes.text,
      imageSrc:
        STRAPI_BASE_URL + block?.attributes?.image?.data?.attributes?.url,
      id: block.id
    };
  });
};

export const processBlogData = (rawData) => {
  return rawData
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .map((article) => {
      //  console.log("TEST",article.attributes.articleContent)
      return {
        ...article.attributes,
        id: article.id,
        featuredImage:
          STRAPI_BASE_URL +
          article.attributes.featuredImage.data.attributes.url,
        articleContent: article.attributes.articleContent
      };
    });
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {weekday:'long', year: 'numeric', month: 'long', day: '2-digit' };
  return date.toLocaleDateString('en-US', options);
};
export const extractImageUrl = (imageData) => {
  return STRAPI_BASE_URL + imageData?.data?.attributes?.url;
};
