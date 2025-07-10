import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import styles from './SignUpForm.module.css';
import { useSignUp } from '@/modules/authentication/hooks';

type FormState = 'create' | 'confirm';

export const SignUpForm = () => {
  const { signUpWithEmailAndPassword, sendSignUpVerificationCode } = useSignUp();
  const navigate = useNavigate();

  const [formState, setFormState] = useState<FormState>('create');
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');

  const handleCreateUser = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event?.preventDefault();
      await signUpWithEmailAndPassword(username, password);
      setFormState('confirm');
    } catch (err) {
      setError((err as Error).message || 'Sign up - create user failed');
      console.error('Error on user sign-up:', err);
    }
  };

  const handleConfirmUser = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event?.preventDefault();
      await sendSignUpVerificationCode(username, code);
      navigate('/home');
    } catch (err) {
      setError((err as Error).message || 'Sign up - confirm user failed');
      console.log('Error on account verification:', err);
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
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            autoComplete="new-password"
            required
            onChange={(e) => setPassword(e.target.value)}
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
          <p>We've sent a verification code to <strong>{username}</strong></p>
          {error && <div className={styles['error-message']}>{error}</div>}
          <input
            type="hidden"
            name="username"
            required
            value={username}
          />
          <input
            type="text"
            placeholder="Verification code"
            name="verifyCode"
            required
            onChange={(e) => setCode(e.target.value)}
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
