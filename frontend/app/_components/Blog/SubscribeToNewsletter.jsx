'use client';
import { useState } from 'react';

const SubscribeToNewsletter = () => {
  const [email, setEmail] = useState('');
  const [isSignedUp, setIsSignedUp] = useState(false);
  const onChange = (e) => {
    setEmail(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (email.length) {
      setIsSignedUp(true);
      setEmail('')
    }

    // send email to strapi
    // user feedback
  };
  return (
    <section className='newsletter'>
      {isSignedUp ? (
        <h4 className='newsletter__thanks'>
          Thank you for signing up for our newsletter
        </h4>
      ) : (
        <>
          <div className='newsletter__info'>
            <h4>subscribe to our newsletter</h4>
            <p className='copy'>
              Unlock Exclusive Insights and Stay In the Know – Subscribe to Our
              Newsletter Today to always stay in touch
            </p>
          </div>
          <form className='newsletter__form' onSubmit={onSubmit}>
            <input
              type='text'
              value={email}
              onChange={onChange}
              className='newsletter__email input'
              placeholder='Enter your E-mail address'
            />
            <button
              type='submit'
              className='newsletter__subscribe btn btn--medium btn--turquoise'>
              SUBSCRIBE
            </button>
          </form>
        </>
      )}
    </section>
  );
};

export default SubscribeToNewsletter;
