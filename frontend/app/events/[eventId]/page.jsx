import SignupForm from '@/app/_components/Events/SignupForm';
import FeaturedItems from '@/app/_components/FeaturedItems/FeaturedItems';
import {
  fetchStrapiData,
  processEventsData,
  fetchAllEvents
} from '@/utils/strapi.utils';

const Page = async ({ params }) => {
  const { eventId } = params;
  const otherEvents = await fetchAllEvents(eventId);

  const event = await fetchStrapiData(`/events/${eventId}`);
  const formattedData = processEventsData(event);

  const pricing = {
    singlePrice: formattedData.singlePrice,
    sharedPrice: formattedData.sharedPrice
  };
  return (
    <main className='events-page'>
      <SignupForm
        headline={formattedData.name}
        infoText={formattedData.description}
        buttonLabel='Sign up'
        pricing={pricing}
        eventId={eventId}
      />
      <FeaturedItems
        items={otherEvents}
        itemType='event'
        headline='Explore our other events'
      />
    </main>
  );
};
export default Page;

export const generateStaticParams = async () => {
  try {
    const events = await fetchStrapiData('/events');
    //The ids in events are numbers, nextjs requires a string for slug params
    //Using id here but swap out for slug if needed
    const slugs = events.map((event) => ({
      eventId: String(event.id)
    }));
    return slugs;
  } catch (err) {
    console.error(`Error in fetching events slug: ${err}`);
  }
};
//Needed for after the build it can get fresh updates every 300 seconds
export const revalidate = 300;
