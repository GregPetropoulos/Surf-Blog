'use client';
import { useState } from 'react';
import TextInput from '../TextInput';

const SignupForm = ({ infoText, headline, buttonLabel }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const onChange = (e) => {
    console.log(e.target.value);
  };
  return (
    <section className='signup-form'>
      <div className='signup-form__info'>
        <h3 className='signup-form__headline'>{headline || 'Events'}</h3>
        {infoText}
      </div>
      <form action='' className='signup-form__form'>
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
        <button className='btn btn--medium btn--turquoise'>
          {buttonLabel || 'Stay in touch!'}
        </button>
      </form>
    </section>
  );
};

export default SignupForm;
