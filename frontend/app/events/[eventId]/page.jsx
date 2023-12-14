
import SignupForm from '@/app/_components/Events/SignupForm';
import { fetchStrapiData, processEventsData } from '@/utils/strapi.utils';


const Page = async ({ params }) => {
  const { eventId } = params;
  const event = await fetchStrapiData(`/events/${eventId}`);
  const formattedData = processEventsData(event);

  const pricing={
    singlePrice:formattedData.singlePrice,
    sharedPrice:formattedData.sharedPrice
  }
  return (
    <main className='events-page'>
      <SignupForm
        headline={formattedData.name}
        infoText={formattedData.description}
        buttonLabel='Sign up'
        pricing={pricing}
        eventId={eventId}

      />
    </main>
  );
};
export default Page;

export const generateStaticParams = async () => {
  try {
    const events = await fetchStrapiData('/events');
    //The ids in events are numbers, nextjs requires a string for slug params
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
