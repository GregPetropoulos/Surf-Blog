'use client';
import { useState } from 'react';
import TextInput from '../TextInput';
import axios from 'axios';
import { checkAllFormFieldsFilledIn } from '@/utils/validation.utils';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { generateSignupPayload } from '@/utils/strapi.utils';

// NEED FORM VALIDATION --PHONE
const SignupForm = ({ infoText, headline, buttonLabel, pricing, eventId=null }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (checkAllFormFieldsFilledIn(formData)) {
      const payload = generateSignupPayload(formData, eventId)
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/participants`,
          payload
        );
        if (response.statusText === 'OK') {
          setShowConfirmation(true);
        } else {
          setShowConfirmation(false);
          setErrorMessage(
            `There was an error with submission status code response: ${response.status}`
          );
        }
      } catch (err) {
        console.error(err);
        setErrorMessage(
          err?.response?.data?.error?.message ||
            'This an error message with the submission'
        );
      }
    } else {
      setErrorMessage('Please fill out all fields');
    }
  };

  const renderInfoTextFromStrapiOrComponent = () => {
    if (Object.keys(infoText[0].type).length > 1) {
      return (
        <BlocksRenderer
          content={infoText}
          blocks={{
            paragraph: ({ children }) => (
              <p className='copy article-paragraph'>{children}</p>
            ),
            'list-item': ({ children }) => (
              <li className='copy article-paragraph__list'>{children}</li>
            )
          }}
        />
      );
    }
    return infoText;
  };
  return (
    <section className='signup-form'>
      <div className='signup-form__info'>
        <h3 className='signup-form__headline'>{headline || 'Events'}</h3>
        {renderInfoTextFromStrapiOrComponent()}
      </div>
      {showConfirmation ? (
        <div className='signup-form__form'>
          <h4>Thank you for signing up. We will get in touch soon!</h4>
        </div>
      ) : (
        <form action='' className='signup-form__form' onSubmit={onSubmit}>
          <div className='signup-form__name-container'>
            <TextInput
              inputName={'firstName'}
              value={formData.firstName}
              onChange={onChange}
              label='First Name'
            />
            <TextInput
              inputName={'lastName'}
              value={formData.lastName}
              onChange={onChange}
              label='Last Name'
            />
          </div>
          <TextInput
            inputName={'email'}
            value={formData.email}
            onChange={onChange}
            label='Your e-mail address'
          />
          <TextInput
            inputName={'phone'}
            value={formData.phone}
            onChange={onChange}
            label='Your telephone number'
          />
          {errorMessage && (
            <p className='copy signup-form__error'>{errorMessage}</p>
          )}
          <button type='submit' className='btn btn--medium btn--turquoise'>
            {buttonLabel || 'Stay in touch!'}
          </button>
          {pricing && (
            <div className='signup-form__pricing'>
              <h3>Pricing</h3>
              <p className='copy'>
                Single Room:{' '}
                <span className='bold'>{pricing.singlePrice}€ per person </span>
              </p>
              <p className='copy'>
                Shared Room:{' '}
                <span className='bold'>{pricing.sharedPrice}€ per person</span>
              </p>
            </div>
          )}
        </form>
      )}
    </section>
  );
};

export default SignupForm;
