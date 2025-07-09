import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import styles from './SignUpForm.module.css';

type FormState = 'create' | 'confirm';

export const SignUpForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [formState, setFormState] = useState<FormState>('create');
  const [email, setEmail] = useState<string>('');
  const navigate = useNavigate();

  const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const formDataObject = Object.fromEntries(formData.entries());

    setEmail(formData.get('username') as string);

    try {
      const response = await fetch(`API_BASE_URL/auth/sign-up/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataObject),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Sign up failed');
        return;
      }

      const data = await response.json();
      console.log(data);
      setFormState('confirm');
    } catch (err) {
      setError('An error occurred during sign up');
      console.error(err);
    }
  };

  const handleConfirmUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const formDataObject = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/API_BASE_URL/auth/sign-up/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataObject),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Verification failed');
        return;
      }

      await response.json();
      navigate('/sign-in');
    } catch (err) {
      setError('An error occurred during verification');
      console.error(err);
    }
  };

  return (
    <>
      {formState === 'create' ? (
        <form className={styles.sign_up_form} onSubmit={handleCreateUser}>
          <h2>Sign Up</h2>
          {error && <div className={styles['error-message']}>{error}</div>}
          <input
            type="email"
            placeholder="E-mail"
            name="username"
            autoComplete="username"
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            autoComplete="new-password"
            required
          />
          <button
            type="submit"
            className={styles.submit_button}
          >
            Sign up
          </button>
        </form>
      ) : (
        <form className={styles.sign_up_form} onSubmit={handleConfirmUser}>
          <h2>Verify Your Email</h2>
          <p>We've sent a verification code to <strong>{email}</strong></p>
          {error && <div className={styles['error-message']}>{error}</div>}
          <input
            type="hidden"
            name="username"
            required
            value={email}
          />
          <input
            type="text"
            placeholder="Verification code"
            name="verifyCode"
            required
          />
          <button
            type="submit"
            className={styles.submit_button}
          >
            Verify
          </button>
        </form>
      )}
    </>
  );
};
