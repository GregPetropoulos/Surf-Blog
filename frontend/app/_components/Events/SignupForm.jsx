'use client';
import { useState } from 'react';
import TextInput from '../TextInput';
import axios from 'axios';
import { checkAllFormFieldsFilledIn } from '@/utils/validation.utils';

// NEED FORM VALIDATION --PHONE
const SignupForm = ({ infoText, headline, buttonLabel }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      data: { ...formData, isGeneralInterest: true }
    };
    if (checkAllFormFieldsFilledIn(formData)) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/participants`,
          payload
        );
        console.log(response);
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
  return (
    <section className='signup-form'>
      <div className='signup-form__info'>
        <h3 className='signup-form__headline'>{headline || 'Events'}</h3>
        {infoText}
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
        </form>
      )}
    </section>
  );
};

export default SignupForm;
