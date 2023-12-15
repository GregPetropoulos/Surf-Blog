import axios from 'axios';
import qs from 'qs';

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
export const processEventsData = (rawData) => {
  const parsedRichTextChildren = rawData.attributes?.description.map(
    (richText) => ({
      type: richText.type,
      children: richText?.children.map((item) => item)
    })
  );
  return {
    ...rawData.attributes,
    id: rawData.id,
    description: parsedRichTextChildren,
    image:
      `${STRAPI_BASE_URL}` + rawData?.attributes?.image?.data?.attributes?.url
  };
};
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  };
  return date.toLocaleDateString('en-US', options);
};
export const extractImageUrl = (imageData) => {
  return STRAPI_BASE_URL + imageData?.data?.attributes?.url;
};

export const generateSignupPayload = (formData, eventId) => {
  if (!eventId) {
    return { data: { ...formData, isGeneralInterest: true } };
  } else {
    // Connecting the payload to the event via connect from strapi and event id
    return {
      data: { ...formData, event: { connect: [eventId] } }
    };
  }
};

// qs implementation

const createEventQuery = (eventIdToExclude) => {
  const queryObject = {
    pagination: { start: 0, limit: 12 },
    populate: { image: { populate: '*' } },
    sort: ['startingDate:asc'],
    filters: {
      startingDate: {
        $gt: new Date()
      }
    }
  };
  if (eventIdToExclude) {
    // Adding an id property to query object to check for id thats is not equal to the eventIdToExclude passed in
    queryObject.filters.id = { $ne: eventIdToExclude };
  }
  return qs.stringify(queryObject, {
    encodeValuesOnly: true // prettify URL
  });
};
export const fetchAllEvents = async (eventIdToExclude = null) => {
  const query = createEventQuery(eventIdToExclude)
  const response = await axios.get(`${STRAPI_BASE_URL}/api/events?${query}`);
  return response.data.data.map((event) => processEventsData(event));
};
